import { AssetName, Sound, prisma } from './prisma.js';

const ALL_ASSET_NAMES: AssetName[] = [
    AssetName.TRIANGLE,
    AssetName.CIRCLE,
    AssetName.CROSS,
    AssetName.SQUARE,
];

const ALL_SOUNDS: Sound[] = [
    Sound.NONE,
    Sound.EMERVEILLE,
    Sound.HEALING,
    Sound.GLOSSY,
];

export async function seedSecretCombination(): Promise<void> {
    const existing = await prisma.secretCombination.findFirst();
    if (existing) {
        console.log('🔒 Secret combination already exists, skipping seed');
        return;
    }

    const count = Math.floor(Math.random() * 4) + 1;
    const shuffled = [...ALL_ASSET_NAMES].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, count);
    const sound = ALL_SOUNDS[Math.floor(Math.random() * ALL_SOUNDS.length)];

    await prisma.secretCombination.create({
        data: {
            assetOne: picked[0],
            assetTwo: picked[1] ?? null,
            assetThree: picked[2] ?? null,
            assetFour: picked[3] ?? null,
            sound,
        },
    });

    console.log(`✅ Seeded secret combination: ${picked.join(', ')} (sound: ${sound})`);
}
