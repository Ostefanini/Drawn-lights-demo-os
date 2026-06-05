import { AssetName, Sound } from '@drawn-lights-game/prisma';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { PrismaTestService } from '../../prisma-test.service.js';
import { cleanupTestApp, createTestApp, testData } from '../../test-helpers.js';

describe('CombinationsController (e2e)', () => {
  let app: INestApplication;
  let prismaTest: PrismaTestService;

  beforeAll(async () => {
    const testApp = await createTestApp();
    app = testApp.app;
    prismaTest = testApp.prismaTest;
  });

  beforeEach(async () => {
    // Create test assets
    await prismaTest.asset.createMany({
      data: [
        {
          name: AssetName.TRIANGLE,
          type: 'TWO_D',
          description: 'Triangle asset',
          thumbnail: 'thumb-triangle',
          durationSec: 30,
          nbUav: 5,
          tags: ['test'],
        },
        {
          name: AssetName.SQUARE,
          type: 'TWO_D',
          description: 'Square asset',
          thumbnail: 'thumb-square',
          durationSec: 30,
          nbUav: 5,
          tags: ['test'],
        },
        {
          name: AssetName.CIRCLE,
          type: 'TWO_D',
          description: 'Circle asset',
          thumbnail: 'thumb-circle',
          durationSec: 30,
          nbUav: 5,
          tags: ['test'],
        },
        {
          name: AssetName.CROSS,
          type: 'THREE_D',
          description: 'Cross asset',
          thumbnail: 'thumb-cross',
          durationSec: 45,
          nbUav: 10,
          tags: ['test'],
        },
      ],
    });

    await prismaTest.secretCombination.create({
      data: {
        assetOne: AssetName.TRIANGLE,
        assetTwo: AssetName.SQUARE,
        sound: Sound.HEALING,
        foundById: null,
      },
    });

    // Create a test user
    await prismaTest.user.create({
      data: testData.users.user1,
    });
  });

  afterEach(async () => {
    await prismaTest.cleanDatabase();
  });

  afterAll(async () => {
    await cleanupTestApp(app, prismaTest);
  });

  describe('GET /combinations/is-found', () => {
    it('should return exist: false when combination does not exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/combinations/is-found')
        .query({
          assetOne: 'TRIANGLE',
          sound: 'none',
        })
        .expect(200);

      expect(response.body).toEqual({
        exist: false,
        foundBy: null,
        isSecretCombinationFound: false,
      });
    });

    it('should return exist: true when combination exists', async () => {
      // Create a combination
      const user = await prismaTest.user.findFirst();
      await prismaTest.combination.create({
        data: {
          assetOne: AssetName.TRIANGLE,
          sound: Sound.NONE,
          foundById: user!.id,
        },
      });

      const response = await request(app.getHttpServer())
        .get('/combinations/is-found')
        .query({
          assetOne: 'TRIANGLE',
          sound: 'none',
        })
        .expect(200);

      expect(response.body).toEqual({
        exist: true,
        foundBy: 'testuser1',
        isSecretCombinationFound: false,
      });
    });

    it('should work with multiple assets', async () => {
      const user = await prismaTest.user.findFirst();
      await prismaTest.combination.create({
        data: {
          assetOne: AssetName.TRIANGLE,
          assetTwo: AssetName.SQUARE,
          sound: Sound.HEALING,
          foundById: user!.id,
        },
      });

      const response = await request(app.getHttpServer())
        .get('/combinations/is-found')
        .query({
          assetOne: 'TRIANGLE',
          assetTwo: 'SQUARE',
          sound: 'healing',
        })
        .expect(200);

      expect(response.body.exist).toBe(true);
      expect(response.body.foundBy).toBe('testuser1');
    });

    it('should work with four assets and sound', async () => {
      const user = await prismaTest.user.findFirst();
      await prismaTest.combination.create({
        data: {
          assetOne: AssetName.TRIANGLE,
          assetTwo: AssetName.SQUARE,
          assetThree: AssetName.CIRCLE,
          assetFour: AssetName.CROSS,
          sound: Sound.GLOSSY,
          foundById: user!.id,
        },
      });

      const response = await request(app.getHttpServer())
        .get('/combinations/is-found')
        .query({
          assetOne: 'TRIANGLE',
          assetTwo: 'SQUARE',
          assetThree: 'CIRCLE',
          assetFour: 'CROSS',
          sound: 'glossy',
        })
        .expect(200);

      expect(response.body.exist).toBe(true);
    });

    it('should validate required parameters', async () => {
      await request(app.getHttpServer())
        .get('/combinations/is-found')
        .query({
          assetOne: 'TRIANGLE',
          // sound is missing
        })
        .expect(400);
    });

    it('should validate asset order (no gaps)', async () => {
      await request(app.getHttpServer())
        .get('/combinations/is-found')
        .query({
          assetOne: 'TRIANGLE',
          assetThree: 'CIRCLE', // Gap: assetTwo is missing
          sound: 'none',
        })
        .expect(400);
    });

    it('should fail with invalid asset name', async () => {
      await request(app.getHttpServer())
        .get('/combinations/is-found')
        .query({
          assetOne: 'INVALID_ASSET',
          sound: 'none',
        })
        .expect(400);
    });

    it('should fail with invalid sound', async () => {
      await request(app.getHttpServer())
        .get('/combinations/is-found')
        .query({
          assetOne: 'TRIANGLE',
          sound: 'invalid-sound',
        })
        .expect(400);
    });

    it('should fail when asset does not exist in database', async () => {
      // Delete all assets
      await prismaTest.asset.deleteMany();

      await request(app.getHttpServer())
        .get('/combinations/is-found')
        .query({
          assetOne: 'TRIANGLE',
          sound: 'none',
        })
        .expect(400); // Returns 400 because assets don't exist in DB
    });
  });

  describe('POST /combinations/attribute', () => {
    it('should create new combination successfully', async () => {
      await request(app.getHttpServer())
        .post('/combinations/attribute')
        .query({
          assetOne: 'TRIANGLE',
          sound: 'none',
        })
        .send({ userNickname: 'newplayer' })
        .expect(201);

      // Verify combination was created
      const combination = await prismaTest.combination.findFirst({
        where: { assetOne: AssetName.TRIANGLE, sound: Sound.NONE },
        include: { foundBy: true },
      });
      expect(combination).toBeTruthy();
      expect(combination?.foundBy.nickname).toBe('newplayer');
    });

    it('should create combination with existing user', async () => {
      await request(app.getHttpServer())
        .post('/combinations/attribute')
        .query({
          assetOne: 'SQUARE',
          sound: 'healing',
        })
        .send({ userNickname: 'testuser1' })
        .expect(201);

      // Verify combination was created with existing user
      const combination = await prismaTest.combination.findFirst({
        where: { assetOne: AssetName.SQUARE, sound: Sound.HEALING },
        include: { foundBy: true },
      });
      expect(combination?.foundBy.nickname).toBe('testuser1');
    });

    it('should create combination with multiple assets', async () => {
      await request(app.getHttpServer())
        .post('/combinations/attribute')
        .query({
          assetOne: 'TRIANGLE',
          assetTwo: 'SQUARE',
          assetThree: 'CIRCLE',
          sound: 'emerveille',
        })
        .send({ userNickname: 'pro_player' })
        .expect(201);

      // Verify combination was created correctly
      const combination = await prismaTest.combination.findFirst({
        where: {
          assetOne: AssetName.TRIANGLE,
          assetTwo: AssetName.SQUARE,
          assetThree: AssetName.CIRCLE,
          sound: Sound.EMERVEILLE,
        },
      });
      expect(combination).toBeTruthy();
      expect(combination?.assetFour).toBeNull();
    });

    it('should validate user nickname with invalid characters', async () => {
      await request(app.getHttpServer())
        .post('/combinations/attribute')
        .query({
          assetOne: 'TRIANGLE',
          sound: 'none',
        })
        .send({ userNickname: 'invalid-nickname' }) // Contains hyphen (not allowed)
        .expect(400);
    });

    it('should validate user nickname length (too long)', async () => {
      await request(app.getHttpServer())
        .post('/combinations/attribute')
        .query({
          assetOne: 'TRIANGLE',
          sound: 'none',
        })
        .send({ userNickname: 'a'.repeat(35) }) // Too long (max 30 chars)
        .expect(400);
    });

    it('should validate required fields', async () => {
      await request(app.getHttpServer())
        .post('/combinations/attribute')
        .query({
          assetOne: 'TRIANGLE',
          sound: 'none',
        })
        .send({}) // userNickname is missing
        .expect(400);
    });

    it('should fail when combination already exists', async () => {
      // Create first combination
      await request(app.getHttpServer())
        .post('/combinations/attribute')
        .query({
          assetOne: 'TRIANGLE',
          sound: 'none',
        })
        .send({ userNickname: 'firstplayer' })
        .expect(201);

      // Try to create same combination again
      await request(app.getHttpServer())
        .post('/combinations/attribute')
        .query({
          assetOne: 'TRIANGLE',
          sound: 'none',
        })
        .send({ userNickname: 'secondplayer' })
        .expect(400);
    });

    it('should reject profane nicknames', async () => {
      await request(app.getHttpServer())
        .post('/combinations/attribute')
        .query({
          assetOne: 'TRIANGLE',
          sound: 'none',
        })
        .send({ userNickname: 'fuck' })
        .expect(400);
    });

    it('should fail with invalid asset names', async () => {
      await request(app.getHttpServer())
        .post('/combinations/attribute')
        .query({
          assetOne: 'INVALID',
          sound: 'none',
        })
        .send({ userNickname: 'player123' })
        .expect(400);
    });

    it('should fail with assets not in database', async () => {
      // Delete all assets
      await prismaTest.asset.deleteMany();

      await request(app.getHttpServer())
        .post('/combinations/attribute')
        .query({
          assetOne: 'TRIANGLE',
          sound: 'none',
        })
        .send({ userNickname: 'player123' })
        .expect(400); // Returns 400 because assets don't exist
    });

    it('should fail with asset gaps', async () => {
      await request(app.getHttpServer())
        .post('/combinations/attribute')
        .query({
          assetOne: 'TRIANGLE',
          assetThree: 'CIRCLE', // Missing assetTwo
          sound: 'none',
        })
        .send({ userNickname: 'player123' })
        .expect(400);
    });
  });
});
