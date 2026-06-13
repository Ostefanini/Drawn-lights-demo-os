import { describe, expect, test } from '@jest/globals';
import request from "supertest";

import app from "../src/index.js";
import { AssetName, Sound } from "../src/services/prisma.js";
import { prismaMock } from "./setup/prisma.mock.js";

describe('Combinations endpoints', () => {
    const validAssets = [
        { id: '1', name: AssetName.TRIANGLE },
        { id: '2', name: AssetName.SQUARE }
    ];

    const validCombination = {
        id: 'comb1',
        assetOne: AssetName.TRIANGLE,
        assetTwo: AssetName.SQUARE,
        assetThree: null,
        assetFour: null,
        sound: Sound.NONE,
        foundById: 'user1',
        foundBy: {
            nickname: 'TestUser'
        }
    };

    describe('GET /combinations/is-found', () => {
        test('responds with 200 and exist: true, isSecretCombinationFound: false when combination exists but is not the secret one', async () => {
            prismaMock.asset.findMany.calledWith(expect.any(Object) as any).mockResolvedValueOnce(validAssets as any);
            prismaMock.combination.findFirst.calledWith(expect.any(Object) as any).mockResolvedValueOnce(validCombination as any);
            prismaMock.secretCombination.findFirst.calledWith(expect.any(Object) as any).mockResolvedValueOnce(null);

            const response = await request(app)
                .get('/combinations/is-found')
                .query({
                    assetOne: AssetName.TRIANGLE,
                    assetTwo: AssetName.SQUARE,
                    sound: 'none'
                });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                exist: true,
                foundBy: 'TestUser',
                isSecretCombinationFound: false,
            });
        });

        test('responds with 200 and isSecretCombinationFound: true when params match the unfound secret combination', async () => {
            prismaMock.asset.findMany.calledWith(expect.any(Object) as any).mockResolvedValueOnce(validAssets as any);
            prismaMock.combination.findFirst.calledWith(expect.any(Object) as any).mockResolvedValueOnce(null);
            prismaMock.secretCombination.findFirst.calledWith(expect.any(Object) as any).mockResolvedValueOnce({ id: 'secret1' } as any);

            const response = await request(app)
                .get('/combinations/is-found')
                .query({
                    assetOne: AssetName.TRIANGLE,
                    assetTwo: AssetName.SQUARE,
                    sound: 'none'
                });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                exist: false,
                foundBy: null,
                isSecretCombinationFound: true,
            });
        });

        test('responds with 200 and exist: false when combination does not exist', async () => {
            prismaMock.asset.findMany.calledWith(expect.any(Object) as any).mockResolvedValueOnce(validAssets as any);
            prismaMock.combination.findFirst.calledWith(expect.any(Object) as any).mockResolvedValueOnce(null);
            prismaMock.secretCombination.findFirst.calledWith(expect.any(Object) as any).mockResolvedValueOnce(null);

            const response = await request(app)
                .get('/combinations/is-found')
                .query({
                    assetOne: AssetName.TRIANGLE,
                    assetTwo: AssetName.SQUARE,
                    sound: 'none'
                });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                exist: false,
                foundBy: null,
                isSecretCombinationFound: false,
            });
        });

        test('responds with 400 when query parameters are invalid (missing assetOne)', async () => {
            const response = await request(app)
                .get('/combinations/is-found')
                .query({
                    assetTwo: AssetName.SQUARE,
                    sound: 'none'
                });

            expect(response.status).toBe(400);
        });

        test('responds with 400 when assets have gaps', async () => {
            const response = await request(app)
                .get('/combinations/is-found')
                .query({
                    assetOne: AssetName.TRIANGLE,
                    sound: 'none',
                    assetThree: AssetName.SQUARE
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error', 'Assets must be provided in order without gaps');
        });

        test('responds with 404 when assets do not exist in DB', async () => {
            prismaMock.asset.findMany.calledWith(expect.any(Object) as any).mockResolvedValueOnce([]);

            const response = await request(app)
                .get('/combinations/is-found')
                .query({
                    sound: 'none',
                    assetOne: AssetName.TRIANGLE
                });

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error', 'One or more assets do not exist in the database');
        });
    });

    describe('POST /combinations/attribute', () => {
        test('responds with 201 when creating a new combination', async () => {
            prismaMock.asset.findMany.calledWith(expect.any(Object) as any).mockResolvedValueOnce(validAssets as any);
            prismaMock.combination.findFirst.calledWith(expect.any(Object) as any).mockResolvedValueOnce(null);
            prismaMock.combination.create.calledWith(expect.any(Object) as any).mockResolvedValueOnce(validCombination as any);

            const response = await request(app)
                .post('/combinations/attribute')
                .query({
                    assetOne: AssetName.TRIANGLE,
                    assetTwo: AssetName.SQUARE,
                    sound: 'none'
                })
                .send({
                    userNickname: 'NewUser'
                });

            expect(response.status).toBe(201);
        });

        test('responds with 400 when combination already exists', async () => {
            prismaMock.asset.findMany.calledWith(expect.any(Object) as any).mockResolvedValueOnce(validAssets as any);
            prismaMock.combination.findFirst.calledWith(expect.any(Object) as any).mockResolvedValueOnce(validCombination as any);

            const response = await request(app)
                .post('/combinations/attribute')
                .query({
                    assetOne: AssetName.TRIANGLE,
                    assetTwo: AssetName.SQUARE,
                    sound: 'none',
                })
                .send({
                    userNickname: 'NewUser'
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error', 'Combination already exists');
        });

        test('responds with 400 when nickname is invalid', async () => {
            prismaMock.asset.findMany.calledWith(expect.any(Object) as any).mockResolvedValueOnce(validAssets as any);
            prismaMock.combination.findFirst.calledWith(expect.any(Object) as any).mockResolvedValueOnce(null);

            const response = await request(app)
                .post('/combinations/attribute')
                .query({
                    assetOne: AssetName.TRIANGLE,
                    sound: 'none',
                    assetTwo: AssetName.SQUARE
                })
                .send({
                    userNickname: '' // Too short
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error', 'Invalid nickname');
        });

        test('responds with 400 when nickname is profane', async () => {
            prismaMock.asset.findMany.calledWith(expect.any(Object) as any).mockResolvedValueOnce(validAssets as any);
            prismaMock.combination.findFirst.calledWith(expect.any(Object) as any).mockResolvedValueOnce(null);

            const response = await request(app)
                .post('/combinations/attribute')
                .query({
                    assetOne: AssetName.TRIANGLE,
                    sound: 'none',
                    assetTwo: AssetName.SQUARE
                })
                .send({
                    userNickname: 'fuck' // Profane
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error', 'Nickname contains inappropriate language');
        });

        test('responds with 201 when discovering the secret combination without email', async () => {
            prismaMock.asset.findMany.calledWith(expect.any(Object) as any).mockResolvedValueOnce(validAssets as any);
            prismaMock.combination.findFirst.calledWith(expect.any(Object) as any).mockResolvedValueOnce(null);
            prismaMock.secretCombination.findFirst.calledWith(expect.any(Object) as any).mockResolvedValueOnce({ id: 'secret1' } as any);
            prismaMock.user.upsert.calledWith(expect.any(Object) as any).mockResolvedValueOnce({ id: 'user1', nickname: 'SecretFinder' } as any);
            prismaMock.secretCombination.update.calledWith(expect.any(Object) as any).mockResolvedValueOnce({} as any);

            const response = await request(app)
                .post('/combinations/attribute')
                .query({
                    assetOne: AssetName.TRIANGLE,
                    assetTwo: AssetName.SQUARE,
                    sound: 'none'
                })
                .send({
                    userNickname: 'SecretFinder'
                });

            expect(response.status).toBe(201);
        });

        test('responds with 201 when discovering the secret combination with email', async () => {
            prismaMock.asset.findMany.calledWith(expect.any(Object) as any).mockResolvedValueOnce(validAssets as any);
            prismaMock.combination.findFirst.calledWith(expect.any(Object) as any).mockResolvedValueOnce(null);
            prismaMock.secretCombination.findFirst.calledWith(expect.any(Object) as any).mockResolvedValueOnce({ id: 'secret1' } as any);
            prismaMock.user.upsert.calledWith(expect.any(Object) as any).mockResolvedValueOnce({ id: 'user1', nickname: 'SecretFinder' } as any);
            prismaMock.secretCombination.update.calledWith(expect.any(Object) as any).mockResolvedValueOnce({} as any);

            const response = await request(app)
                .post('/combinations/attribute')
                .query({
                    assetOne: AssetName.TRIANGLE,
                    assetTwo: AssetName.SQUARE,
                    sound: 'none'
                })
                .send({
                    userNickname: 'SecretFinder',
                    email: 'finder@example.com'
                });

            expect(response.status).toBe(201);
        });

        test('responds with 201 when submitting a non-secret combination with email (email is ignored)', async () => {
            prismaMock.asset.findMany.calledWith(expect.any(Object) as any).mockResolvedValueOnce(validAssets as any);
            prismaMock.combination.findFirst.calledWith(expect.any(Object) as any).mockResolvedValueOnce(null);
            prismaMock.secretCombination.findFirst.calledWith(expect.any(Object) as any).mockResolvedValueOnce(null);
            prismaMock.combination.create.calledWith(expect.any(Object) as any).mockResolvedValueOnce(validCombination as any);

            const response = await request(app)
                .post('/combinations/attribute')
                .query({
                    assetOne: AssetName.TRIANGLE,
                    assetTwo: AssetName.SQUARE,
                    sound: 'none'
                })
                .send({
                    userNickname: 'RegularPlayer',
                    email: 'player@example.com'
                });

            expect(response.status).toBe(201);
        });
    });

    describe('GET /combinations/secret-status', () => {
        test('responds with 200 and found: false when secret combination has not been claimed', async () => {
            prismaMock.secretCombination.findFirst.calledWith(expect.any(Object) as any).mockResolvedValueOnce(null);

            const response = await request(app)
                .get('/combinations/secret-status');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                found: false,
                foundByNickname: null,
                winningCombination: null,
            });
        });

        test('responds with 200 and found: true with winning combination after secret combination is claimed', async () => {
            prismaMock.secretCombination.findFirst.calledWith(expect.any(Object) as any).mockResolvedValueOnce({
                id: 'secret1',
                assetOne: AssetName.TRIANGLE,
                assetTwo: AssetName.SQUARE,
                assetThree: null,
                assetFour: null,
                sound: Sound.NONE,
                foundById: 'user1',
                foundBy: {
                    nickname: 'secretWinner'
                }
            } as any);

            const response = await request(app)
                .get('/combinations/secret-status');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                found: true,
                foundByNickname: 'secretWinner',
                winningCombination: {
                    assetOne: AssetName.TRIANGLE,
                    assetTwo: AssetName.SQUARE,
                    assetThree: null,
                    assetFour: null,
                    sound: Sound.NONE,
                },
            });
        });

        test('responds with 200 and found: true with null winning combination when secret exists but foundById is null', async () => {
            prismaMock.secretCombination.findFirst.calledWith(expect.any(Object) as any).mockResolvedValueOnce({
                id: 'secret1',
                assetOne: AssetName.TRIANGLE,
                assetTwo: AssetName.SQUARE,
                assetThree: null,
                assetFour: null,
                sound: Sound.NONE,
                foundById: null,
                foundBy: null
            } as any);

            const response = await request(app)
                .get('/combinations/secret-status');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                found: false,
                foundByNickname: null,
                winningCombination: null,
            });
        });
    });
});
