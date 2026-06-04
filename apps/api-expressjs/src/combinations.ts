import { CombinationStatus, userNicknameSchema } from "@drawn-lights-game/shared";
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
        const data: CombinationStatus = {
            exist: res.locals.combination ? true : false,
            foundBy: res.locals.combination ? res.locals.combination.foundBy.nickname : null,
        };
        res.json(data);
    }
);

combinationsRouter.post("/attribute",
    validateCombinationQuery,
    checkCombination,
    async (req: Request, res: Response) => {
        try {
            const sound = res.locals.sound || "none";
            if (res.locals.combination) {
                res.status(400).json({ error: "Combination already exists" });
                return;
            }

            const userNickname = userNicknameSchema.safeParse(req.body.userNickname);
            if (!userNickname.success) {
                res.status(400).json({ error: "Invalid nickname", issues: userNickname.error.issues });
                return;
            } else if (isProfane(userNickname.data)) {
                res.status(400).json({ error: "Nickname contains inappropriate language" });
                return;
            }

            await prisma.combination.create({
                data: {
                    assetOne: res.locals.assetOne,
                    assetTwo: res.locals.assetTwo ?? null,
                    assetThree: res.locals.assetThree ?? null,
                    assetFour: res.locals.assetFour ?? null,
                    sound: formatSound(sound),
                    foundBy: {
                        connectOrCreate: {
                            where: { nickname: userNickname.data },
                            create: { nickname: userNickname.data }
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
