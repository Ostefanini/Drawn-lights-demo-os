import { SecretCombinationStatus } from '@drawn-lights-game/shared';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CombinationQuery } from './combinations.type.js';
import { formatSound } from './combinations.utils.js';

@Injectable()
export class SecretCombinationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhere(params: CombinationQuery) {
    return {
      assetOne: params.assetOne,
      assetTwo: params.assetTwo ?? null,
      assetThree: params.assetThree ?? null,
      assetFour: params.assetFour ?? null,
      sound: formatSound(params.sound),
      foundById: null,
    };
  }

  public async isSecretCombinationFound(params: CombinationQuery) {
    return (await this.prisma.secretCombination.findFirst({
      where: this.buildWhere(params),
    }))
      ? true
      : false;
  }

  public async getSecretCombinationStatus(): Promise<SecretCombinationStatus> {
    const secret = await this.prisma.secretCombination.findFirst({
      include: { foundBy: true },
    });
    if (!secret) {
      return { found: false, foundByNickname: null, winningCombination: null };
    }

    const isFound = secret.foundById !== null;
    return {
      found: isFound,
      foundByNickname: secret.foundBy?.nickname ?? null,
      winningCombination: isFound
        ? {
            assetOne: secret.assetOne,
            assetTwo: secret.assetTwo,
            assetThree: secret.assetThree,
            assetFour: secret.assetFour,
            sound: secret.sound,
          }
        : null,
    };
  }

  public async markSecretCombinationAsFound(
    params: CombinationQuery,
    nickname: string,
    email?: string,
  ) {
    return await this.prisma.$transaction(async (tx) => {
      const secret = await tx.secretCombination.findFirst({
        where: this.buildWhere(params),
        select: { id: true },
      });

      if (!secret) return null;

      const user = await tx.user.upsert({
        where: { nickname },
        create: { nickname },
        update: {},
      });

      return await tx.secretCombination.update({
        where: { id: secret.id },
        data: {
          foundById: user.id,
          foundByEmail: email ?? null,
          foundAt: new Date(),
        },
      });
    });
  }
}
