import {
  type ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { IpxeRendererService } from '../services/ipxe-renderer.service';

@Catch()
export class IpxeExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly rendererService: IpxeRendererService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const { httpAdapter } = this.httpAdapterHost;

    const httpStatus =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const msg =
      exception instanceof Error
        ? exception.message
        : typeof exception === 'string'
        ? exception
        : 'Unknown error';

    const body = this.rendererService.renderError(msg, httpStatus);
    httpAdapter.reply(ctx.getResponse(), body, HttpStatus.OK);
  }
}
