import { writeFileSync } from "node:fs";
import * as z from "zod";
import "zod-openapi";
import { createDocument } from "zod-openapi";

import {
    assetCreateTextFieldsSchema,
    assetSchema,
    assetUpdateSchema,
    soundSchema,
    tagSchema,
    userNicknameSchema,
} from "@drawn-lights-demo/shared";

import { AssetName } from "./src/services/prisma.js";

// Représentation OpenAPI d'un binaire (file upload / image)
const binarySchema = z.any().meta({
    description: "Binary payload",
    override: { type: "string", format: "binary" },
});

const combinationStatusSchema = z.object({
    exist: z.boolean(),
    foundBy: z.string().nullable(),
});

const userListHighscoreSchema = z.object({
    nickname: z.string(),
    nbCombinationsFound: z.number(),
});

const combinationQuerySchema = z.object({
    assetOne: z.nativeEnum(AssetName),
    assetTwo: z.nativeEnum(AssetName).optional(),
    assetThree: z.nativeEnum(AssetName).optional(),
    assetFour: z.nativeEnum(AssetName).optional(),
    sound: soundSchema,
});

export const document = createDocument({
    openapi: "3.1.0",
    info: {
        title: "Drawn lights game API",
        version: "1.0.0",
    },
    servers: [{ url: "http://localhost:4000" }],
    paths: {
        "/assets": {
            post: {
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: assetCreateTextFieldsSchema.extend({
                                // Swagger veut du "binary"
                                thumbnail: binarySchema.meta({
                                    description: "Thumbnail file upload (jpeg/png)",
                                }),
                            }),
                        },
                    },
                },
                responses: {
                    201: {
                        description: "201 Created",
                        content: {
                            "application/json": { schema: assetSchema },
                        },
                    },
                    400: { description: "400 Bad Request" },
                },
            },
            get: {
                requestParams: {
                    query: z.object({
                        // côté HTTP ce sera plutôt ?tags=a&tags=b ; si tu utilises ?tags=a,b il faut adapter le schéma
                        tags: z.array(tagSchema).optional(),
                    }),
                },
                responses: {
                    200: {
                        description: "200 OK",
                        content: {
                            "application/json": { schema: z.array(assetSchema) },
                        },
                    },
                },
            },
        },

        "/assets/thumbnail/{id}": {
            get: {
                requestParams: {
                    path: z.object({
                        id: z.string().uuid(),
                    }),
                },
                responses: {
                    200: {
                        description: "200 OK",
                        content: {
                            // image binaire
                            "image/jpeg": { schema: binarySchema },
                        },
                    },
                    404: { description: "404 Not Found" },
                },
            },
        },

        "/assets/{id}": {
            put: {
                requestParams: {
                    path: z.object({
                        id: z.string().uuid(),
                    }),
                },
                requestBody: {
                    content: {
                        "application/json": { schema: assetUpdateSchema },
                    },
                },
                responses: {
                    200: {
                        description: "200 OK",
                        content: {
                            "application/json": { schema: assetSchema },
                        },
                    },
                    400: { description: "400 Bad Request" },
                    404: { description: "404 Not Found" },
                },
            },
            delete: {
                requestParams: {
                    path: z.object({
                        id: z.string().uuid(),
                    }),
                },
                responses: {
                    204: { description: "204 No Content" },
                    404: { description: "404 Not Found" },
                },
            },
        },

        "/combinations/is-found": {
            get: {
                requestParams: {
                    query: combinationQuerySchema,
                },
                responses: {
                    200: {
                        description: "200 OK",
                        content: {
                            "application/json": { schema: combinationStatusSchema },
                        },
                    },
                    400: { description: "400 Bad Request" },
                },
            },
        },

        "/combinations/attribute": {
            post: {
                requestParams: {
                    query: combinationQuerySchema,
                },
                requestBody: {
                    content: {
                        "application/json": {
                            schema: z.object({
                                userNickname: userNicknameSchema,
                            }),
                        },
                    },
                },
                responses: {
                    201: { description: "201 Created" },
                    400: { description: "400 Bad Request" },
                    500: { description: "500 Internal Server Error" },
                },
            },
        },

        "/users": {
            get: {
                responses: {
                    200: {
                        description: "200 OK",
                        content: {
                            "application/json": { schema: z.array(userListHighscoreSchema) },
                        },
                    },
                },
            },
        },
    },
});

writeFileSync("openapi.json", JSON.stringify(document, null, 2));
console.log("✅ openapi.json generated");
