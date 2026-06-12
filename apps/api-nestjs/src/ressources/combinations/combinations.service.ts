import { AssetName } from '@drawn-lights-demo/prisma';
import { CombinationStatus, SecretStatus } from '@drawn-lights-demo/shared';
import isProfane from '@idrisay/profanity-check';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CombinationsRepository } from './combinations.repository.js';
import { CombinationQuery } from './combinations.type.js';

@Injectable()
export class CombinationsService {
  private readonly logger = new Logger(CombinationsService.name);
  constructor(
    private readonly combinationsRepository: CombinationsRepository,
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

  // The secret combination is configured via environment variables.
  // Example: SECRET_ASSET_ONE=cross SECRET_ASSET_TWO=circle SECRET_SOUND=healing
  private getSecretQuery(): CombinationQuery | null {
    const assetOne = process.env.SECRET_ASSET_ONE as AssetName | undefined;
    const sound = process.env.SECRET_SOUND as CombinationQuery['sound'] | undefined;
    if (!assetOne || !sound) return null;
    return {
      assetOne,
      assetTwo: (process.env.SECRET_ASSET_TWO as AssetName) ?? undefined,
      assetThree: (process.env.SECRET_ASSET_THREE as AssetName) ?? undefined,
      assetFour: (process.env.SECRET_ASSET_FOUR as AssetName) ?? undefined,
      sound,
    };
  }

  public async getSecretStatus(): Promise<SecretStatus> {
    const secretQuery = this.getSecretQuery();
    if (!secretQuery) {
      return { found: false, foundBy: null, combination: null };
    }
    const existing = await this.combinationsRepository.checkExistingCombination(secretQuery);
    return {
      found: !!existing,
      foundBy: existing?.foundBy.nickname ?? null,
      combination: {
        assetOne: secretQuery.assetOne,
        assetTwo: secretQuery.assetTwo ?? null,
        assetThree: secretQuery.assetThree ?? null,
        assetFour: secretQuery.assetFour ?? null,
        sound: secretQuery.sound,
      },
    };
  }

  public async isCombinationFound(
    params: CombinationQuery,
  ): Promise<CombinationStatus> {
    const existingCombination = await this.checkCombination(params);
    return {
      exist: existingCombination ? true : false,
      foundBy: existingCombination?.foundBy.nickname ?? null,
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
