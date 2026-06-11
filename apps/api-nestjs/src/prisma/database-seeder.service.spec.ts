import { AssetName, Sound } from '@drawn-lights-game/prisma';
import { jest } from '@jest/globals';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseSeederService } from './database-seeder.service.js';
import { PrismaService } from './prisma.service.js';

type SecretCombinationData = {
  assetOne: AssetName;
  assetTwo: AssetName | null;
  assetThree: AssetName | null;
  assetFour: AssetName | null;
  sound: Sound;
};

describe('DatabaseSeederService', () => {
  let service: DatabaseSeederService;
  let prisma: {
    secretCombination: {
      findFirst: jest.MockedFunction<() => Promise<{ id: string } | null>>;
      create: jest.MockedFunction<
        (args: { data: SecretCombinationData }) => Promise<{ id: string }>
      >;
    };
  };

  beforeEach(async () => {
    prisma = {
      secretCombination: {
        findFirst: jest.fn<() => Promise<{ id: string } | null>>(),
        create:
          jest.fn<
            (args: { data: SecretCombinationData }) => Promise<{ id: string }>
          >(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseSeederService,
        { provide: PrismaService, useValue: prisma },
        { provide: ConfigService, useValue: { get: jest.fn(() => false) } },
      ],
    }).compile();

    service = module.get<DatabaseSeederService>(DatabaseSeederService);
  });

  describe('seed()', () => {
    it('should skip seeding if a secret combination already exists', async () => {
      prisma.secretCombination.findFirst.mockResolvedValue({ id: 'existing' });

      await service.seed();

      expect(prisma.secretCombination.findFirst).toHaveBeenCalledTimes(1);
      expect(prisma.secretCombination.create).not.toHaveBeenCalled();
    });

    it('should create a secret combination if none exists', async () => {
      prisma.secretCombination.findFirst.mockResolvedValue(null);
      prisma.secretCombination.create.mockResolvedValue({ id: 'new' });

      await service.seed();

      expect(prisma.secretCombination.create).toHaveBeenCalledTimes(1);
    });

    it('should always set assetOne', async () => {
      prisma.secretCombination.findFirst.mockResolvedValue(null);
      prisma.secretCombination.create.mockResolvedValue({ id: 'new' });

      await service.seed();

      const { data } = prisma.secretCombination.create.mock.calls[0][0];
      expect(Object.values(AssetName)).toContain(data.assetOne);
    });

    it('should set a valid sound', async () => {
      prisma.secretCombination.findFirst.mockResolvedValue(null);
      prisma.secretCombination.create.mockResolvedValue({ id: 'new' });

      await service.seed();

      const { data } = prisma.secretCombination.create.mock.calls[0][0];
      expect(Object.values(Sound)).toContain(data.sound);
    });

    it('should pick between 1 and 4 assets', async () => {
      prisma.secretCombination.findFirst.mockResolvedValue(null);
      prisma.secretCombination.create.mockResolvedValue({ id: 'new' });

      await service.seed();

      const { data } = prisma.secretCombination.create.mock.calls[0][0];
      const assets = [
        data.assetOne,
        data.assetTwo,
        data.assetThree,
        data.assetFour,
      ];
      const nonNull = assets.filter((a) => a !== null && a !== undefined);
      expect(nonNull.length).toBeGreaterThanOrEqual(1);
      expect(nonNull.length).toBeLessThanOrEqual(4);
    });

    it('should set null for unused asset slots', async () => {
      const mockRandom = jest.spyOn(Math, 'random').mockReturnValue(0);

      prisma.secretCombination.findFirst.mockResolvedValue(null);
      prisma.secretCombination.create.mockResolvedValue({ id: 'new' });

      await service.seed();

      const { data } = prisma.secretCombination.create.mock.calls[0][0];
      expect(data.assetTwo).toBeNull();
      expect(data.assetThree).toBeNull();
      expect(data.assetFour).toBeNull();

      mockRandom.mockRestore();
    });

    it('should pick all 4 assets when count is 4', async () => {
      // Math.random() = 0.99 => count = floor(0.99*4)+1 = 4
      const mockRandom = jest.spyOn(Math, 'random').mockReturnValue(0.99);

      prisma.secretCombination.findFirst.mockResolvedValue(null);
      prisma.secretCombination.create.mockResolvedValue({ id: 'new' });

      await service.seed();

      const { data } = prisma.secretCombination.create.mock.calls[0][0];
      const assets = [
        data.assetOne,
        data.assetTwo,
        data.assetThree,
        data.assetFour,
      ];
      const nonNull = assets.filter((a) => a !== null && a !== undefined);
      expect(nonNull.length).toBe(4);

      mockRandom.mockRestore();
    });
  });
});
