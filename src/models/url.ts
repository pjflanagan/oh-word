import { Alphabet, Tile, GRID_SIZE, placeTilesRandomly, UNSET, isUnset, CUBES } from '.';

function convertCoordinatesToGridIndex(row: number, col: number): number | '' {
  if (row === UNSET || col === UNSET) {
    return '';
  }
  return row * GRID_SIZE + col;
}

function convertGridIndexToCoordinates(gridIndex: number | '') {
  if (gridIndex === '') {
    return [UNSET, UNSET];
  }
  return [Math.floor(gridIndex / GRID_SIZE), gridIndex % GRID_SIZE];
}

export enum URLMode {
  ROLL, 
  SCORE
}

export const makeTileString = (mode: URLMode, tiles: Tile[]): string => {
  return tiles.map(tile => {
    const gridIndex = (mode === URLMode.ROLL) ? '' : convertCoordinatesToGridIndex(tile.row, tile.col);
    return `${tile.character}${gridIndex}`;
  }).join('');
};

export const makeURLParamString = (mode: URLMode, tiles: Tile[]): string => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('tiles', makeTileString(mode, tiles));
  return `?${urlSearchParams.toString()}`;
}

export const makeTilesFromTileString = (tiles: string): Tile[] => {
  const newTiles: Tile[] = [];
  let modeRoll = false;
  const tileArray = [...tiles.matchAll(/(\w)(\d*)/g)];
  tileArray.forEach((tile, i: number) => {
    const character = tile[1] as Alphabet;
    const [row, col] = convertGridIndexToCoordinates(parseInt(tile[2]))
    if (isUnset(row) || isUnset(col)) {
      modeRoll = true;
    }
    newTiles.push(new Tile({ id: i, character, row, col }));
  });
  if (newTiles.length !== CUBES.length) {
    return [];
  }
  if (modeRoll) {
    return placeTilesRandomly(newTiles);
  }
  return newTiles;
};
