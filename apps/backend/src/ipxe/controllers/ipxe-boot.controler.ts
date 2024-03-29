import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Req,
  UseFilters,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import type { Request } from 'express';
import { z } from 'zod';

import { PublicHandler } from '@/auth/decorators/public.decorator';
import { MapErrors } from '@/errors/map-errors.decorator';

import { IpxeExceptionFilter } from '../filters/ipxe-exception.filter';
import { ComputerNotFoundError } from '../services/computer.service';
import { IpxeRendererService } from '../services/ipxe-renderer.service';

@Controller('ipxe')
@ApiTags('ipxe')
export class IpxeBootControler {
  static readonly macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;

  constructor(private readonly ipxeBootService: IpxeRendererService) {}

  @Get('boot/:mac')
  @UseFilters(IpxeExceptionFilter)
  @PublicHandler()
  @MapErrors([
    {
      if: ComputerNotFoundError,
      then: () => new BadRequestException('Computer with requested mac address does not exists'),
    },
  ])
  async boot(@Param('mac') mac: string, @Req() request: Request) {
    console.log(mac);
    // For some unknown to me reason the regex validation in the @Get param does not work as expected and cuts off mac to something like cc:
    const res = z.string().regex(IpxeBootControler.macRegex).safeParse(mac);
    if (!res.success) {
      throw new NotFoundException(`Cannot GET ${request.originalUrl}`);
    }

    return this.ipxeBootService.renderForMacAdress(mac);
  }
}
