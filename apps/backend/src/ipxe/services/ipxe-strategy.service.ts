import { Injectable } from '@nestjs/common';

import { makeCustomError } from '@hydra-ipxe/common/shared/errors';
import type { BasicBootInfo } from '@hydra-ipxe/common/shared/ipxe/strategies.def';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PrismaService } from '@/database/prisma.service';
import { PrismaErrorCode, remapPrismaError } from '@/utils/prisma/errors';

import { IpxeAssetService } from './ipxe-asset.service';
import {
  IpxeStrategyTemplateService,
  IpxeStrategyTemplateDoesNotExists,
} from './ipxe-strategy-template.service';

export const IpxeStrategyDoesNotExists = makeCustomError('IpxeStrategyDoesNotExists');
export const MissingBootAsset = makeCustomError('MissingBootAsset');
export const StrategyAlreadyExists = makeCustomError('StrategyAlreadyExists');

@Injectable()
export class IpxeStrategyService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly ipxeAssetService: IpxeAssetService,
    private readonly ipxeStrategyTemplateService: IpxeStrategyTemplateService,
  ) {}

  async findMany(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.IpxeStrategyWhereUniqueInput;
    where?: Prisma.IpxeStrategyWhereInput;
    orderBy?: Prisma.IpxeStrategyOrderByWithRelationInput;
  }) {
    return await this.prismaService.ipxeStrategy.findMany(params);
  }

  async createStrategy(
    data: Omit<Prisma.IpxeStrategyCreateInput, 'configurationData'>,
    configurationData: Record<string, unknown>,
  ) {
    const template = data.strategyTemplate.connect;
    if (!template) {
      throw new IpxeStrategyTemplateDoesNotExists();
    }
    await this.ipxeStrategyTemplateService.checkStrategyExists(template, true);
    const res = await this.prismaService.ipxeStrategyTemplate.findUnique({
      where: template,
      select: { id: true },
    });

    const validator = this.ipxeStrategyTemplateService.getDataValidator(res?.id);
    const jsonData = await validator.parseAsync(configurationData);
    await this.checkEssentialBootAssets(jsonData);
    try {
      return await this.prismaService.ipxeStrategy.create({
        data: {
          ...data,
          configurationData: jsonData,
        },
      });
    } catch (error) {
      throw remapPrismaError({
        error,
        toMatchError: PrismaClientKnownRequestError,
        code: PrismaErrorCode.UniqueConstraintViolation,
        throw: new StrategyAlreadyExists(),
      });
    }
  }

  private async checkEssentialBootAssets({ kernelPath, initramfsPath }: BasicBootInfo) {
    const existsChecks = await Promise.all([
      this.ipxeAssetService.assetExists(kernelPath),
      this.ipxeAssetService.assetExists(initramfsPath),
    ]);
    if (existsChecks.some((val) => val === false)) {
      throw new MissingBootAsset('Kernel or initramfs was not found in assets');
    }
  }

  async updateStrategy({
    where,
    update,
    configurationData,
  }: {
    where: Prisma.IpxeStrategyWhereUniqueInput;
    update: Omit<Prisma.IpxeStrategyUpdateInput, 'configurationData'>;
    configurationData?: Record<string, unknown>;
  }) {
    const configuration = await this.prismaService.ipxeStrategy.findUnique({
      where,
      include: { strategyTemplate: true },
    });
    if (!configuration) {
      throw new IpxeStrategyDoesNotExists();
    }

    let updateTemplate = configuration.strategyTemplate;
    if (update.strategyTemplate?.connect) {
      const { connect: data } = update.strategyTemplate;
      const template = await this.prismaService.ipxeStrategyTemplate.findUnique({ where: data });
      if (!template) {
        throw new IpxeStrategyTemplateDoesNotExists('Strategy template does not exists');
      }
      updateTemplate = template;
    }

    let updateJson = configuration.configurationData as BasicBootInfo;
    if (configurationData) {
      const newConfigurationData = { ...updateJson, ...configurationData };
      const validator = this.ipxeStrategyTemplateService.getDataValidator(updateTemplate.id);
      updateJson = await validator.parseAsync(newConfigurationData);
      await this.checkEssentialBootAssets(updateJson);
    }

    return await this.prismaService.ipxeStrategy.update({
      where,
      data: {
        ...update,
        configurationData: updateJson,
      },
    });
  }

  async deleteStrategy(whichStrategy: Prisma.IpxeStrategyWhereUniqueInput) {
    try {
      return await this.prismaService.ipxeStrategy.delete({ where: whichStrategy });
    } catch (error) {
      throw remapPrismaError({
        error,
        toMatchError: PrismaClientKnownRequestError,
        code: PrismaErrorCode.RecordDoesNotExist,
        throw: new IpxeStrategyDoesNotExists(),
      });
    }
  }

  async getTemplateForStrategy(whichStrategy: Prisma.IpxeStrategyWhereUniqueInput) {
    return await this.prismaService.ipxeStrategy
      .findUnique({
        where: whichStrategy,
        select: {
          strategyTemplate: true,
        },
      })
      .then((data) => data?.strategyTemplate);
  }

  async getStrategyData(whichStrategy: Prisma.IpxeStrategyWhereUniqueInput) {
    return (await this.prismaService.ipxeStrategy
      .findUnique({
        where: whichStrategy,
        select: { configurationData: true },
      })
      .then((data) => data?.configurationData)) as Prisma.JsonObject;
  }
}
