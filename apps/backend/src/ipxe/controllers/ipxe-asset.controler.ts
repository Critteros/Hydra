import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Get,
  Param,
  NotFoundException,
  StreamableFile,
  Res,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiProperty, ApiBody } from '@nestjs/swagger';

import type { Response } from 'express';

import { MapErrors } from '@/errors/map-errors.decorator';
import { MetadataService } from '@/metadata/metadata.service';
import { RequirePermission } from '@/rbac/decorators/require-permissions.decorator';
import { ServerURL } from '@/utils/request.decorator';

import { IpxeAssetService, FileNotFoundError } from '../services/ipxe-asset.service';

class FilesUploadDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files!: any[];
}

@Controller('ipxe')
@ApiTags('ipxe')
@RequirePermission('ipxeAssets.create')
export class IpxeAssetController {
  constructor(
    private readonly ipxeAssetService: IpxeAssetService,
    private readonly metadataService: MetadataService,
  ) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of uploaded files',
    type: FilesUploadDto,
  })
  @UseInterceptors(FilesInterceptor('files'))
  async uploadAssets(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @ServerURL() serverURL: string,
  ) {
    const results = await this.ipxeAssetService.storeFiles(files);
    return results.map(({ id }) => {
      return this.ipxeAssetService.getFulAssetUrl({ assetId: id, serverURL });
    });
  }

  @Get('assets/:assetId')
  @MapErrors({
    if: FileNotFoundError,
    then: (error: Error) => new NotFoundException(error.message),
  })
  async getAsset(
    @Param('assetId') assetId: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<StreamableFile> {
    const { stream, filename } = await this.ipxeAssetService.getFileReadStream(assetId);
    response.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return new StreamableFile(stream);
  }
}
