import {
  BasicBootInfoSchema,
  type BasicBootDataType,
} from '@hydra-ipxe/common/shared/ipxe/strategies.def';
import dedent from 'dedent';

import { BaseRenderer, type RendererConfig } from './base-renderer';

export class BasicBootRenderer extends BaseRenderer {
  public readonly schema = BasicBootInfoSchema;

  constructor(
    private readonly data: BasicBootDataType,
    rendererConfig: RendererConfig,
  ) {
    super(rendererConfig);
  }

  protected override getTemplateData() {
    const { initramfsPath, kernelPath, kernelParams } = this.data;
    return {
      ...super.getTemplateData(),
      kernelPath: this.absoluteURL(kernelPath, 'media'),
      initramfsPath: this.absoluteURL(initramfsPath, 'media'),
      kernelParams,
    };
  }

  render() {
    return this.renderer.compile(
      dedent(
        `{{> ipxe_setup }}
        :boot
        imgfree
        kernel {{{kernelPath}}} {{{kernelParams}}}
        initrd {{{initramfsPath}}}
        boot`,
      ),
      { noEscape: true },
    )(this.getTemplateData());
  }
}
