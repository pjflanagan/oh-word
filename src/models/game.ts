
import { Alphabet, CUBES, rollCube, Cube, TileType, Tile, getScore } from '.';

export type GridType = TileType[][];

export const CUBE_COUNT = CUBES.length;

const placeTilesRandomly = (tiles: TileType[]): TileType[] => {
  const grid = Game.makeDefaultGrid();
  const newTiles: TileType[] = [];
  tiles.forEach((tile: TileType) => {
    let placed = false;
    while (!placed) {
      const row = Math.floor(Math.random() * CUBE_COUNT);
      const col = Math.floor(Math.random() * CUBE_COUNT);
      if (grid[row][col].id === -1) {
        grid[row][col] = tile;
        const newTile = Tile.makePlacedTile(tile, { row, col });
        newTiles.push(newTile);
        placed = true;
      }
    }
  });
  return newTiles;
};

export const Game = {

  makeRollString: () => {
    const roll: Alphabet[] = [];
    // if there is no rollString, then make one
    CUBES.forEach((cube: Cube) => {
      roll.push(rollCube(cube));
    });
    return roll;
  },

  makeTiles: (roll: Alphabet[]) => {
    const tiles = [];
    for (let i = 0; i < roll.length; i++) {
      tiles.push(Tile.makeTile({ id: i, character: roll[i] }))
    }
    return placeTilesRandomly(tiles);
  },

  makeDefaultGrid: (): GridType => {
    const grid: GridType = [];
    for (let row = 0; row < CUBE_COUNT; row++) {
      grid.push([]);
      for (let col = 0; col < CUBE_COUNT; col++) {
        grid[row].push(Tile.makeTile({ row, col }));
      }
    }
    return grid;
  },

  makeGridFromTiles: (tiles: TileType[]) => {
    const grid = Game.makeDefaultGrid();
    tiles.forEach((tile: TileType) => {
      if (Tile.isPlaced(tile)) {
        const { row, col } = tile;
        grid[row][col] = tile;
      }
    });
    return grid;
  },


  getScore: (tiles: TileType[]): number => {
    if (!tiles || tiles.length === 0) {
      return 0;
    }
    const grid = Game.makeGridFromTiles(tiles);
    const score = getScore(grid, tiles);
    return Math.max(score, 0);
  }
}
