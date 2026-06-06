import { afterEach, describe, expect, jest, test } from '@jest/globals';
import { Readable } from 'stream';
import request from 'supertest';
import app from '../src/index';

describe('Video proxy endpoint', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('GET /video/proxy returns 400 for missing id', async () => {
        const response = await request(app).get('/video/proxy');
        expect(response.status).toBe(400);
    });

    test('GET /video/proxy returns 400 for invalid id characters', async () => {
        const response = await request(app).get('/video/proxy?id=../evil');
        expect(response.status).toBe(400);
    });

    test('GET /video/proxy fetches from Drive and streams response', async () => {
        const videoContent = Buffer.from('fake-video-bytes');
        const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce(
            new Response(Readable.toWeb(Readable.from(videoContent)) as ReadableStream, {
                status: 200,
                headers: { 'content-type': 'video/mp4', 'content-length': String(videoContent.length) },
            }),
        );

        const response = await request(app).get('/video/proxy?id=validFileId123');

        expect(mockFetch).toHaveBeenCalledWith(
            'https://drive.usercontent.google.com/download?id=validFileId123&export=view&authuser=0',
            { headers: {} },
        );
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toContain('video/mp4');
        expect(response.headers['accept-ranges']).toBe('bytes');
    });

    test('GET /video/proxy forwards the Range header to Drive', async () => {
        const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce(
            new Response(Readable.toWeb(Readable.from(Buffer.from(''))) as ReadableStream, {
                status: 206,
                headers: { 'content-range': 'bytes 0-999/99999' },
            }),
        );

        const response = await request(app)
            .get('/video/proxy?id=validId')
            .set('Range', 'bytes=0-999');

        expect(mockFetch).toHaveBeenCalledWith(expect.any(String), {
            headers: { range: 'bytes=0-999' },
        });
        expect(response.status).toBe(206);
        expect(response.headers['content-range']).toBe('bytes 0-999/99999');
    });
});
