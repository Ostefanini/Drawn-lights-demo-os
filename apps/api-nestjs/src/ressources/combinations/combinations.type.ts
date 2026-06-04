import { AssetName } from '@drawn-lights-game/prisma';
import { soundSchema } from '@drawn-lights-game/shared';
import * as z from 'zod';

export const querySchema = z
  .object({
    assetOne: z.nativeEnum(AssetName),
    assetTwo: z.nativeEnum(AssetName).optional(),
    assetThree: z.nativeEnum(AssetName).optional(),
    assetFour: z.nativeEnum(AssetName).optional(),
    sound: soundSchema,
  })
  .refine(
    (data) => {
      const assets = [
        data.assetOne,
        data.assetTwo,
        data.assetThree,
        data.assetFour,
      ].filter((a): a is AssetName => !!a);
      const uniqueAssets = new Set(assets);
      return uniqueAssets.size === assets.length;
    },
    {
      message: 'Assets must be unique',
      path: ['assetOne'],
    },
  );

export type CombinationQuery = z.infer<typeof querySchema>;
