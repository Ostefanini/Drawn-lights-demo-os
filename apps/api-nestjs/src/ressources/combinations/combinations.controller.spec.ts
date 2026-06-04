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
      const mockResult = { exist: true, foundBy: 'player1' };
      service.isCombinationFound.mockResolvedValue(mockResult);

      const result = await controller.isCombinationFound(params);

      expect(result).toEqual(mockResult);
      expect(service.isCombinationFound).toHaveBeenCalledWith(params);
    });
  });

  describe('attributeCombination', () => {
    it('should call service to attribute combination', async () => {
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
      );
    });
  });
});
