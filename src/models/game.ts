
import { Alphabet, VALUES, CUBES, CubeModel, TileModel, EmptyTile } from '.';

type ClusterType = number[];
export type GridType = TileModel[][];

const makeClusters = function (grid: GridType, tiles: TileModel[]): ClusterType[] {
  let untrackedTiles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const clusters = [];
  while (untrackedTiles.length > 0) {
    const tile = tiles[untrackedTiles[0]];
    if (tile.row === -1 || tile.col === -1) {
      // if it hasn't been played then it can be considered an individual cluster
      clusters.push([tile.index]);
      untrackedTiles.shift()
    } else {
      // otherwise it is on the board, so try and make a cluster from it
      let cluster = makeCluster(grid, tile, []);
      cluster = Array.from(new Set(cluster));
      clusters.push(cluster);
      untrackedTiles = untrackedTiles.filter(index => !cluster.includes(index));
    }
  }
  return clusters;
}

const makeCluster = function (grid: GridType, tile: TileModel, cluster: ClusterType): ClusterType {
  // if there is no index, then this is not a tile
  if (tile.index === -1 || tile.character === '') {
    return [];
  }

  // add this index to the cluster
  cluster.push(tile.index);

  // get the surrounding tiles
  const up = (tile.row > 0) ? grid[tile.row - 1][tile.col] : EmptyTile;
  const down = (tile.row < 13) ? grid[tile.row + 1][tile.col] : EmptyTile;
  const left = (tile.col > 0) ? grid[tile.row][tile.col - 1] : EmptyTile;
  const right = (tile.col < 13) ? grid[tile.row][tile.col + 1] : EmptyTile;

  // add the sub clusters to this cluster if they are not already
  if (!cluster.includes(up.index)) {
    cluster.concat(makeCluster(grid, up, cluster));
  }
  if (!cluster.includes(down.index)) {
    cluster.concat(makeCluster(grid, down, cluster));
  }
  if (!cluster.includes(left.index)) {
    cluster.concat(makeCluster(grid, left, cluster));
  }
  if (!cluster.includes(right.index)) {
    cluster.concat(makeCluster(grid, right, cluster));
  }

  return cluster;
}

export const Game = {
  getValue: (character: Alphabet) => {
    return VALUES[character];
  },

  makeRollString: () => {
    const roll: Alphabet[] = [];
    // if there is no rollString, then make one
    CUBES.forEach((cube: CubeModel) => {
      roll.push(cube.roll());
    });
    return roll;
  },

  makeTiles: (roll: Alphabet[]) => {
    const tiles = [];
    for (let i = 0; i < roll.length; i++) {
      tiles.push(new TileModel({ index: i, character: roll[i] }))
    }
    return tiles;
  },

  makeDefaultGrid: (): GridType => {
    const grid: GridType = [];
    for (let row = 0; row < 14; row++) {
      grid.push([])
      for (let col = 0; col < 14; col++) {
        grid[row].push(new TileModel({ row, col }));
      }
    }
    return grid;
  },

  makeRandomGrid: (tiles: TileModel[]): GridType => {
    const grid = Game.makeDefaultGrid();
    tiles.forEach((tile: TileModel) => {
      let placed = false;
      while (!placed) {
        const row = Math.floor(Math.random() * 14);
        const col = Math.floor(Math.random() * 14);
        if (grid[row][col].index === -1) {
          grid[row][col] = tile;
          tile.place({ row, col });
          placed = true;
        }
      }
    });
    return grid;
  },

  makeGridFromTiles: (tiles: TileModel[]) => {
    const grid = Game.makeDefaultGrid();
    tiles.forEach((tile: TileModel) => {
      const { row, col } = tile;
      if (row !== -1 || col !== -1) {
        grid[row][col] = tile;
        tile.place({ row, col });
      } else {
        // if the tiles contains an unplaced one then return a random grid instead
        return Game.makeRandomGrid(tiles)
      }
    });
    return grid;
  },

  getLargestCluster: (grid: GridType, tiles: TileModel[]): ClusterType => {
    const clusters = makeClusters(grid, tiles);
    let largestCluster: ClusterType = [];
    clusters.forEach(cluster => {
      if (cluster.length > largestCluster.length) {
        largestCluster = cluster;
      }
    });
    return largestCluster;
  }
}
