
import { Grid, Alphabet, Tile, isUnset, makeRandomLetterSet, makeDefaultGrid, makeGridFromTiles, GRID_SIZE } from '.';
import { NO_SCORE, getScore, Score } from './score';

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

  makeRandomLetterSet: (): Alphabet[] => {
    return makeRandomLetterSet();
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

  getScore: (tiles: Tile[]): Score => {
    if (!tiles || tiles.length === 0) {
      return NO_SCORE;
    }
    return getScore(tiles);
  }
}
