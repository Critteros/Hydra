import { Inject, Injectable, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';

import type { IPXEStrategy } from '@hydra-ipxe/common/shared/ipxe/strategies.def';
import { Request } from 'express';

import { MetadataService } from '@/metadata/metadata.service';

import { BasicBootRenderer } from '../boot/basic-boot-renderer';
import { IpxeAssetController } from '../controllers/ipxe-asset.controler';
import { IpxeBootControler } from '../controllers/ipxe-boot.controler';

@Injectable({ scope: Scope.REQUEST })
export class IpxeBootService {
  private readonly serverUrl: string;
  private readonly mediaUrl: string;
  private readonly bootUrl: string;

  constructor(
    @Inject(CONTEXT) ctx: Request | { req: Request },
    private readonly metdataService: MetadataService,
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

  instantiateRenderer(rendererClass: ReturnType<typeof IpxeBootService.prototype.getRenderer>) {
    switch (rendererClass) {
      case BasicBootRenderer:
        return new BasicBootRenderer(
          {
            initramfsPath: '/initrd',
            kernelPath: '/vmlinuz',
            kernelParams:
              'archisobasedir=sysresccd ${ipparam} archiso_http_srv=${media_url} initrd=initrd ${cmdline}',
          },
          {
            serverbaseUrl: this.serverUrl,
            bootPath: this.bootUrl,
            mediaPath: this.mediaUrl,
          },
        );
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

  renderForMacAdress(mac: string): string {
    const renderer = this.getRenderer('strategy.basicBoot');
    const instance = this.instantiateRenderer(renderer);

    return instance.render();
  }
}
