import { AssetName } from '@drawn-lights-game/prisma';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CombinationQuery } from './combinations.type.js';
import { formatSound } from './combinations.utils.js';

@Injectable()
export class CombinationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async isSecretCombinationFound(params: CombinationQuery) {
    const secretCombination = await this.prisma.secretCombination.findFirst({
      where: {
        assetOne: params.assetOne,
        assetTwo: params.assetTwo ?? null,
        assetThree: params.assetThree ?? null,
        assetFour: params.assetFour ?? null,
        sound: formatSound(params.sound),
        foundBy: null,
      },
    });

    return secretCombination ? true : false;
  }

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
          sound: formatSound(params.sound),
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
        sound: formatSound(params.sound),
        foundBy: {
          connectOrCreate: {
            where: { nickname: nickname },
            create: { nickname: nickname },
          },
        },
      },
    });
  }
}
