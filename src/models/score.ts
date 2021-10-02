import { GridType, TileType, EmptyTile, Tile, CUBE_COUNT, Game } from '.';

type ClusterType = number[];

const getLargestCluster = (grid: GridType, tiles: TileType[]): ClusterType => {
  const clusters = makeClusters(grid, tiles);
  let largestCluster: ClusterType = [];
  clusters.forEach(cluster => {
    if (cluster.length > largestCluster.length) {
      largestCluster = cluster;
    }
  });
  return largestCluster;
};

const makeClusters = function (grid: GridType, tiles: TileType[]): ClusterType[] {
  let untrackedTiles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  let loopLimit = 0; // TODO: remove me
  const clusters = [];
  while (untrackedTiles.length > 0 && loopLimit < CUBE_COUNT) {
    loopLimit++;
    const tile = tiles[untrackedTiles[0]];
    if (!Tile.isPlaced(tile)) {
      // if it hasn't been played then it can be considered an individual cluster
      clusters.push([tile.id]);
      untrackedTiles.shift();
    } else {
      // otherwise it is on the board, so try and make a cluster from it
      let cluster = makeCluster(grid, tile, []);
      cluster = Array.from(new Set(cluster));
      clusters.push(cluster);
      untrackedTiles = untrackedTiles.filter(id => !cluster.includes(id));
    }
  }
  return clusters;
}

const makeCluster = function (grid: GridType, tile: TileType, cluster: ClusterType): ClusterType {
  // if there is no id, then this is not a tile
  if (tile.id === -1 || tile.character === '') {
    return [];
  }

  // add this id to the cluster
  cluster.push(tile.id);

  // get the surrounding tiles
  const up = (tile.row > 0) ? grid[tile.row - 1][tile.col] : EmptyTile;
  const down = (tile.row < 13) ? grid[tile.row + 1][tile.col] : EmptyTile;
  const left = (tile.col > 0) ? grid[tile.row][tile.col - 1] : EmptyTile;
  const right = (tile.col < 13) ? grid[tile.row][tile.col + 1] : EmptyTile;

  // add the sub clusters to this cluster if they are not already
  if (!cluster.includes(up.id)) {
    cluster.concat(makeCluster(grid, up, cluster));
  }
  if (!cluster.includes(down.id)) {
    cluster.concat(makeCluster(grid, down, cluster));
  }
  if (!cluster.includes(left.id)) {
    cluster.concat(makeCluster(grid, left, cluster));
  }
  if (!cluster.includes(right.id)) {
    cluster.concat(makeCluster(grid, right, cluster));
  }

  return cluster;
}

export const getScore = (tiles: TileType[]) => {
  const grid = Game.makeGridFromTiles(tiles);
  const largestCluster = getLargestCluster(grid, tiles);
  let scoreLargestCluster = 0;
  let scoreOthers = 0;

  tiles.forEach(tile => {
    if (largestCluster.includes(tile.id)) {
      // if this is in the largest cluster then determine how much it is worth
      if (!Tile.isPlaced(tile)) {
        // if this tile is not on the board then don't look for its neighbors
        return;
      }

      // get the tiles around it
      const up = (tile.row > 0 && grid[tile.row - 1][tile.col].id !== -1) ? true : false;
      const down = (tile.row < 13 && grid[tile.row + 1][tile.col].id !== -1) ? true : false;
      const left = (tile.col > 0 && grid[tile.row][tile.col - 1].id !== -1) ? true : false;
      const right = (tile.col < 13 && grid[tile.row][tile.col + 1].id !== -1) ? true : false;

      // if it is in a up down word, add it's score
      if (up || down) {
        scoreLargestCluster += tile.value;
      }

      // if it is in a right left word, add it's score too
      if (right || left) {
        scoreLargestCluster += tile.value;
      }
    } else {
      // if it isn't in the largest cluster then add it's score to the others
      scoreOthers += tile.value;
    }
  });
  return scoreLargestCluster - scoreOthers;
}
