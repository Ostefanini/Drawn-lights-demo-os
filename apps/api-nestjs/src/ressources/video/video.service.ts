import { BadRequestException, Injectable } from '@nestjs/common';
import { Readable } from 'stream';

const DRIVE_ID_PATTERN = /^[a-zA-Z0-9_-]+$/;
const FORWARDED_RESPONSE_HEADERS = [
  'content-type',
  'content-length',
  'content-range',
] as const;

export interface VideoProxyResult {
  status: number;
  headers: Record<string, string>;
  stream: Readable;
}

@Injectable()
export class VideoService {
  async getVideoProxy(id: string, range?: string): Promise<VideoProxyResult> {
    if (!id || !DRIVE_ID_PATTERN.test(id)) {
      throw new BadRequestException('Invalid Drive file ID');
    }

    const url = `https://drive.usercontent.google.com/download?id=${id}&export=view&authuser=0`;

    const fetchHeaders: Record<string, string> = {};
    if (range) fetchHeaders['range'] = range;

    const driveRes = await fetch(url, { headers: fetchHeaders });

    const headers: Record<string, string> = { 'accept-ranges': 'bytes' };
    for (const key of FORWARDED_RESPONSE_HEADERS) {
      const value = driveRes.headers.get(key);
      if (value) headers[key] = value;
    }

    return {
      status: driveRes.status,
      headers,
      stream: Readable.fromWeb(
        driveRes.body as import('stream/web').ReadableStream,
      ),
    };
  }
}
