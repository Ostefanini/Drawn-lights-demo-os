import {
  AssetModel,
  AssetName,
  AssetType as AssetTypeDB,
} from '@drawn-lights-game/prisma';
import {
  Asset,
  AssetCreateDTO,
  AssetType as AssetTypeZod,
} from '@drawn-lights-game/shared';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class AssetsRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly thumbnails = new Map<string, Buffer>();

  public async findAll(): Promise<AssetModel[]> {
    return await this.prisma.asset.findMany();
  }

  public async findByName(name: string): Promise<AssetModel | null> {
    return await this.prisma.asset.findFirst({
      where: { name: this.formatAssetName(name) },
    });
  }

  public async createAsset(newAsset: AssetCreateDTO) {
    return await this.prisma.asset.create({
      data: {
        ...newAsset,
        type: this.formatAssetType(newAsset.type),
        name: this.formatAssetName(newAsset.name),
      },
    });
  }

  public toAssetDTO = (
    assetDb: AssetModel,
    createdAt: Date,
    type: AssetTypeDB,
    name: AssetName,
  ): Asset => {
    return {
      ...assetDb,
      name: this.formatAssetNameReverse(name),
      createdAt: createdAt.toISOString(),
      type: this.formatAssetTypeReverse(type),
    };
  };

  public getThumbnail(id: string): Buffer | undefined {
    return this.thumbnails.get(id);
  }

  public setThumbnail(id: string, thumbnail: Buffer): void {
    this.thumbnails.set(id, thumbnail);
  }

  private formatAssetTypeReverse = (assetType: AssetTypeDB): AssetTypeZod => {
    switch (assetType) {
      case AssetTypeDB.TWO_D:
        return '2d';
      case AssetTypeDB.THREE_D:
        return '3d';
      case AssetTypeDB.SCRIPT:
      default:
        return 'script';
    }
  };

  formatAssetNameReverse = (name: AssetName): string => {
    switch (name) {
      case AssetName.TRIANGLE:
        return 'triangle';
      case AssetName.SQUARE:
        return 'square';
      case AssetName.CIRCLE:
        return 'circle';
      case AssetName.CROSS:
      default:
        return 'cross';
    }
  };

  private formatAssetName = (name: string): AssetName => {
    switch (name) {
      case 'triangle':
        return AssetName.TRIANGLE;
      case 'square':
        return AssetName.SQUARE;
      case 'circle':
        return AssetName.CIRCLE;
      case 'cross':
      default:
        return AssetName.CROSS;
    }
  };

  private formatAssetType = (assetType: AssetTypeZod): AssetTypeDB => {
    switch (assetType) {
      case '2d':
        return AssetTypeDB.TWO_D;
      case '3d':
        return AssetTypeDB.THREE_D;
      case 'script':
        return AssetTypeDB.SCRIPT;
    }
  };
}
