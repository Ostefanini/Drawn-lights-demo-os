import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CombinationQuery } from './combinations.type.js';
import { formatSound } from './combinations.utils.js';

@Injectable()
export class SecretCombinationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async isSecretCombinationFound(params: CombinationQuery) {
    return (await this.prisma.secretCombination.findFirst({
      where: {
        assetOne: params.assetOne,
        assetTwo: params.assetTwo ?? null,
        assetThree: params.assetThree ?? null,
        assetFour: params.assetFour ?? null,
        sound: formatSound(params.sound),
        foundById: null,
      },
    }))
      ? true
      : false;
  }
}
