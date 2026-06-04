import { type Asset } from "@drawn-lights-game/shared";
import { formatAssetType } from "../../src/helpers/formatters.js";

const assetPayload = {
    name: "cross",
    video: "https://example.com/video.mp4",
    description: "An example asset",
    type: "2d" as const,
    durationSec: 30,
    nbUav: 2,
    tags: [
        "tag1",
        "tag2"
    ]
};

const fullAsset: Asset = {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "createdAt": new Date().toISOString(),
    "thumbnail": "123e4567-e89b-12d3-a456-426614174001",
    ...assetPayload,
};

const fullAssetFromDb = {
    ...fullAsset,
    type: formatAssetType(fullAsset.type),
    createdAt: new Date(fullAsset.createdAt),
};

export { assetPayload, fullAsset, fullAssetFromDb };
