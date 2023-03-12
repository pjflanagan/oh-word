import { Alphabet, Tile, GRID_SIZE, placeTilesRandomly } from '.';

function convertCoordinatesToGridIndex(row: number | undefined, col: number | undefined): number | '' {
  if (row === undefined || col === undefined) {
    return '';
  }
  return row * GRID_SIZE + col;
}

function convertGridIndexToCoordinates(urlParam: string | '') {
  if (urlParam === '') {
    return [undefined, undefined];
  }
  const gridIndex = parseInt(urlParam)
  return [Math.floor(gridIndex / GRID_SIZE), gridIndex % GRID_SIZE];
}

export enum URLMode {
  ROLL, 
  SCORE
}

export const makeTileString = (mode: URLMode, tiles: Tile[]): string => {
  return tiles.map(tile => {
    const { row, col } = tile.getLocation();
    const gridIndex = (mode === URLMode.ROLL) ? '' : convertCoordinatesToGridIndex(row, col);
    return `${tile.getCharacter()}${gridIndex}`;
  }).join('');
};

export const makeTilesFromTileString = (tiles: string): Tile[] => {
  const newTiles: Tile[] = [];
  let randomPlacement = false;
  const tileArray = [...tiles.matchAll(/(\w)(\d*)/g)];
  tileArray.forEach((tile, i: number) => {
    const character = tile[1] as Alphabet;
    const [row, col] = convertGridIndexToCoordinates(tile[2])
    if (row === undefined || col === undefined) {
      randomPlacement = true;
    }
    newTiles.push(new Tile({ id: i, character, row, col }));
  });
  if (randomPlacement) {
    return placeTilesRandomly(newTiles);
  }
  return newTiles;
};
