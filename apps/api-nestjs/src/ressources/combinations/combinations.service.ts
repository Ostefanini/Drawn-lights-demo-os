import { AssetName } from '@drawn-lights-game/prisma';
import { CombinationStatus } from '@drawn-lights-game/shared';
import isProfane from '@idrisay/profanity-check';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CombinationsRepository } from './combinations.repository.js';
import { CombinationQuery } from './combinations.type.js';
import { SecretCombinationsRepository } from './secret-combinations.repository.js';

@Injectable()
export class CombinationsService {
  private readonly logger = new Logger(CombinationsService.name);
  constructor(
    private readonly combinationsRepository: CombinationsRepository,
    private readonly secretCombinationsRepository: SecretCombinationsRepository,
  ) {}

  public async attributeCombination(
    params: CombinationQuery,
    nickname: string,
  ) {
    const existingCombination = await this.checkCombination(params);
    if (existingCombination) {
      throw new BadRequestException('Combination already exists');
    }

    if (isProfane(nickname)) {
      throw new BadRequestException('Nickname contains profanity');
    }

    this.logger.log(`Creating new combination for nickname: ${nickname} 🎉`);
    await this.combinationsRepository.createCombination(params, nickname);
  }

  public async isCombinationFound(
    params: CombinationQuery,
  ): Promise<CombinationStatus> {
    const existingCombination = await this.checkCombination(params);
    const isSecretCombinationFound =
      await this.secretCombinationsRepository.isSecretCombinationFound(params);
    return {
      exist: existingCombination ? true : false,
      foundBy: existingCombination?.foundBy.nickname ?? null,
      isSecretCombinationFound,
    };
  }

  private async checkCombination(params: CombinationQuery) {
    const { assetOne, assetTwo, assetThree, assetFour } = params;
    if (!params.sound) {
      throw new BadRequestException('Sound parameter is required');
    }

    const assetsToCheck: AssetName[] = this.validateAssetOrder([
      assetOne,
      assetTwo,
      assetThree,
      assetFour,
    ]);

    const existingAssets =
      await this.combinationsRepository.checkExistingAssets(assetsToCheck);
    if (existingAssets.length !== assetsToCheck.length) {
      throw new BadRequestException(
        'One or more assets do not exist in the database',
      );
    }

    return await this.combinationsRepository.checkExistingCombination(params);
  }

  private validateAssetOrder(assets: (AssetName | undefined)[]): AssetName[] {
    const result: AssetName[] = [];
    let foundGap = false;

    for (const asset of assets) {
      if (!asset) {
        foundGap = true;
      } else if (foundGap) {
        throw new BadRequestException('Assets must be continuous');
      } else {
        result.push(asset);
      }
    }
    return result;
  }
}
