import { type Asset, type Sound } from '@drawn-lights-game/shared'

export const computeAssetQueryParams = (playlist: Asset[], sound: Sound) => {
    return `assetOne=${playlist[0].name.toUpperCase()}&sound=${sound}${playlist[1] ? `&assetTwo=${playlist[1].name.toUpperCase()}` : ""}${playlist[2] ? `&assetThree=${playlist[2].name.toUpperCase()}` : ""}${playlist[3] ? `&assetFour=${playlist[3].name.toUpperCase()}` : ""}`
}