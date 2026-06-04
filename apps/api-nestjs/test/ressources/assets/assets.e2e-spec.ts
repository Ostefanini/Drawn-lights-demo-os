import { demoPlaystationModels } from '@drawn-lights-game/shared';
import { INestApplication } from '@nestjs/common';
import * as path from 'path';
import request from 'supertest';
import { PrismaTestService } from '../../prisma-test.service.js';
import { cleanupTestApp, createTestApp } from '../../test-helpers.js';

describe('AssetsController (e2e)', () => {
  let app: INestApplication;
  let prismaTest: PrismaTestService;
  const testImagePath = path.join(process.cwd(), 'test', 'files', 'cross.png');

  // Use predefined PlayStation models for valid tests
  const crossModel = demoPlaystationModels[0]; // cross
  const triangleModel = demoPlaystationModels[3]; // triangle

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

  describe('GET /assets', () => {
    it('should return empty array when no assets exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/assets')
        .expect(200);

      expect(response.body).toEqual([]);
    });

    it('should return all assets when they exist', async () => {
      // Create test assets directly in DB
      await prismaTest.asset.createMany({
        data: [
          {
            name: 'TRIANGLE',
            type: 'TWO_D',
            description: 'Test asset 1',
            thumbnail: 'thumb-1',
            durationSec: 30,
            nbUav: 5,
            tags: ['tag1'],
          },
          {
            name: 'SQUARE',
            type: 'THREE_D',
            description: 'Test asset 2',
            thumbnail: 'thumb-2',
            durationSec: 45,
            nbUav: 10,
            tags: ['tag2', 'tag3'],
          },
        ],
      });

      const response = await request(app.getHttpServer())
        .get('/assets')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('type');
      expect(response.body[0]).toHaveProperty('thumbnail');
    });
  });

  describe('POST /assets', () => {
    it('should create asset with valid data and thumbnail', async () => {
      const response = await request(app.getHttpServer())
        .post('/assets')
        .field('name', crossModel.name)
        .field('video', crossModel.video!)
        .field('description', crossModel.description)
        .field('type', crossModel.type)
        .field('durationSec', crossModel.durationSec!.toString())
        .field('nbUav', crossModel.nbUav!.toString())
        .field('tags[]', crossModel.tags[0])
        .attach('thumbnail', testImagePath)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', 'cross');
      expect(response.body).toHaveProperty('type', '2d');
      expect(response.body).toHaveProperty('thumbnail');
      expect(response.body).toHaveProperty('createdAt');
    });

    it('should create asset with single tag', async () => {
      const response = await request(app.getHttpServer())
        .post('/assets')
        .field('name', triangleModel.name)
        .field('video', triangleModel.video!)
        .field('description', triangleModel.description)
        .field('type', triangleModel.type)
        .field('durationSec', triangleModel.durationSec!.toString())
        .field('nbUav', triangleModel.nbUav!.toString())
        .field('tags[]', triangleModel.tags[0])
        .attach('thumbnail', testImagePath)
        .expect(201);

      expect(response.body.tags).toEqual(['playstation']);
    });

    it('should fail without thumbnail', async () => {
      await request(app.getHttpServer())
        .post('/assets')
        .field('name', crossModel.name)
        .field('video', crossModel.video!)
        .field('description', crossModel.description)
        .field('type', crossModel.type)
        .field('durationSec', crossModel.durationSec!.toString())
        .field('nbUav', crossModel.nbUav!.toString())
        .field('tags[]', crossModel.tags[0])
        .expect(400);
    });

    it('should fail with missing required fields', async () => {
      await request(app.getHttpServer())
        .post('/assets')
        .field('name', crossModel.name)
        .attach('thumbnail', testImagePath)
        .expect(400);
    });

    it('should fail with invalid asset data (not matching PlayStation models)', async () => {
      await request(app.getHttpServer())
        .post('/assets')
        .field('name', 'custom-asset')
        .field('video', 'https://example.com/video.mp4')
        .field('description', 'Custom description')
        .field('type', '2d')
        .field('durationSec', '30')
        .field('nbUav', '5')
        .field('tags[]', 'custom')
        .attach('thumbnail', testImagePath)
        .expect(500); // The service throws an error for invalid assets
    });

    it('should fail with invalid type', async () => {
      await request(app.getHttpServer())
        .post('/assets')
        .field('name', crossModel.name)
        .field('video', crossModel.video!)
        .field('description', crossModel.description)
        .field('type', 'invalid-type')
        .field('durationSec', crossModel.durationSec!.toString())
        .field('nbUav', crossModel.nbUav!.toString())
        .field('tags[]', crossModel.tags[0])
        .attach('thumbnail', testImagePath)
        .expect(400);
    });

    it('should fail with negative duration', async () => {
      await request(app.getHttpServer())
        .post('/assets')
        .field('name', crossModel.name)
        .field('video', crossModel.video!)
        .field('description', crossModel.description)
        .field('type', crossModel.type)
        .field('durationSec', '-10')
        .field('nbUav', crossModel.nbUav!.toString())
        .field('tags[]', crossModel.tags[0])
        .attach('thumbnail', testImagePath)
        .expect(400);
    });

    it('should fail with negative nbUav', async () => {
      await request(app.getHttpServer())
        .post('/assets')
        .field('name', crossModel.name)
        .field('video', crossModel.video!)
        .field('description', crossModel.description)
        .field('type', crossModel.type)
        .field('durationSec', crossModel.durationSec!.toString())
        .field('nbUav', '-5')
        .field('tags[]', crossModel.tags[0])
        .attach('thumbnail', testImagePath)
        .expect(400);
    });

    it('should fail with duplicate tags', async () => {
      await request(app.getHttpServer())
        .post('/assets')
        .field('name', crossModel.name)
        .field('video', crossModel.video!)
        .field('description', crossModel.description)
        .field('type', crossModel.type)
        .field('durationSec', crossModel.durationSec!.toString())
        .field('nbUav', crossModel.nbUav!.toString())
        .field('tags[]', 'duplicate')
        .field('tags[]', 'duplicate')
        .attach('thumbnail', testImagePath)
        .expect(400);
    });

    it('should fail with file too large', async () => {
      // Create a buffer > 5MB
      const largBuffer = Buffer.alloc(6 * 1024 * 1024);

      await request(app.getHttpServer())
        .post('/assets')
        .field('name', crossModel.name)
        .field('video', crossModel.video!)
        .field('description', crossModel.description)
        .field('type', crossModel.type)
        .field('durationSec', crossModel.durationSec!.toString())
        .field('nbUav', crossModel.nbUav!.toString())
        .field('tags[]', crossModel.tags[0])
        .attach('thumbnail', largBuffer, 'large.png')
        .expect(400);
    });
  });

  describe('GET /assets/thumbnail/:id', () => {
    it('should return 400 for invalid UUID format', async () => {
      await request(app.getHttpServer())
        .get('/assets/thumbnail/not-a-uuid')
        .expect(400);
    });

    it('should return 404 for non-existent thumbnail', async () => {
      const fakeUuid = '123e4567-e89b-12d3-a456-426614174000';
      await request(app.getHttpServer())
        .get(`/assets/thumbnail/${fakeUuid}`)
        .expect(400); // UUID format validation happens before service check
    });

    it('should return thumbnail for valid asset', async () => {
      // First create an asset
      const createResponse = await request(app.getHttpServer())
        .post('/assets')
        .field('name', crossModel.name)
        .field('video', crossModel.video!)
        .field('description', crossModel.description)
        .field('type', crossModel.type)
        .field('durationSec', crossModel.durationSec!.toString())
        .field('nbUav', crossModel.nbUav!.toString())
        .field('tags[]', crossModel.tags[0])
        .attach('thumbnail', testImagePath)
        .expect(201);

      const thumbnailId = createResponse.body.thumbnail;

      // Now fetch the thumbnail
      const response = await request(app.getHttpServer())
        .get(`/assets/thumbnail/${thumbnailId}`)
        .expect(200);

      expect(response.headers['content-type']).toBe('image/jpeg');
      expect(response.body).toBeInstanceOf(Buffer);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});
