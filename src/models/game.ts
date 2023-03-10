
import { Grid, Alphabet, CUBES, Tile, isUnset, makeCubeRollString, makeDefaultGrid, getClusterScore, makeGridFromTiles, GRID_SIZE } from '.';

export const placeTilesRandomly = (tiles: Tile[]): Tile[] => {
  const grid = makeDefaultGrid();
  const newTiles: Tile[] = [];
  tiles.forEach((tile: Tile) => {
    let placed = false;
    while (!placed) {
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);
      if (isUnset(grid[row][col].id)) {
        grid[row][col] = tile;
        const newTile = new Tile({ ...tile, row, col });
        newTiles.push(newTile);
        placed = true;
      }
    }
  });
  return newTiles;
};

export const Game = {

  makeRollString: (): Alphabet[] => {
    // TODO: make my own version
    return makeCubeRollString();
  },

  makeTiles: (roll: Alphabet[]): Tile[] => {
    const tiles = [];
    for (let i = 0; i < roll.length; i++) {
      tiles.push(new Tile({ id: i, character: roll[i] }))
    }
    return placeTilesRandomly(tiles);
  },

  makeGridFromTiles: (tiles: Tile[]): Grid => {
    return makeGridFromTiles(tiles);
  },

  getScore: (tiles: Tile[]): number => {
    if (!tiles || tiles.length === 0) {
      return 0;
    }
    const score = getClusterScore(tiles);
    return Math.max(score, 0);
  }
}
