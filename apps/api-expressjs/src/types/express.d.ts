import type { AssetModel as Asset, Combination, User } from "@drawn-lights-game/prisma";
import { Sound } from "@drawn-lights-game/shared";

declare global {
    namespace Express {
        interface Locals {
            asset?: Asset;
            assetOne?: AssetName;
            assetTwo?: AssetName;
            assetThree?: AssetName;
            assetFour?: AssetName;
            sound?: Sound;
            combination?: Combination & {
                foundBy: User;
            };
        }
    }
}

export { };
