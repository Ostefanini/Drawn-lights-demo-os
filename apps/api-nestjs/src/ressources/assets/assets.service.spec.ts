import { AssetName, AssetType } from '@drawn-lights-game/prisma';
import { AssetCreateDTO } from '@drawn-lights-game/shared';
import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { AssetsRepository } from './assets.repository.js';
import { AssetsService } from './assets.service.js';

describe('AssetsService', () => {
  let service: AssetsService;
  let repository: jest.Mocked<AssetsRepository>;

  const validAsset: AssetCreateDTO = {
    name: 'triangle',
    video:
      'https://drive.google.com/file/d/1jmr0Iq2qsIvS9nqu-a6A6wK17jI1uIJ1/preview',
    description: 'A brilliant formation of triangle-shaped drones.',
    type: '2d',
    durationSec: 2,
    nbUav: 12,
    tags: ['playstation'],
  };

  beforeEach(async () => {
    const mockRepository = {
      findAll: jest.fn(),
      findByName: jest.fn(),
      createAsset: jest.fn(),
      toAssetDTO: jest.fn(),
      setThumbnail: jest.fn(),
      getThumbnail: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssetsService,
        { provide: AssetsRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<AssetsService>(AssetsService);
    repository = module.get(AssetsRepository);
  });

  describe('findAll', () => {
    it('should return all assets transformed to DTOs', async () => {
      const mockAssets = [
        {
          thumbnail: 'thumb-1',
          createdAt: new Date(),
          type: AssetType.TWO_D,
          name: AssetName.TRIANGLE,
        },
      ];
      const mockDTO = {
        thumbnail: 'thumb-1',
        createdAt: new Date(),
        type: AssetType.TWO_D,
        name: AssetName.TRIANGLE,
      };

      repository.findAll.mockResolvedValue(mockAssets as any);
      repository.toAssetDTO.mockReturnValue(mockDTO as any);

      const result = await service.findAll();

      expect(result).toHaveLength(1);
      expect(repository.toAssetDTO).toHaveBeenCalled();
    });
  });

  describe('isValidAsset', () => {
    it('should return true for valid new asset', async () => {
      repository.findByName.mockResolvedValue(null);

      const result = await service.isValidAsset(validAsset);

      expect(result).toBe(true);
    });

    it('should return false if asset already exists', async () => {
      repository.findByName.mockResolvedValue({
        name: AssetName.TRIANGLE,
      } as any);

      const result = await service.isValidAsset(validAsset);

      expect(result).toBe(false);
    });

    it('should return false for invalid asset data', async () => {
      const invalidAsset: AssetCreateDTO = {
        name: 'invalid',
        video: 'https://example.com/video.mp4',
        description: 'Invalid',
        type: '2d',
        durationSec: 999,
        nbUav: 999,
        tags: ['invalid'],
      };
      repository.findByName.mockResolvedValue(null);

      const result = await service.isValidAsset(invalidAsset);

      expect(result).toBe(false);
    });
  });

  describe('createAsset', () => {
    it('should create asset and save thumbnail for valid data', async () => {
      const thumbnailBuffer = Buffer.from('test');
      const mockAsset = {
        thumbnail: 'thumb-id',
        createdAt: new Date(),
        type: AssetType.TWO_D,
        name: AssetName.TRIANGLE,
      };

      repository.findByName.mockResolvedValue(null);
      repository.createAsset.mockResolvedValue(mockAsset as any);
      repository.toAssetDTO.mockReturnValue(mockAsset as any);

      const result = await service.createAsset(validAsset, thumbnailBuffer);

      expect(repository.createAsset).toHaveBeenCalledWith(validAsset);
      expect(repository.setThumbnail).toHaveBeenCalledWith(
        'thumb-id',
        thumbnailBuffer,
      );
      expect(result).toEqual(mockAsset);
    });

    it('should throw error for invalid asset', async () => {
      const invalidAsset: AssetCreateDTO = {
        name: 'invalid',
        video: 'https://example.com/video.mp4',
        description: 'Invalid',
        type: '2d',
        durationSec: 999,
        nbUav: 999,
        tags: ['invalid'],
      };
      const thumbnailBuffer = Buffer.from('test');

      repository.findByName.mockResolvedValue(null);

      await expect(
        service.createAsset(invalidAsset, thumbnailBuffer),
      ).rejects.toThrow('Invalid asset data');
    });
  });

  describe('retrieveThumbnail', () => {
    it('should return thumbnail buffer when it exists', () => {
      const thumbnailId = 'thumb-123';
      const mockBuffer = Buffer.from('image-data');
      repository.getThumbnail.mockReturnValue(mockBuffer);

      const result = service.retrieveThumbnail(thumbnailId);

      expect(result).toBe(mockBuffer);
      expect(repository.getThumbnail).toHaveBeenCalledWith(thumbnailId);
    });

    it('should return undefined when thumbnail does not exist', () => {
      const thumbnailId = 'non-existent';
      repository.getThumbnail.mockReturnValue(undefined);

      const result = service.retrieveThumbnail(thumbnailId);

      expect(result).toBeUndefined();
    });
  });
});
