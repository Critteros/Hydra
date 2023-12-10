import dedent from 'dedent';
import Handlebars from 'handlebars';

import { StringUtils } from '@/utils/string';

export type RendererConfig = {
  serverbaseUrl: string;
  mediaPath?: string;
  bootPath?: string;
};

const defaults = {
  mediaPath: '/api/ipxe/assets',
  bootPath: '/api/ipxe/boot',
} satisfies Pick<RendererConfig, 'mediaPath' | 'bootPath'>;

const IpxeSetupTemplate = `#!ipxe

set ipparam BOOTIF=\${netX/mac} ip=dhcp net.ifnames=0
set server_url {{{server_url}}}
set media_url  {{{media_url}}}
set boot_url {{{boot_url}}}
goto boot

`;

export class BaseRenderer {
  protected readonly renderer: typeof Handlebars;
  protected readonly rendererConfig: Required<RendererConfig>;

  constructor(rendererConfig: RendererConfig) {
    this.renderer = Handlebars.create();
    this.rendererConfig = {
      ...rendererConfig,
      mediaPath: rendererConfig.mediaPath ?? defaults.mediaPath,
      bootPath: rendererConfig.bootPath ?? defaults.bootPath,
    };
    this.registerPartials();
  }

  private registerPartials() {
    this.renderer.registerPartial('ipxe_setup', IpxeSetupTemplate);
  }

  protected absoluteURL(url: string, type: 'server' | 'media' | 'boot' = 'server'): string {
    let prefix;

    switch (type) {
      case 'server':
        prefix = this.rendererConfig.serverbaseUrl;
        break;

      case 'media':
        prefix = this.absoluteURL(this.rendererConfig.mediaPath);
        break;

      case 'boot':
        prefix = this.absoluteURL(this.rendererConfig.bootPath);
        break;
    }

    return `${prefix}/${StringUtils.trimStart(url, '/')}`;
  }

  protected getTemplateData() {
    const { bootPath, mediaPath, serverbaseUrl } = this.rendererConfig;
    return {
      server_url: serverbaseUrl,
      media_url: this.absoluteURL(mediaPath),
      boot_url: this.absoluteURL(bootPath),
    };
  }

  renderError(msg: string, status?: number) {
    return this.renderer.compile(
      dedent(
        `{{> ipxe_setup }}

        :boot
        echo An exception was thrown when processing request with message: "${msg}" ${
          status ? `and status code "${status}"` : ''
        }
        echo Computer will now boot using second boot option after 5 seconds
        sleep 5
        exit
      `,
      ),
    )(this.getTemplateData());
  }

  defaultRenderForNoStrategy(mac: string): string {
    return this.renderer.compile(
      dedent(
        `
        {{> ipxe_setup}}

        :boot
        echo No configuration was found for this PC with mac {{{mac}}}
        echo Computer will boot using second boot option after 5 seconds
        sleep 5
        exit
        `,
      ),
    )({ ...this.getTemplateData(), mac });
  }
}
