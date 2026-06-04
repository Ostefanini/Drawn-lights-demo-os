import {
    type Asset,
    assetCreateTextFieldsSchema,
    AssetListDTO,
    assetUpdateSchema
} from "@drawn-lights-game/shared";
import express from "express";
import * as z from "zod";

import { formatAssetName, formatAssetType, toAssetDTO } from "./helpers/formatters.js";
import { thumbnails } from "./services/db.js";
import { upload } from "./services/multer.js";
import { prisma } from "./services/prisma.js";
import {
    checkProductionAssets, checkThumbnail,
    validateAssetId
} from "./validators.js";

const assetsRouter = express.Router();

assetsRouter.get("/",
    async (_req, res) => {
        const assets = await prisma.asset.findMany();

        const formattedAssets: AssetListDTO = assets.map((asset) => toAssetDTO(
            asset,
            asset.createdAt,
            asset.type,
            asset.name
        ));
        res.json(formattedAssets);
    });

assetsRouter.post("/",
    upload.single("thumbnail"),
    checkThumbnail,
    async (req, res) => {
        const parsed = assetCreateTextFieldsSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: "validation", issues: parsed.error.issues });
        }

        const allowed = await checkProductionAssets(parsed.data);
        if (!allowed) {
            return res.status(400).json({ error: "validation", message: "In production, only demo assets are allowed" });
        }

        const assetDb = await prisma.asset.create({
            data: {
                ...parsed.data,
                type: formatAssetType(parsed.data.type),
                name: formatAssetName(parsed.data.name),
            }
        })
        thumbnails.set(assetDb.thumbnail, res.locals.buffer);

        const asset: Asset = toAssetDTO(assetDb, assetDb.createdAt, assetDb.type, assetDb.name);
        res.status(201).json(asset);
    });

assetsRouter.get("/thumbnail/:id",
    (req, res) => {
        const id = z.string().uuid().safeParse(req.params.id);
        if (!id.success) {
            return res.status(400).json({ error: "invalid id" });
        }
        console.log("thumbnail id", id.data);
        const thumbnail = thumbnails.get(id.data);
        if (!thumbnail) {
            return res.status(404).json({ error: "not found" });
        }
        res.setHeader("Content-Type", "image/jpeg");
        res.send(thumbnail);
    });

if (process.env.NODE_ENV !== "production") {
    assetsRouter.put("/:id",
        validateAssetId,
        async (req, res) => {
            const parsed = assetUpdateSchema.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json({ error: "validation", issues: parsed.error.issues });
            }

            const { type, name, ...rest } = parsed.data;
            const assetDb = await prisma.asset.update({
                where: { id: req.params.id },
                data: {
                    ...rest,
                    ...(type !== undefined ? { type: formatAssetType(type) } : {}),
                    ...(name !== undefined ? { name: formatAssetName(name) } : {})
                },
            })

            const updatedAsset: Asset = toAssetDTO(assetDb, assetDb.createdAt, assetDb.type, assetDb.name);
            res.json(updatedAsset);
        });

    assetsRouter.delete("/:id",
        validateAssetId,
        async (req, res) => {
            await prisma.asset.delete({ where: { id: req.params.id } });
            res.status(204).end();
        });
}

export { assetsRouter };
