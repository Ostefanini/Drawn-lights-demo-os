import type { AssetCreateDTO } from '@drawn-lights-game/shared';
import { assetCreateTextFieldsSchema } from '@drawn-lights-game/shared';
import {
  Body,
  Controller,
  Get,
  Header,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe.js';
import { AssetsService } from './assets.service.js';
import { type MulterFile } from './assets.type.js';
import { ThumbnailValidationPipe } from './assets.validator.js';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get('/')
  async findAll() {
    return await this.assetsService.findAll();
  }

  @Post('/')
  //@UseGuards(ProductionAssetsGuard)
  @UseInterceptors(FileInterceptor('thumbnail'))
  async uploadThumbnail(
    @UploadedFile(ThumbnailValidationPipe) thumbnail: MulterFile,
    @Body(new ZodValidationPipe(assetCreateTextFieldsSchema))
    assetCreateDTO: AssetCreateDTO,
  ) {
    console.log('Received asset creation request:', assetCreateDTO);
    return await this.assetsService.createAsset(
      assetCreateDTO,
      thumbnail.buffer,
    );
  }

  @Get('/thumbnail/:id')
  @Header('Content-Type', 'image/jpeg')
  getThumbnail(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): StreamableFile {
    const thumbnail = this.assetsService.retrieveThumbnail(id);
    if (!thumbnail) {
      throw new NotFoundException('Thumbnail not found');
    }
    return new StreamableFile(thumbnail);
  }
}
