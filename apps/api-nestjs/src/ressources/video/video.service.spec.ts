import { BadRequestException } from '@nestjs/common';
import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { Readable } from 'stream';
import { VideoService } from './video.service.js';

describe('VideoService', () => {
  let service: VideoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoService],
    }).compile();

    service = module.get<VideoService>(VideoService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getVideoProxy', () => {
    it('should throw BadRequestException for an empty ID', async () => {
      await expect(service.getVideoProxy('')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for an ID with invalid characters', async () => {
      await expect(service.getVideoProxy('../evil')).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.getVideoProxy('id with spaces')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should fetch from the correct Drive usercontent URL', async () => {
      const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce(
        new Response(new ReadableStream(), {
          status: 200,
          headers: { 'content-type': 'video/mp4', 'content-length': '12345' },
        }),
      );

      await service.getVideoProxy('validFileId123');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://drive.usercontent.google.com/download?id=validFileId123&export=view&authuser=0',
        { headers: {} },
      );
    });

    it('should forward the Range header when provided', async () => {
      const mockFetch = jest
        .spyOn(global, 'fetch')
        .mockResolvedValueOnce(
          new Response(new ReadableStream(), { status: 206 }),
        );

      await service.getVideoProxy('validId', 'bytes=0-1000');

      expect(mockFetch).toHaveBeenCalledWith(expect.any(String), {
        headers: { range: 'bytes=0-1000' },
      });
    });

    it('should always set accept-ranges: bytes in response headers', async () => {
      jest
        .spyOn(global, 'fetch')
        .mockResolvedValueOnce(
          new Response(new ReadableStream(), { status: 200 }),
        );

      const result = await service.getVideoProxy('validId');

      expect(result.headers['accept-ranges']).toBe('bytes');
    });

    it('should forward content-type and content-length from Drive response', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce(
        new Response(new ReadableStream(), {
          status: 200,
          headers: { 'content-type': 'video/mp4', 'content-length': '99999' },
        }),
      );

      const result = await service.getVideoProxy('validId');

      expect(result.headers['content-type']).toBe('video/mp4');
      expect(result.headers['content-length']).toBe('99999');
    });

    it('should return a Readable stream and the Drive response status', async () => {
      jest
        .spyOn(global, 'fetch')
        .mockResolvedValueOnce(
          new Response(new ReadableStream(), { status: 206 }),
        );

      const result = await service.getVideoProxy('validId', 'bytes=0-500');

      expect(result.status).toBe(206);
      expect(result.stream).toBeInstanceOf(Readable);
    });
  });
});
