import { Tile } from "./tile";

export const GRID_SIZE = 10;

export function makeDefaultGrid(): Tile[][] {
  const grid: Tile[][] = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    grid.push([]);
    for (let col = 0; col < GRID_SIZE; col++) {
      grid[row].push(new Tile({ row, col }));
    }
  }
  return grid;
}

export function makeGridFromTiles(tiles: Tile[]): Tile[][] {
  const grid = makeDefaultGrid();
  tiles.forEach((tile: Tile) => {
    if (tile.isPlaced()) {
      const { row, col } = tile;
      grid[row][col] = tile;
    }
  });
  return grid;
}

export type Grid = Tile[][];