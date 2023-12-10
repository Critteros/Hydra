import { Inject, Injectable, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';

import {
  type IPXEStrategy,
  BasicBootDataSchema,
} from '@hydra-ipxe/common/shared/ipxe/strategies.def';
import { IpxeStrategy } from '@prisma/client';
import { Request } from 'express';

import { MetadataService } from '@/metadata/metadata.service';

import { BaseRenderer, type RendererConfig } from '../boot/base-renderer';
import { BasicBootRenderer } from '../boot/basic-boot-renderer';
import { IpxeAssetController } from '../controllers/ipxe-asset.controler';
import { IpxeBootControler } from '../controllers/ipxe-boot.controler';

import { IpxeStrategySelectorService } from './ipxe-strategy-selector.service';
import { IpxeStrategyService } from './ipxe-strategy.service';

@Injectable({ scope: Scope.REQUEST })
export class IpxeRendererService {
  private readonly serverUrl: string;
  private readonly mediaUrl: string;
  private readonly bootUrl: string;

  constructor(
    @Inject(CONTEXT) ctx: Request | { req: Request },
    private readonly metdataService: MetadataService,
    private readonly strategySelectorService: IpxeStrategySelectorService,
    private readonly strategyService: IpxeStrategyService,
  ) {
    let request = ctx;
    if ('req' in request) request = request.req;
    this.serverUrl = `${request.protocol}://${request.get('host')}`;

    const mediaPath = this.metdataService.reverseControllerPath(IpxeAssetController, 'getAsset');
    if (!mediaPath) {
      throw new Error('Could not resolve media path');
    }
    this.mediaUrl = mediaPath.split(':path').at(0)?.slice(0, -1) ?? '';

    const bootPath = this.metdataService.reverseControllerPath(IpxeBootControler, 'boot');

    if (!bootPath) {
      throw new Error('Could not resolve boot path');
    }
    this.bootUrl = bootPath.split('/').slice(0, -1).join('/');
  }

  private getRendererConfig(): RendererConfig {
    return {
      serverbaseUrl: this.serverUrl,
      bootPath: this.bootUrl,
      mediaPath: this.mediaUrl,
    };
  }

  async instantiateRenderer({
    rendererClass,
    strategyUid,
  }: {
    rendererClass: ReturnType<typeof IpxeRendererService.prototype.getRenderer>;
    strategyUid: IpxeStrategy['uid'];
  }) {
    switch (rendererClass) {
      case BasicBootRenderer: {
        const strategyData = await this.strategyService.getStrategyData({ uid: strategyUid });
        return new BasicBootRenderer(
          await BasicBootDataSchema.parseAsync(strategyData),
          this.getRendererConfig(),
        );
      }
      default:
        throw new Error(`Could not instantiate ${rendererClass.toString()}`);
    }
  }

  getRenderer(template: IPXEStrategy) {
    switch (template) {
      case 'strategy.basicBoot':
        return BasicBootRenderer;
    }
  }

  async renderForMacAdress(mac: string): Promise<string> {
    const strategyData = await this.strategySelectorService.resolveStrategyForComputer({
      where: {
        mac,
      },
    });
    if (!strategyData) {
      return new BaseRenderer(this.getRendererConfig()).defaultRenderForNoStrategy(mac);
    }

    const renderer = this.getRenderer(strategyData.strategyTemplate.id as IPXEStrategy);
    const instance = await this.instantiateRenderer({
      rendererClass: renderer,
      strategyUid: strategyData.uid,
    });

    return instance.render();
  }

  renderError(msg: string, statusCode?: number) {
    return new BaseRenderer(this.getRendererConfig()).renderError(msg, statusCode);
  }
}
