import { Controller, Get, Param, NotFoundException, Req, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import type { Request } from 'express';
import { z } from 'zod';

import { PublicHandler } from '@/auth/decorators/public.decorator';

@Controller('ipxe')
@ApiTags('ipxe')
export class IpxeBootControler {
  static readonly macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;

  @Get('boot/:mac')
  @Render('sysrescue')
  @PublicHandler()
  boot(@Param('mac') mac: string, @Req() request: Request) {
    // For some unknown to me reason the regex validation in the @Get param does not work as expected and cuts off mac to something like cc:
    const res = z.string().regex(IpxeBootControler.macRegex).safeParse(mac);
    if (!res.success) {
      throw new NotFoundException(`Cannot GET ${request.originalUrl}`);
    }
  }
}
