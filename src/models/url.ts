import { Alphabet, TileType, Tile, CUBE_COUNT, placeTilesRandomly, UNSET, isUnset } from '.';

export type CopyTypeEnum = 'ROLL' | 'SCORE';

function pad(num: number) {
  const s = '0' + num;
  return s.substr(s.length - 2);
}

export const makeTileString = (mode: CopyTypeEnum, tiles: TileType[]): string => {
  return tiles.map(tile => {
    const row = (mode === 'ROLL') ? UNSET : pad(tile.row);
    const col = (mode === 'ROLL') ? UNSET : pad(tile.col);
    return `${tile.character}${row}${col}`;
  }).join('.');
};

export const makeURLParamString = (mode: CopyTypeEnum, tiles: TileType[]): string => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('tiles', makeTileString(mode, tiles));
  return `?${urlSearchParams.toString()}`;
}


export const makeTilesFromTileString = (tiles: string): TileType[] => {
  const newTiles: TileType[] = [];
  let modeRoll = false;
  tiles.split('.').forEach((tile: string, i: number) => {
    const character = tile[0] as Alphabet;
    const row = parseInt(tile[1] + tile[2]);
    const col = parseInt(tile[3] + tile[4]);
    if (isUnset(row) || isUnset(col)) {
      modeRoll = true;
    }
    newTiles.push(Tile.makeTile({ id: i, character, row, col }));
  });
  if (newTiles.length !== CUBE_COUNT) {
    return [];
  }
  if (modeRoll) {
    return placeTilesRandomly(newTiles);
  }
  return newTiles;
};
