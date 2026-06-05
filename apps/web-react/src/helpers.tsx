import { type Asset, type Sound } from '@drawn-lights-game/shared';

export const computeAssetQueryParams = (playlist: Asset[], sound: Sound): string => {
    const params = new URLSearchParams();
    params.set('assetOne', playlist[0].name.toUpperCase());
    params.set('sound', sound);
    if (playlist[1]) params.set('assetTwo', playlist[1].name.toUpperCase());
    if (playlist[2]) params.set('assetThree', playlist[2].name.toUpperCase());
    if (playlist[3]) params.set('assetFour', playlist[3].name.toUpperCase());
    return params.toString();
}