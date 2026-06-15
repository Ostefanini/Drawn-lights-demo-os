import { CombinationStatus, SecretCombinationStatus, combinationAttributionBodySchema } from "@drawn-lights-game/shared";
import isProfane from '@idrisay/profanity-check';
import express, { Request, Response } from "express";

import { formatSound } from "./helpers/formatters.js";
import { prisma } from "./services/prisma.js";
import { checkCombination, validateCombinationQuery } from "./validators.js";

const combinationsRouter = express.Router();

combinationsRouter.get("/is-found",
    validateCombinationQuery,
    checkCombination,
    async (_req: Request, res: Response) => {
        const isSecretCombinationFound = await prisma.secretCombination.findFirst({
            where: {
                assetOne: res.locals.assetOne,
                assetTwo: res.locals.assetTwo ?? null,
                assetThree: res.locals.assetThree ?? null,
                assetFour: res.locals.assetFour ?? null,
                sound: formatSound(res.locals.sound || "none"),
                foundById: null,
            }
        }) ? true : false;
        const data: CombinationStatus = {
            exist: res.locals.combination ? true : false,
            foundBy: res.locals.combination ? res.locals.combination.foundBy.nickname : null,
            isSecretCombinationFound,
        };
        res.json(data);
    }
);

combinationsRouter.get("/secret-status",
    async (_req: Request, res: Response) => {
        try {
            const secret = await prisma.secretCombination.findFirst({
                include: { foundBy: true },
            });

            if (!secret) {
                const data: SecretCombinationStatus = {
                    found: false,
                    foundByNickname: null,
                    winningCombination: null,
                };
                res.json(data);
                return;
            }

            const isFound = secret.foundById !== null;
            const data: SecretCombinationStatus = {
                found: isFound,
                foundByNickname: secret.foundBy?.nickname ?? null,
                winningCombination: isFound ? {
                    assetOne: secret.assetOne,
                    assetTwo: secret.assetTwo,
                    assetThree: secret.assetThree,
                    assetFour: secret.assetFour,
                    sound: secret.sound,
                } : null,
            };
            res.json(data);
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }
);

combinationsRouter.post("/attribute",
    validateCombinationQuery,
    checkCombination,
    async (req: Request, res: Response) => {
        try {
            if (res.locals.combination) {
                res.status(400).json({ error: "Combination already exists" });
                return;
            }

            const body = combinationAttributionBodySchema.safeParse(req.body);
            if (!body.success) {
                res.status(400).json({ error: "Invalid nickname", issues: body.error.issues });
                return;
            }

            if (isProfane(body.data.userNickname)) {
                res.status(400).json({ error: "Nickname contains inappropriate language" });
                return;
            }

            // Check if the combination matches the secret combination
            const secret = await prisma.secretCombination.findFirst({
                where: {
                    assetOne: res.locals.assetOne,
                    assetTwo: res.locals.assetTwo ?? null,
                    assetThree: res.locals.assetThree ?? null,
                    assetFour: res.locals.assetFour ?? null,
                    sound: formatSound(res.locals.sound || "none"),
                    foundById: null,
                },
                select: { id: true },
            });

            if (secret) {
                // This is the secret combination, mark it as found
                const user = await prisma.user.upsert({
                    where: { nickname: body.data.userNickname },
                    create: { nickname: body.data.userNickname },
                    update: {},
                });

                await prisma.secretCombination.update({
                    where: { id: secret.id },
                    data: {
                        foundById: user.id,
                        foundByEmail: body.data.email ?? null,
                        foundAt: new Date(),
                    },
                });

                res.sendStatus(201);
                return;
            }

            // This is a regular combination, create it
            await prisma.combination.create({
                data: {
                    assetOne: res.locals.assetOne,
                    assetTwo: res.locals.assetTwo ?? null,
                    assetThree: res.locals.assetThree ?? null,
                    assetFour: res.locals.assetFour ?? null,
                    sound: formatSound(res.locals.sound || "none"),
                    foundBy: {
                        connectOrCreate: {
                            where: { nickname: body.data.userNickname },
                            create: { nickname: body.data.userNickname }
                        }
                    }
                }
            });
            res.sendStatus(201);
        } catch (error) {
            console.error(error);
            res.sendStatus(500)
        }
    }
)

export { combinationsRouter };
