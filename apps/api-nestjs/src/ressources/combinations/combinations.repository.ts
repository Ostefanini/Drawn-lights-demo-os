import { AssetName, Sound as SoundModel } from '@drawn-lights-game/prisma';
import { Sound } from '@drawn-lights-game/shared';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CombinationQuery } from './combinations.type.js';

@Injectable()
export class CombinationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async checkExistingAssets(assets: AssetName[]) {
    return (
      (await this.prisma.asset.findMany({
        where: {
          name: {
            in: assets,
          },
        },
      })) || []
    );
  }

  public async checkExistingCombination(params: CombinationQuery) {
    return (
      (await this.prisma.combination.findFirst({
        where: {
          assetOne: params.assetOne,
          assetTwo: params.assetTwo ?? null,
          assetThree: params.assetThree ?? null,
          assetFour: params.assetFour ?? null,
          sound: this.formatSound(params.sound),
        },
        include: {
          foundBy: true,
        },
      })) ?? undefined
    );
  }

  public async createCombination(params: CombinationQuery, nickname: string) {
    return await this.prisma.combination.create({
      data: {
        assetOne: params.assetOne,
        assetTwo: params.assetTwo ?? null,
        assetThree: params.assetThree ?? null,
        assetFour: params.assetFour ?? null,
        sound: this.formatSound(params.sound),
        foundBy: {
          connectOrCreate: {
            where: { nickname: nickname },
            create: { nickname: nickname },
          },
        },
      },
    });
  }

  private formatSound = (sound: Sound): SoundModel => {
    switch (sound) {
      case 'healing':
        return SoundModel.HEALING;
      case 'emerveille':
        return SoundModel.EMERVEILLE;
      case 'glossy':
        return SoundModel.GLOSSY;
      case 'none':
      default:
        return SoundModel.NONE;
    }
  };
}
