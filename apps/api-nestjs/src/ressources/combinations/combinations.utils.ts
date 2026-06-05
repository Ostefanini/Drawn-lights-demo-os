import { Sound as SoundModel } from '@drawn-lights-game/prisma';
import { Sound } from '@drawn-lights-game/shared';

export const formatSound = (sound: Sound): SoundModel => {
  switch (sound) {
    case 'healing':
      return SoundModel.HEALING;
    case 'emerveille':
      return SoundModel.EMERVEILLE;
    case 'glossy':
      return SoundModel.GLOSSY;
    case 'none':
    default:
      return SoundModel.NONE;
  }
};
