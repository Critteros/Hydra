import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { readFile, access, constants } from 'node:fs/promises';
import { relative, join } from 'node:path';

import { Injectable, Scope, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONTEXT } from '@nestjs/graphql';

import type { Config } from '@hydra-ipxe/common/server/config';
import { makeCustomError } from '@hydra-ipxe/common/shared/errors';
import type { IpxeAssets, Prisma } from '@prisma/client';
import type { Request } from 'express';

import { PrismaService, type PrismaTransaction } from '@/database/prisma.service';
import { MetadataService } from '@/metadata/metadata.service';
import { StringUtils } from '@/utils/string';

import { IpxeAssetController } from '../controllers/ipxe-asset.controler';

export const FileNotFoundError = makeCustomError('FileNotFoundError');

@Injectable({ scope: Scope.REQUEST })
export class IpxeAssetService {
  private readonly serverURL: string;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService<Config>,
    private readonly metadataService: MetadataService,
    @Inject(CONTEXT) ctx: Request | { req: Request },
  ) {
    let request = ctx;
    if ('req' in request) request = request.req;
    this.serverURL = `${request.protocol}://${request.get('host')}`;
  }

  async findMany() {
    return await this.prismaService.ipxeAssets.findMany();
  }

  async storeFiles(files: Array<Express.Multer.File>, transaction?: PrismaTransaction) {
    return await this.prismaService.transactional(transaction, async (tx) => {
      const promises = files.map(async ({ path, destination, size, originalname, id }) => {
        const pathInMedia = relative(destination, path);

        return tx.ipxeAssets.create({
          data: {
            resourceId: id,
            uid: id,
            fileSize: size,
            mediaPath: pathInMedia,
            originalFilename: originalname,
            sha256: await IpxeAssetService.getFileHash(path),
          },
        });
      });

      return Promise.all(promises);
    });
  }

  resolveAssetURL({ resourceId }: Pick<IpxeAssets, 'resourceId'>) {
    const serverURL = this.serverURL;
    const mediaHandlerPath = this.metadataService.reverseControllerPath(
      IpxeAssetController,
      'getAsset',
    );
    if (!mediaHandlerPath) throw new Error('Media handler path not found');
    return (
      serverURL +
      '/' +
      mediaHandlerPath.replace(/\/:.*$/, `/${StringUtils.trimStart(resourceId, '/')}`)
    );
  }

  async getFileReadStream(whereAsset: Prisma.IpxeAssetsWhereUniqueInput) {
    const asset = await this.prismaService.ipxeAssets.findUnique({
      where: whereAsset,
    });

    if (!asset) {
      throw new FileNotFoundError(`Requested asset was not found`);
    }

    const fsPath = this.getFsPath(asset.mediaPath);

    if (!(await this.fileExists(fsPath))) {
      await this.prismaService.ipxeAssets.update({
        where: whereAsset,
        data: {
          isEntryValid: false,
        },
      });
      throw new FileNotFoundError(`Requested asset was not found`);
    }

    return {
      stream: createReadStream(fsPath),
      filename: asset.originalFilename,
    };
  }

  static async getFileHash(filepath: string) {
    return createHash('sha256')
      .update(await readFile(filepath))
      .digest('hex');
  }

  get mediaBasePath() {
    return this.configService.get('filestorage.basePath', { infer: true })!;
  }

  getFsPath(mediaPath: string) {
    return join(this.mediaBasePath, mediaPath);
  }

  async fileExists(fsPath: string) {
    return await access(fsPath, constants.F_OK)
      .then(() => true)
      .catch(() => false);
  }
}
