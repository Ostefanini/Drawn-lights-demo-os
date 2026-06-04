import { AssetName, AssetType } from '@drawn-lights-game/prisma';
import { jest } from '@jest/globals';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AssetsController } from './assets.controller.js';
import { ProductionAssetsGuard } from './assets.guard.js';
import { AssetsService } from './assets.service.js';

describe('AssetsController', () => {
  let controller: AssetsController;
  let service: jest.Mocked<AssetsService>;

  beforeEach(async () => {
    const mockService = {
      findAll: jest.fn(),
      createAsset: jest.fn(),
      retrieveThumbnail: jest.fn(),
    };

    const mockGuard = {
      canActivate: jest.fn().mockReturnValue(true),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetsController],
      providers: [{ provide: AssetsService, useValue: mockService }],
    })
      .overrideGuard(ProductionAssetsGuard)
      .useValue(mockGuard)
      .compile();

    controller = module.get<AssetsController>(AssetsController);
    service = module.get(AssetsService);
  });

  describe('findAll', () => {
    it('should return all assets from service', async () => {
      const mockAssets = [
        {
          thumbnail: 'thumb-1',
          createdAt: new Date(),
          type: AssetType.TWO_D,
          name: AssetName.TRIANGLE,
        },
      ];
      service.findAll.mockResolvedValue(mockAssets as any);

      const result = await controller.findAll();

      expect(result).toEqual(mockAssets);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getThumbnail', () => {
    it('should return StreamableFile when thumbnail exists', () => {
      const thumbnailId = 'thumb-123';
      const mockBuffer = Buffer.from('image-data');
      service.retrieveThumbnail.mockReturnValue(mockBuffer);

      const result = controller.getThumbnail(thumbnailId);

      expect(result).toBeDefined();
      expect(service.retrieveThumbnail).toHaveBeenCalledWith(thumbnailId);
    });

    it('should throw NotFoundException when thumbnail does not exist', () => {
      const thumbnailId = 'non-existent';
      service.retrieveThumbnail.mockReturnValue(undefined);

      expect(() => controller.getThumbnail(thumbnailId)).toThrow(
        NotFoundException,
      );
      expect(() => controller.getThumbnail(thumbnailId)).toThrow(
        'Thumbnail not found',
      );
    });
  });
});
