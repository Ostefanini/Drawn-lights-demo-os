import { AssetName } from '@drawn-lights-game/prisma';
import { jest } from '@jest/globals';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CombinationsRepository } from './combinations.repository.js';
import { CombinationsService } from './combinations.service.js';
import { CombinationQuery } from './combinations.type.js';
import { SecretCombinationsRepository } from './secret-combinations.repository.js';

describe('CombinationsService', () => {
  let service: CombinationsService;
  let repository: jest.Mocked<CombinationsRepository>;
  let secretCombinationsRepository: jest.Mocked<SecretCombinationsRepository>;

  beforeEach(async () => {
    const mockRepository = {
      isCombinationFound: jest.fn(),
      checkExistingAssets: jest.fn(),
      checkExistingCombination: jest.fn(),
      createCombination: jest.fn(),
    };

    const mockSecretCombinationsRepository = {
      isSecretCombinationFound: jest.fn(),
      markSecretCombinationAsFound: jest.fn(),
      getSecretCombinationStatus: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CombinationsService,
        { provide: CombinationsRepository, useValue: mockRepository },
        {
          provide: SecretCombinationsRepository,
          useValue: mockSecretCombinationsRepository,
        },
      ],
    }).compile();

    service = module.get<CombinationsService>(CombinationsService);
    repository = module.get(CombinationsRepository);
    secretCombinationsRepository = module.get(SecretCombinationsRepository);
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

      await service.attributeCombination(params, nickname, undefined);

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
        service.attributeCombination(params, profaneNickname, undefined),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.attributeCombination(params, profaneNickname, undefined),
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
        service.attributeCombination(params, nickname, undefined),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.attributeCombination(params, nickname, undefined),
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
        service.attributeCombination(params, nickname, undefined),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.attributeCombination(params, nickname, undefined),
      ).rejects.toThrow('Assets must be continuous');
    });

    it('should mark secret combination as found when email is provided and combination is secret', async () => {
      const params: CombinationQuery = {
        assetOne: AssetName.TRIANGLE,
        sound: 'healing',
      };
      const nickname = 'secretFinder';
      const email = 'finder@example.com';

      repository.checkExistingAssets.mockResolvedValue([
        { name: AssetName.TRIANGLE } as any,
      ]);
      repository.checkExistingCombination.mockResolvedValue(undefined);
      secretCombinationsRepository.isSecretCombinationFound.mockResolvedValue(
        true,
      );
      secretCombinationsRepository.markSecretCombinationAsFound.mockResolvedValue(
        {} as any,
      );

      await service.attributeCombination(params, nickname, email);

      expect(
        secretCombinationsRepository.markSecretCombinationAsFound,
      ).toHaveBeenCalledWith(params, nickname, email);
      expect(repository.createCombination).not.toHaveBeenCalled();
    });

    it('should create a regular combination when email is provided but params do not match the secret combination', async () => {
      const params: CombinationQuery = {
        assetOne: AssetName.TRIANGLE,
        sound: 'healing',
      };
      const nickname = 'player1';
      const email = 'player1@example.com';

      repository.checkExistingAssets.mockResolvedValue([
        { name: AssetName.TRIANGLE } as any,
      ]);
      repository.checkExistingCombination.mockResolvedValue(undefined);
      secretCombinationsRepository.isSecretCombinationFound.mockResolvedValue(
        false,
      );
      repository.createCombination.mockResolvedValue({} as any);

      await service.attributeCombination(params, nickname, email);

      // Should create a regular combination, ignoring the email
      expect(repository.createCombination).toHaveBeenCalledWith(
        params,
        nickname,
      );
    });

    it('should throw BadRequestException when markSecretCombinationAsFound returns null', async () => {
      const params: CombinationQuery = {
        assetOne: AssetName.TRIANGLE,
        sound: 'healing',
      };
      const nickname = 'secretFinder';
      const email = 'finder@example.com';

      repository.checkExistingAssets.mockResolvedValue([
        { name: AssetName.TRIANGLE } as any,
      ]);
      repository.checkExistingCombination.mockResolvedValue(undefined);
      secretCombinationsRepository.isSecretCombinationFound.mockResolvedValue(
        true,
      );
      secretCombinationsRepository.markSecretCombinationAsFound.mockResolvedValue(
        null,
      );

      await expect(
        service.attributeCombination(params, nickname, email),
      ).rejects.toThrow(BadRequestException);
      await expect(
        service.attributeCombination(params, nickname, email),
      ).rejects.toThrow('Failed to mark the secret combination as found.');
    });
  });

  describe('isCombinationFound', () => {
    it('should return exist:true, foundBy and isSecretCombinationFound:false when combination exists but is not the secret one', async () => {
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
      secretCombinationsRepository.isSecretCombinationFound.mockResolvedValue(
        false,
      );

      const result = await service.isCombinationFound(params);

      expect(result).toEqual({
        exist: true,
        foundBy: 'player1',
        isSecretCombinationFound: false,
      });
    });

    it('should return isSecretCombinationFound:true when params match the unfound secret combination', async () => {
      const params: CombinationQuery = {
        assetOne: AssetName.TRIANGLE,
        sound: 'healing',
      };

      repository.checkExistingAssets.mockResolvedValue([
        { name: AssetName.TRIANGLE } as any,
      ]);
      repository.checkExistingCombination.mockResolvedValue(undefined);
      secretCombinationsRepository.isSecretCombinationFound.mockResolvedValue(
        true,
      );

      const result = await service.isCombinationFound(params);

      expect(result).toEqual({
        exist: false,
        foundBy: null,
        isSecretCombinationFound: true,
      });
    });

    it('should return exist:false, null foundBy and isSecretCombinationFound:false when combination does not exist', async () => {
      const params: CombinationQuery = {
        assetOne: AssetName.TRIANGLE,
        sound: 'healing',
      };

      repository.checkExistingAssets.mockResolvedValue([
        { name: AssetName.TRIANGLE } as any,
      ]);
      repository.checkExistingCombination.mockResolvedValue(undefined);
      secretCombinationsRepository.isSecretCombinationFound.mockResolvedValue(
        false,
      );

      const result = await service.isCombinationFound(params);

      expect(result).toEqual({
        exist: false,
        foundBy: null,
        isSecretCombinationFound: false,
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

  describe('getSecretCombinationStatus', () => {
    it('should return found:false when no secret combination exists', async () => {
      secretCombinationsRepository.getSecretCombinationStatus.mockResolvedValue(
        {
          found: false,
          foundByNickname: null,
          winningCombination: null,
        },
      );

      const result = await service.getSecretCombinationStatus();

      expect(result).toEqual({
        found: false,
        foundByNickname: null,
        winningCombination: null,
      });
      expect(
        secretCombinationsRepository.getSecretCombinationStatus,
      ).toHaveBeenCalled();
    });

    it('should return found:true with nickname when secret combination is claimed', async () => {
      secretCombinationsRepository.getSecretCombinationStatus.mockResolvedValue(
        {
          found: true,
          foundByNickname: 'heroPlayer',
          winningCombination: {
            assetOne: 'TRIANGLE',
            assetTwo: 'SQUARE',
            assetThree: null,
            assetFour: null,
            sound: 'healing',
          },
        },
      );

      const result = await service.getSecretCombinationStatus();

      expect(result).toEqual({
        found: true,
        foundByNickname: 'heroPlayer',
        winningCombination: {
          assetOne: 'TRIANGLE',
          assetTwo: 'SQUARE',
          assetThree: null,
          assetFour: null,
          sound: 'healing',
        },
      });
    });
  });
});
