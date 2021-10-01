import { Alphabet, TileType, Tile, CUBE_COUNT } from "models";

export type CopyTypeEnum = 'ROLL' | 'SCORE';

function pad(num: number) {
  var s = "0" + num;
  return s.substr(s.length - 2);
}

const makeTileString = (mode: CopyTypeEnum, tiles: TileType[]): string => {
  return tiles.map(tile => {
    const row = (mode === 'ROLL') ? -1 : pad(tile.row);
    const col = (mode === 'ROLL') ? -1 : pad(tile.col);
    return `${tile.character}${row}${col}`;
  }).join('-');
};

export const makeURLParamString = (mode: CopyTypeEnum, tiles: TileType[]): string => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('tiles', makeTileString(mode, tiles));
  return `?${urlSearchParams.toString()}`;
}


export const makeTilesFromTileString = (tiles: string): TileType[] => {
  const newTiles: TileType[] = [];
  tiles.split('-').forEach((tile: string, i: number) => {
    const character = tile[0] as Alphabet;
    const row = parseInt(tile[1] + tile[2]);
    const col = parseInt(tile[3] + tile[4]);
    newTiles.push(Tile.makeTile({ id: i, character, row, col }));
  });
  // TODO: error check the URL
  if (newTiles.length !== CUBE_COUNT) {
    return [];
  }
  return newTiles;
};
