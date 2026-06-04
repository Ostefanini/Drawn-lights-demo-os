import { AssetCreateDTO, demoPlaystationModels, Sound, soundSchema } from "@drawn-lights-game/shared";
import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import sharp from "sharp";
import * as z from "zod";

import { formatAssetName, formatSound } from "./helpers/formatters.js";
import { AssetName, prisma } from "./services/prisma.js";


export async function validateAssetId(req: Request, res: Response, next: NextFunction) {
    const id = z.string().uuid().safeParse(req.params.id);
    if (!id.success) {
        return res.status(400).json({ error: "invalid id" });
    }
    const existingAsset = await prisma.asset.findUnique({ where: { id: id.data } });
    if (!existingAsset) {
        return res.status(404).json({ error: "not found" });
    }
    res.locals.asset = existingAsset;
    next();
}

export async function checkThumbnail(req: Request, res: Response, next: NextFunction) {
    if (!req.file) {
        return res.status(400).json({ error: "validation", message: "Thumbnail is required" });
    }
    try {
        const img = await sharp(req.file.buffer);
        const metadata = await img.metadata();
        const size = metadata.size;
        if (size === 0 || (metadata.size || 0) > 2000 * 1024) {
            return res.status(400).json({ error: "validation", message: "Thumbnail must be smaller than 2MB" });
        }
        if (metadata.format !== "jpeg" && metadata.format !== "png" && metadata.format !== "webp") {
            return res.status(400).json({ error: "validation", message: "Thumbnail must be a JPEG, PNG or WEBP image" });
        }
        const aspectRatio = metadata.width / (metadata.height || 1);
        if (aspectRatio < 16 / 10 || aspectRatio > 16 / 8) {
            return res.status(400).json({ error: "validation", message: "Thumbnail aspect ratio must be 16/9" });
        }

        res.locals.buffer = req.file.buffer;
        next();
    }
    catch (_err) {
        return res.status(400).json({ error: "validation", message: "Invalid thumbnail image" });
    };
}

export async function checkProductionAssets(data: AssetCreateDTO): Promise<boolean> {
    if (process.env.NODE_ENV !== "production") return true;

    const exists = await prisma.asset.findFirst({ where: { name: formatAssetName(data.name) } });

    return (
        exists === null &&
        Object.values(demoPlaystationModels).some(validModel =>
            _.isEqual(data, validModel)
        )
    );
}

const querySchema = z.object({
    assetOne: z.nativeEnum(AssetName),
    assetTwo: z.nativeEnum(AssetName).optional(),
    assetThree: z.nativeEnum(AssetName).optional(),
    assetFour: z.nativeEnum(AssetName).optional(),
    sound: soundSchema,
}).refine((data) => {
    const assets = [data.assetOne, data.assetTwo, data.assetThree, data.assetFour].filter((a): a is AssetName => !!a);
    const uniqueAssets = new Set(assets);
    return uniqueAssets.size === assets.length;
}, {
    message: "Assets must be unique",
    path: ["assetOne"],
});

export function validateCombinationQuery(req: Request, res: Response, next: NextFunction) {
    const result = querySchema.safeParse(req.query);
    if (!result.success) {
        res.status(400).json({ error: result.error.issues });
        return;
    }
    res.locals.assetOne = result.data.assetOne;
    res.locals.assetTwo = result.data.assetTwo;
    res.locals.assetThree = result.data.assetThree;
    res.locals.assetFour = result.data.assetFour;
    res.locals.sound = result.data.sound;
    next();
};

export async function checkCombination(_req: Request, res: Response, next: NextFunction) {
    const { assetOne, assetTwo, assetThree, assetFour } = res.locals;
    if (!res.locals.sound) {
        res.status(400).json({ error: "Sound parameter is required" });
        return;
    }
    const sound: Sound = res.locals.sound;
    const assetsToCheck: AssetName[] = [];
    let gap = false;
    let gapError = false;
    [assetOne, assetTwo, assetThree, assetFour].forEach((assetName) => {
        if (assetName && !gap && !gapError) {
            assetsToCheck.push(assetName);
        } else if (!gap && !gapError) {
            gap = true;
        } else if (gap && assetName) {
            gapError = true;
            return;
        }
    })
    if (gapError) {
        res.status(400).json({ error: "Assets must be provided in order without gaps" });
        return;
    }

    try {
        // Verify assets exist in DB
        const existingAssets = await prisma.asset.findMany({
            where: {
                name: {
                    in: assetsToCheck
                }
            }
        }) || [];

        if (existingAssets.length !== assetsToCheck.length) {
            res.status(404).json({ error: "One or more assets do not exist in the database" });
            return;
        }

        res.locals.combination = await prisma.combination.findFirst({
            where: {
                assetOne: assetOne,
                assetTwo: assetTwo ?? null,
                assetThree: assetThree ?? null,
                assetFour: assetFour ?? null,
                sound: formatSound(sound),
            },
            include: {
                foundBy: true
            }
        }) ?? undefined;
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
        return;
    }
    next();
}