import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Get,
  Param,
  NotFoundException,
  StreamableFile,
  InternalServerErrorException,
  Res,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiProperty, ApiBody } from '@nestjs/swagger';

import type { Response } from 'express';

import { MapErrors } from '@/errors/map-errors.decorator';
import { MetadataService } from '@/metadata/metadata.service';
import { RequirePermission } from '@/rbac/decorators/require-permissions.decorator';
import { ServerURL } from '@/utils/request.decorator';

import { FileUploadService, FileNotFoundError } from '../services/file-upload.service';

class FilesUploadDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files!: any[];
}

@Controller('ipxe')
@ApiTags('ipxe')
@RequirePermission('ipxeAssets.create')
export class IpxeAssetController {
  constructor(
    private readonly fileUploadService: FileUploadService,
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
    const results = await this.fileUploadService.storeFiles(files);
    return results.map(({ id }) => {
      const mediaHandlerPath = this.metadataService.reverseControllerPath(
        IpxeAssetController,
        'getAsset',
      );
      if (!mediaHandlerPath) throw new InternalServerErrorException('Media handler path not found');
      return `${serverURL}/${mediaHandlerPath.replace(':assetId', id)}`;
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
    const { stream, filename } = await this.fileUploadService.getFileReadStream(assetId);
    response.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return new StreamableFile(stream);
  }
}
