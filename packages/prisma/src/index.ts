import { PrismaPg } from '@prisma/adapter-pg'
import { config } from 'dotenv'
import {
    AssetName,
    AssetType,
    PrismaClient,
    Sound,
    type Asset,
    type Combination,
    type SecretCombination,
    type User,
} from '../generated/client.js'

// Charge le .env depuis la racine du workspace (3 niveaux au-dessus de packages/prisma/src/)
config({ path: new URL('../../../.env', import.meta.url).pathname })

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export { AssetName, AssetType, prisma, PrismaClient, PrismaPg, Sound }
export type { Asset, Asset as AssetModel, Combination, SecretCombination, User }

