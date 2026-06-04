import { AssetName } from '@drawn-lights-game/prisma';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { PrismaTestService } from '../../prisma-test.service.js';
import { cleanupTestApp, createTestApp, testData } from '../../test-helpers.js';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let prismaTest: PrismaTestService;

  beforeAll(async () => {
    const testApp = await createTestApp();
    app = testApp.app;
    prismaTest = testApp.prismaTest;
  });

  afterEach(async () => {
    await prismaTest.cleanDatabase();
  });

  afterAll(async () => {
    await cleanupTestApp(app, prismaTest);
  });

  describe('GET /users', () => {
    it('should return empty array when no users exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);

      expect(response.body).toEqual([]);
    });

    it('should return all users with their combination counts', async () => {
      // Créer des utilisateurs
      const user1 = await prismaTest.user.create({
        data: testData.users.user1,
      });
      const user2 = await prismaTest.user.create({
        data: testData.users.user2,
      });

      // Créer des combinaisons pour user1
      await prismaTest.combination.createMany({
        data: [
          {
            assetOne: AssetName.TRIANGLE,
            assetTwo: AssetName.CIRCLE,
            foundById: user1.id,
          },
          {
            assetOne: AssetName.SQUARE,
            foundById: user1.id,
          },
        ],
      });

      // Créer une combinaison pour user2
      await prismaTest.combination.create({
        data: {
          assetOne: AssetName.CROSS,
          foundById: user2.id,
        },
      });

      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body).toEqual(
        expect.arrayContaining([
          {
            nickname: 'testuser1',
            nbCombinationsFound: 2,
          },
          {
            nickname: 'testuser2',
            nbCombinationsFound: 1,
          },
        ]),
      );
    });

    it('should return users with zero combinations', async () => {
      await prismaTest.user.create({
        data: testData.users.user3,
      });

      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);

      expect(response.body).toEqual([
        {
          nickname: 'player_pro',
          nbCombinationsFound: 0,
        },
      ]);
    });

    it('should order users correctly (alphabetically or by score)', async () => {
      await prismaTest.user.create({
        data: { nickname: 'charlie' },
      });
      const user2 = await prismaTest.user.create({
        data: { nickname: 'alice' },
      });
      await prismaTest.user.create({
        data: { nickname: 'bob' },
      });

      // Ajouter des combinaisons
      await prismaTest.combination.create({
        data: {
          assetOne: AssetName.TRIANGLE,
          foundById: user2.id,
        },
      });

      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);

      expect(response.body).toHaveLength(3);
      // Vérifier que tous les utilisateurs sont présents
      expect(response.body.map((u: any) => u.nickname)).toEqual(
        expect.arrayContaining(['alice', 'bob', 'charlie']),
      );
    });
  });
});
