import { AssetName } from '@drawn-lights-game/prisma';
import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { CombinationsController } from './combinations.controller.js';
import { CombinationsService } from './combinations.service.js';
import { CombinationQuery } from './combinations.type.js';

describe('CombinationsController', () => {
  let controller: CombinationsController;
  let service: jest.Mocked<CombinationsService>;

  beforeEach(async () => {
    const mockService = {
      isCombinationFound: jest.fn(),
      attributeCombination: jest.fn(),
      getSecretCombinationStatus: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CombinationsController],
      providers: [{ provide: CombinationsService, useValue: mockService }],
    }).compile();

    controller = module.get<CombinationsController>(CombinationsController);
    service = module.get(CombinationsService);
  });

  describe('isCombinationFound', () => {
    it('should return combination status from service', async () => {
      const params: CombinationQuery = {
        assetOne: AssetName.TRIANGLE,
        sound: 'healing',
      };
      const mockResult = {
        exist: true,
        foundBy: 'player1',
        isSecretCombinationFound: false,
      };
      service.isCombinationFound.mockResolvedValue(mockResult);

      const result = await controller.isCombinationFound(params);

      expect(result).toEqual(mockResult);
      expect(service.isCombinationFound).toHaveBeenCalledWith(params);
    });

    it('should return isSecretCombinationFound:true when params match the secret combination', async () => {
      const params: CombinationQuery = {
        assetOne: AssetName.TRIANGLE,
        sound: 'healing',
      };
      const mockResult = {
        exist: false,
        foundBy: null,
        isSecretCombinationFound: true,
      };
      service.isCombinationFound.mockResolvedValue(mockResult);

      const result = await controller.isCombinationFound(params);

      expect(result).toEqual(mockResult);
    });
  });

  describe('attributeCombination', () => {
    it('should call service without email for a regular combination', async () => {
      const params: CombinationQuery = {
        assetOne: AssetName.TRIANGLE,
        sound: 'healing',
      };
      const body = { userNickname: 'player1' };
      service.attributeCombination.mockResolvedValue(undefined);

      await controller.attributeCombination(params, body);

      expect(service.attributeCombination).toHaveBeenCalledWith(
        params,
        'player1',
        undefined,
      );
    });

    it('should call service with email when discovering the secret combination', async () => {
      const params: CombinationQuery = {
        assetOne: AssetName.TRIANGLE,
        sound: 'healing',
      };
      const body = {
        userNickname: 'secretFinder',
        email: 'finder@example.com',
      };
      service.attributeCombination.mockResolvedValue(undefined);

      await controller.attributeCombination(params, body);

      expect(service.attributeCombination).toHaveBeenCalledWith(
        params,
        'secretFinder',
        'finder@example.com',
      );
    });
  });

  describe('getSecretCombinationStatus', () => {
    it('should return found:false when the secret combination has not been found', async () => {
      service.getSecretCombinationStatus.mockResolvedValue({
        found: false,
        foundByNickname: null,
        winningCombination: null,
      });

      const result = await controller.getSecretCombinationStatus();

      expect(result).toEqual({
        found: false,
        foundByNickname: null,
        winningCombination: null,
      });
      expect(service.getSecretCombinationStatus).toHaveBeenCalled();
    });

    it('should return found:true with the nickname when the secret combination has been found', async () => {
      service.getSecretCombinationStatus.mockResolvedValue({
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

      const result = await controller.getSecretCombinationStatus();

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
