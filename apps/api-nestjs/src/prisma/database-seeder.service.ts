import { AssetName, Sound } from '@drawn-lights-game/prisma';
import { Injectable, Logger } from '@nestjs/common';
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
export class DatabaseSeederService {
  private readonly logger = new Logger(DatabaseSeederService.name);

  constructor(private readonly prisma: PrismaService) {}

  async seed(): Promise<void> {
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
