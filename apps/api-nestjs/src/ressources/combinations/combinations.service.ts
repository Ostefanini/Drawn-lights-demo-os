import { AssetName } from '@drawn-lights-game/prisma';
import { CombinationStatus } from '@drawn-lights-game/shared';
import isProfane from '@idrisay/profanity-check';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CombinationsRepository } from './combinations.repository.js';
import { CombinationQuery } from './combinations.type.js';
import { SecretCombinationsRepository } from './secret-combinations.repository.js';

const ERRORS = {
  COMBINATION_EXISTS: 'Combination already exists',
  NICKNAME_PROFANE: 'Nickname contains profanity',
  EMAIL_SECRET_ONLY:
    'Email can only be provided if the combination is the secret one',
  SECRET_MARK_FAILED: 'Failed to mark the secret combination as found.',
  ASSETS_NOT_FOUND: 'One or more assets do not exist in the database',
  ASSETS_NOT_CONTINUOUS: 'Assets must be continuous',
} as const;

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
    email: string | undefined,
  ) {
    const existingCombination = await this.checkCombination(params);
    if (existingCombination) {
      throw new BadRequestException(ERRORS.COMBINATION_EXISTS);
    }

    if (isProfane(nickname)) {
      throw new BadRequestException(ERRORS.NICKNAME_PROFANE);
    }

    if (!email) {
      this.logger.log(
        `Creating non-secret new combination for nickname: ${nickname} 🎉`,
      );
      await this.combinationsRepository.createCombination(params, nickname);
      return;
    }

    const isSecretCombinationFound =
      await this.secretCombinationsRepository.isSecretCombinationFound(params);
    if (!isSecretCombinationFound) {
      throw new BadRequestException(ERRORS.EMAIL_SECRET_ONLY);
    }

    this.logger.log(
      `Marking secret combination as found for nickname: ${nickname} 🎉`,
    );
    const result =
      await this.secretCombinationsRepository.markSecretCombinationAsFound(
        params,
        nickname,
        email,
      );
    if (!result) {
      throw new BadRequestException(ERRORS.SECRET_MARK_FAILED);
    }
  }

  public async isCombinationFound(
    params: CombinationQuery,
  ): Promise<CombinationStatus> {
    const existingCombination = await this.checkCombination(params);
    const isSecretCombinationFound =
      await this.secretCombinationsRepository.isSecretCombinationFound(params);
    return {
      exist: !!existingCombination,
      foundBy: existingCombination?.foundBy.nickname ?? null,
      isSecretCombinationFound,
    };
  }

  private async checkCombination(params: CombinationQuery) {
    if (!params.sound) {
      throw new BadRequestException('Sound parameter is required');
    }

    const { assetOne, assetTwo, assetThree, assetFour } = params;

    const assetsToCheck: AssetName[] = this.validateAssetOrder([
      assetOne,
      assetTwo,
      assetThree,
      assetFour,
    ]);

    const existingAssets =
      await this.combinationsRepository.checkExistingAssets(assetsToCheck);
    if (existingAssets.length !== assetsToCheck.length) {
      throw new BadRequestException(ERRORS.ASSETS_NOT_FOUND);
    }

    return this.combinationsRepository.checkExistingCombination(params);
  }

  private validateAssetOrder(assets: (AssetName | undefined)[]): AssetName[] {
    const result: AssetName[] = [];
    let foundGap = false;

    for (const asset of assets) {
      if (!asset) {
        foundGap = true;
      } else if (foundGap) {
        throw new BadRequestException(ERRORS.ASSETS_NOT_CONTINUOUS);
      } else {
        result.push(asset);
      }
    }
    return result;
  }
}
