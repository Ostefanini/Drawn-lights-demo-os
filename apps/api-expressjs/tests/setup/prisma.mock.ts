// tests/setup/prisma.mock.ts
import { beforeEach, jest } from '@jest/globals';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';

import { type PrismaClient, AssetName, AssetType as AssetTypeGenerated, Sound } from '@drawn-lights-game/prisma';

jest.unstable_mockModule('../../src/services/prisma.js', () => ({
    __esModule: true,
    prisma: mockDeep<PrismaClient>(),
    AssetType: AssetTypeGenerated,
    AssetName: AssetName,
    Sound: Sound,
}))

const { prisma } = await import('../../src/services/prisma.js')

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>

beforeEach(() => {
    mockReset(prismaMock)
})
