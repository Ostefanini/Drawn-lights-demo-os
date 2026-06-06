import express from 'express';
import { Readable } from 'stream';

export const videoRouter = express.Router();

const DRIVE_ID_PATTERN = /^[a-zA-Z0-9_-]+$/;
const FORWARDED_RESPONSE_HEADERS = ['content-type', 'content-length', 'content-range'] as const;

videoRouter.get('/proxy', async (req, res) => {
    const { id } = req.query;

    if (!id || typeof id !== 'string' || !DRIVE_ID_PATTERN.test(id)) {
        return res.status(400).json({ error: 'Invalid Drive file ID' });
    }

    const url = `https://drive.usercontent.google.com/download?id=${id}&export=view&authuser=0`;

    const fetchHeaders: Record<string, string> = {};
    const range = req.headers['range'];
    if (range) fetchHeaders['range'] = range;

    const driveRes = await fetch(url, { headers: fetchHeaders });

    res.status(driveRes.status);

    for (const key of FORWARDED_RESPONSE_HEADERS) {
        const value = driveRes.headers.get(key);
        if (value) res.setHeader(key, value);
    }
    res.setHeader('accept-ranges', 'bytes');

    Readable.fromWeb(driveRes.body as import('stream/web').ReadableStream).pipe(res);
});
