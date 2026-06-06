import { Controller, Get, Headers, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { VideoService } from './video.service.js';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('proxy')
  async proxy(
    @Query('id') id: string,
    @Headers('range') range: string | undefined,
    @Res() res: Response,
  ) {
    const { status, headers, stream } = await this.videoService.getVideoProxy(
      id,
      range,
    );

    res.status(status);
    for (const [key, value] of Object.entries(headers)) {
      res.setHeader(key, value);
    }
    stream.pipe(res);
  }
}
