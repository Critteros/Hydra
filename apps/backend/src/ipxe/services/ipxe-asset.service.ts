import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { readFile, access, constants } from 'node:fs/promises';
import { relative, join } from 'node:path';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { Config } from '@hydra-ipxe/common/server/config';
import { makeCustomError } from '@hydra-ipxe/common/shared/errors';
import type { IpxeAssets } from '@prisma/client';

import { PrismaService, type PrismaTransaction } from '@/database/prisma.service';
import { MetadataService } from '@/metadata/metadata.service';

import { IpxeAssetController } from '../controllers/ipxe-asset.controler';

export const FileNotFoundError = makeCustomError('FileNotFoundError');

@Injectable()
export class IpxeAssetService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService<Config>,
    private readonly metadataService: MetadataService,
  ) {}

  async findMany() {
    return await this.prismaService.ipxeAssets.findMany();
  }

  async storeFiles(files: Array<Express.Multer.File>, transaction?: PrismaTransaction) {
    return await this.prismaService.transactional(transaction, async (tx) => {
      const promises = files.map(async ({ path, destination, size, originalname }) => {
        const pathInMedia = relative(destination, path);

        return tx.ipxeAssets.create({
          data: {
            fileSize: size,
            mediaPath: pathInMedia,
            originalFilename: originalname,
            sha256: await this.getFileHash(path),
          },
        });
      });

      return Promise.all(promises);
    });
  }

  getFulAssetUrl({ assetId, serverURL }: { assetId: IpxeAssets['id']; serverURL: string }) {
    const mediaHandlerPath = this.metadataService.reverseControllerPath(
      IpxeAssetController,
      'getAsset',
    );
    if (!mediaHandlerPath) throw new Error('Media handler path not found');
    return `${serverURL}/${mediaHandlerPath.replace(':assetId', assetId)}`;
  }

  async getFileReadStream(assetId: IpxeAssets['id']) {
    const asset = await this.prismaService.ipxeAssets.findUnique({
      where: { id: assetId },
    });

    if (!asset) {
      throw new FileNotFoundError(`Asset with id ${assetId} not found`);
    }

    const fsPath = this.getFsPath(asset.mediaPath);

    if (!(await this.fileExists(fsPath))) {
      await this.prismaService.ipxeAssets.delete({ where: { id: assetId } });
      throw new FileNotFoundError(`Asset with id ${assetId} not found`);
    }

    return {
      stream: createReadStream(fsPath),
      filename: asset.originalFilename,
    };
  }

  async getFileHash(filepath: string) {
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
