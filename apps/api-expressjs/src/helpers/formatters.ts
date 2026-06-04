import { Asset, AssetType as AssetTypeZod, Sound } from "@drawn-lights-game/shared";
import { AssetModel, AssetName, AssetType as AssetTypeDB, Sound as SoundModel } from "../services/prisma.js";

const formatAssetType = (assetType: AssetTypeZod): AssetTypeDB => {
    switch (assetType) {
        case "2d":
            return AssetTypeDB.TWO_D;
        case "3d":
            return AssetTypeDB.THREE_D;
        case "script":
            return AssetTypeDB.SCRIPT;
    }
}

const formatAssetTypeReverse = (assetType: AssetTypeDB): AssetTypeZod => {
    switch (assetType) {
        case AssetTypeDB.TWO_D:
            return "2d";
        case AssetTypeDB.THREE_D:
            return "3d";
        case AssetTypeDB.SCRIPT:
        default:
            return "script";
    }
}

const formatAssetName = (name: string): AssetName => {
    switch (name) {
        case "triangle":
            return AssetName.TRIANGLE;
        case "square":
            return AssetName.SQUARE;
        case "circle":
            return AssetName.CIRCLE;
        case "cross":
        default:
            return AssetName.CROSS;
    }
}

const formatAssetNameReverse = (name: AssetName): string => {
    switch (name) {
        case AssetName.TRIANGLE:
            return "triangle";
        case AssetName.SQUARE:
            return "square";
        case AssetName.CIRCLE:
            return "circle";
        case AssetName.CROSS:
        default:
            return "cross";
    }
}

const toAssetDTO = (assetDb: AssetModel, createdAt: Date, type: AssetTypeDB, name: AssetName): Asset => {
    return {
        ...assetDb,
        name: formatAssetNameReverse(name),
        createdAt: createdAt.toISOString(),
        type: formatAssetTypeReverse(type),
    };
}

const formatSound = (sound: Sound): SoundModel => {
    switch (sound) {
        case "healing":
            return SoundModel.HEALING;
        case "emerveille":
            return SoundModel.EMERVEILLE;
        case "glossy":
            return SoundModel.GLOSSY;
        case "none":
        default:
            return SoundModel.NONE;
    }
}

export { formatAssetName, formatAssetNameReverse, formatAssetType, formatAssetTypeReverse, formatSound, toAssetDTO };
