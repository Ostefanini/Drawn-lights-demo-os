import { AssetName, Sound } from '@drawn-lights-game/prisma';
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConfig } from '../common/config/environment.config.js';
import { PrismaService } from './prisma.service.js';

const ALL_ASSET_NAMES: AssetName[] = [
  AssetName.TRIANGLE,
  AssetName.CIRCLE,
  AssetName.CROSS,
  AssetName.SQUARE,
];

const ALL_SOUNDS: Sound[] = [
  Sound.NONE,
  Sound.EMERVEILLE,
  Sound.HEALING,
  Sound.GLOSSY,
];

@Injectable()
export class DatabaseSeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DatabaseSeederService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    await this.seed();
  }

  parseForceCombination(
    forceCombination: string,
  ): { assets: [AssetName, ...(AssetName | null)[]]; sound: Sound } | null {
    const elements = forceCombination.split(',').map((e) => e.trim());
    if (elements.length !== 5) {
      this.logger.error(
        '⚠️ FORCE_SECRET_COMBINATION must have exactly 5 elements',
      );
      return null;
    }

    const assets: Set<AssetName | null> = new Set();
    for (let i = 0; i < 4; i++) {
      const asset = elements[i] as AssetName | 'NULL';
      if (asset !== 'NULL' && assets.has(asset)) {
        this.logger.error(
          `⚠️ Duplicate asset in FORCE_SECRET_COMBINATION: ${asset}`,
        );
        return null;
      }
      if (asset === 'NULL') {
        if (i === 0) {
          this.logger.error(
            '⚠️ NULL asset cannot be in the first position of FORCE_SECRET_COMBINATION',
          );
          return null;
        }
        assets.add(null);
      } else if (ALL_ASSET_NAMES.includes(asset)) {
        assets.add(asset);
      } else {
        this.logger.error(
          `⚠️ Invalid asset name in FORCE_SECRET_COMBINATION: ${asset}`,
        );
        return null;
      }
    }
    if (!ALL_SOUNDS.includes(elements[4] as Sound)) {
      this.logger.error(
        `⚠️ Invalid sound in FORCE_SECRET_COMBINATION: ${elements[4]}`,
      );
      return null;
    }
    return {
      assets: Array.from(assets) as [AssetName, ...(AssetName | null)[]],
      sound: elements[4] as Sound,
    };
  }

  async seed(): Promise<void> {
    const forceCombination = this.configService.get<
      EnvironmentConfig['forceSecretCombination']
    >('environment.forceSecretCombination');

    if (forceCombination) {
      await this.seedForced(forceCombination);
    } else {
      await this.seedRandom();
    }
  }

  private async seedForced(forceCombination: string): Promise<void> {
    this.logger.log(
      '⚡ FORCE_SECRET_COMBINATION is set, seeding with forced values',
    );
    const parsed = this.parseForceCombination(forceCombination);
    if (!parsed) return;

    await this.prisma.secretCombination.deleteMany();

    await this.prisma.secretCombination.create({
      data: {
        assetOne: parsed.assets[0],
        assetTwo: parsed.assets[1] ?? null,
        assetThree: parsed.assets[2] ?? null,
        assetFour: parsed.assets[3] ?? null,
        sound: parsed.sound,
      },
    });
    this.logger.log(
      `✅ Seeded secret combination with forced values: ${parsed.assets.map((a) => a ?? 'NULL').join(', ')} (sound: ${parsed.sound})`,
    );
  }

  private async seedRandom(): Promise<void> {
    this.logger.log('🤔 Checking if secret combination already exists');
    const existing = await this.prisma.secretCombination.findFirst();
    if (existing) {
      this.logger.log('🔒 Secret combination already exists, skipping seed');
      return;
    }

    this.logger.log('🚀 Seeding secret combination');

    const count = Math.floor(Math.random() * 4) + 1;
    const shuffled = [...ALL_ASSET_NAMES].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, count);
    const sound = ALL_SOUNDS[Math.floor(Math.random() * ALL_SOUNDS.length)];

    await this.prisma.secretCombination.create({
      data: {
        assetOne: picked[0],
        assetTwo: picked[1] ?? null,
        assetThree: picked[2] ?? null,
        assetFour: picked[3] ?? null,
        sound,
      },
    });
    this.logger.log(
      `✅ Seeded secret combination with ${count} asset(s): ${picked.join(', ')} (sound: ${sound})`,
    );
  }
}
