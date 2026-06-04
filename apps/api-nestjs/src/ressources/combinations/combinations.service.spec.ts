import { AssetName } from '@drawn-lights-game/prisma';
import { jest } from '@jest/globals';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CombinationsRepository } from './combinations.repository.js';
import { CombinationsService } from './combinations.service.js';
import { CombinationQuery } from './combinations.type.js';

describe('CombinationsService', () => {
  let service: CombinationsService;
  let repository: jest.Mocked<CombinationsRepository>;

  beforeEach(async () => {
    const mockRepository = {
      checkExistingAssets: jest.fn(),
      checkExistingCombination: jest.fn(),
      createCombination: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CombinationsService,
        { provide: CombinationsRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<CombinationsService>(CombinationsService);
    repository = module.get(CombinationsRepository);
  });

  describe('attributeCombination', () => {
    it('should create a new combination for valid input', async () => {
      const params: CombinationQuery = {
        assetOne: AssetName.TRIANGLE,
        sound: 'healing',
      };
      const nickname = 'validUser';

      repository.checkExistingAssets.mockResolvedValue([
        { name: AssetName.TRIANGLE } as any,
      ]);
      repository.checkExistingCombination.mockResolvedValue(undefined);
      repository.createCombination.mockResolvedValue({} as any);

      await service.attributeCombination(params, nickname);

      expect(repository.createCombination).toHaveBeenCalledWith(
        params,
        nickname,
      );
    });

    it('should throw BadRequestException for profane nickname', async () => {
      const params: CombinationQuery = {
        assetOne: AssetName.TRIANGLE,
        sound: 'healing',
      };
      const profaneNickname = 'fuck';

      repository.checkExistingAssets.mockResolvedValue([
        { name: AssetName.TRIANGLE } as any,
      ]);
      repository.checkExistingCombination.mockResolvedValue(undefined);

      await expect(
        service.attributeCombination(params, profaneNickname),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.attributeCombination(params, profaneNickname),
      ).rejects.toThrow('Nickname contains profanity');
    });

    it('should throw BadRequestException if combination already exists', async () => {
      const params: CombinationQuery = {
        assetOne: AssetName.TRIANGLE,
        sound: 'healing',
      };
      const nickname = 'validUser';

      repository.checkExistingAssets.mockResolvedValue([
        { name: AssetName.TRIANGLE } as any,
      ]);
      repository.checkExistingCombination.mockResolvedValue({
        foundBy: { nickname: 'otherUser' },
      } as any);

      await expect(
        service.attributeCombination(params, nickname),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.attributeCombination(params, nickname),
      ).rejects.toThrow('Combination already exists');
    });

    it('should throw BadRequestException for non-continuous assets', async () => {
      const params: CombinationQuery = {
        assetOne: AssetName.TRIANGLE,
        assetThree: AssetName.SQUARE, // Gap: assetTwo is missing
        sound: 'healing',
      };
      const nickname = 'validUser';

      await expect(
        service.attributeCombination(params, nickname),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.attributeCombination(params, nickname),
      ).rejects.toThrow('Assets must be continuous');
    });
  });

  describe('isCombinationFound', () => {
    it('should return exist:true and foundBy when combination exists', async () => {
      const params: CombinationQuery = {
        assetOne: AssetName.TRIANGLE,
        sound: 'healing',
      };

      repository.checkExistingAssets.mockResolvedValue([
        { name: AssetName.TRIANGLE } as any,
      ]);
      repository.checkExistingCombination.mockResolvedValue({
        foundBy: { nickname: 'player1' },
      } as any);

      const result = await service.isCombinationFound(params);

      expect(result).toEqual({
        exist: true,
        foundBy: 'player1',
      });
    });

    it('should return exist:false and null foundBy when combination does not exist', async () => {
      const params: CombinationQuery = {
        assetOne: AssetName.TRIANGLE,
        sound: 'healing',
      };

      repository.checkExistingAssets.mockResolvedValue([
        { name: AssetName.TRIANGLE } as any,
      ]);
      repository.checkExistingCombination.mockResolvedValue(undefined);

      const result = await service.isCombinationFound(params);

      expect(result).toEqual({
        exist: false,
        foundBy: null,
      });
    });

    it('should throw BadRequestException when sound is missing', async () => {
      const params = {
        assetOne: AssetName.TRIANGLE,
      } as CombinationQuery;

      await expect(service.isCombinationFound(params)).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.isCombinationFound(params)).rejects.toThrow(
        'Sound parameter is required',
      );
    });
  });
});
