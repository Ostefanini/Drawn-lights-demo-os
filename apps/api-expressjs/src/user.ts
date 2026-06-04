import { UserListHighscore } from "@drawn-lights-game/shared";
import { Router } from "express";

import { prisma } from "./services/prisma.js";

export const userRouter = Router();

userRouter.get("/", async (_req, res) => {
    const users = await prisma.user.findMany({
        select: {
            nickname: true,
            _count: {
                select: { combinations: true },
            },
        },
    });

    const data: UserListHighscore[] = users.map((user) => ({
        nickname: user.nickname,
        nbCombinationsFound: user._count.combinations,
    }));
    res.json(data);
});