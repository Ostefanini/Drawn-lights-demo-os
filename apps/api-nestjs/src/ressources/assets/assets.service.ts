import {
  Asset,
  AssetCreateDTO,
  demoPlaystationModels,
} from '@drawn-lights-game/shared';
import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { AssetsRepository } from './assets.repository.js';

@Injectable()
export class AssetsService {
  constructor(private readonly assetsRepository: AssetsRepository) {}

  public async findAll(): Promise<Asset[]> {
    const assets = await this.assetsRepository.findAll();
    return assets.map((asset) =>
      this.assetsRepository.toAssetDTO(
        asset,
        asset.createdAt,
        asset.type,
        asset.name,
      ),
    );
  }

  public async isValidAsset(newAsset: AssetCreateDTO): Promise<boolean> {
    const existingAsset = await this.assetsRepository.findByName(newAsset.name);

    return (
      existingAsset === null &&
      Object.values(demoPlaystationModels).some((validModel) =>
        _.isEqual(newAsset, validModel),
      )
    );
  }

  public async createAsset(
    assetCreateDTO: AssetCreateDTO,
    thumbnailBuffer: Buffer,
  ): Promise<Asset> {
    const isValid = await this.isValidAsset(assetCreateDTO);
    if (!isValid) {
      throw new Error('Invalid asset data');
    }
    const asset = await this.assetsRepository.createAsset(assetCreateDTO);
    this.assetsRepository.setThumbnail(asset.thumbnail, thumbnailBuffer);

    return this.assetsRepository.toAssetDTO(
      asset,
      asset.createdAt,
      asset.type,
      asset.name,
    );
  }

  public retrieveThumbnail(id: string): Buffer | undefined {
    return this.assetsRepository.getThumbnail(id);
  }
}
