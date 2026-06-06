import cors from "cors";
import express from "express";

import { assetsRouter } from "./assets.js";
import { combinationsRouter } from "./combinations.js";
import { prisma } from "./services/prisma.js";
import { seedSecretCombination } from "./services/database-seeder.js";
import { userRouter } from "./user.js";
import { videoRouter } from "./video.js";


const app = express();
app.use((req, res, next) => {
    if (process.env.NODE_ENV === "development") {
        return cors()(req, res, next);
    }
    return next()
});
app.use(express.json());

app.use((req, _res, next) => {
    if (process.env.NODE_ENV === "development") {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    }
    next();
})

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.use("/assets", assetsRouter);
app.use("/combinations", combinationsRouter);
app.use("/users", userRouter);
app.use("/video", videoRouter);

if (process.env.NODE_ENV !== "test") {
    const PORT = 4000;

    prisma.$connect()
        .then(() => prisma.$queryRaw`SELECT 1`)
        .then(() => seedSecretCombination())
        .then(() => {
            console.log("Connected to database");
            const server = app.listen(PORT, '0.0.0.0', () => {
                console.log(`API http://localhost:${PORT}`);
            });

            function shutdown(signal: string) {
                console.log(`received ${signal}`);
                server.close(() => {
                    prisma.$disconnect().then(() => {
                        process.exit(0);
                    });
                });
            }
            process.on("SIGTERM", shutdown);
            process.on("SIGINT", shutdown);
        }).catch((e) => {
            console.error("Failed to connect to database", e);
            process.exit(1);
        });
}
export default app