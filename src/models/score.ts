import { Grid, EmptyTile, Tile, Game, isSet, isUnset, makeGridFromTiles, GRID_SIZE } from '.';

type ClusterType = number[];

const getLargestCluster = (grid: Grid, tiles: Tile[]): ClusterType => {
  const clusters = makeClusters(grid, tiles);
  let largestCluster: ClusterType = [];
  clusters.forEach(cluster => {
    if (cluster.length > largestCluster.length) {
      largestCluster = cluster;
    }
  });
  return largestCluster;
};

const makeClusters = function (grid: Grid, tiles: Tile[]): ClusterType[] {
  let untrackedTileIndicies = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const clusters = [];
  while (untrackedTileIndicies.length > 0) {
    const tile = tiles.find(t => t.id === untrackedTileIndicies[0]);
    if (!tile) {
      untrackedTileIndicies.shift();
      break;
    }
    if (!tile.isPlaced()) {
      // if it hasn't been played then it can be considered an individual cluster
      clusters.push([tile.id]);
      untrackedTileIndicies.shift();
    } else {
      // otherwise it is on the board, so try and make a cluster from it
      let cluster = makeCluster(grid, tile, []);
      cluster = Array.from(new Set(cluster));
      clusters.push(cluster);
      untrackedTileIndicies = untrackedTileIndicies.filter(id => !cluster.includes(id));
    }
  }
  return clusters;
}

const makeCluster = function (grid: Grid, tile: Tile, cluster: ClusterType): ClusterType {
  // if there is no id, then this is not a tile
  if (isUnset(tile.id) || tile.character === '') {
    return [];
  }

  // add this id to the cluster
  cluster.push(tile.id);

  // get the surrounding tiles
  const up = (tile.row > 0) ? grid[tile.row - 1][tile.col] : EmptyTile;
  const down = (tile.row < GRID_SIZE - 1) ? grid[tile.row + 1][tile.col] : EmptyTile;
  const left = (tile.col > 0) ? grid[tile.row][tile.col - 1] : EmptyTile;
  const right = (tile.col < GRID_SIZE - 1) ? grid[tile.row][tile.col + 1] : EmptyTile;

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

export const getClusterScore = (tiles: Tile[]): number => {
  const grid = makeGridFromTiles(tiles);
  const largestCluster = getLargestCluster(grid, tiles);
  let scoreLargestCluster = 0;
  let scoreOthers = 0;

  tiles.forEach(tile => {
    if (largestCluster.includes(tile.id)) {
      // if this is in the largest cluster then determine how much it is worth
      if (!tile.isPlaced()) {
        // if this tile is not on the board then don't look for its neighbors
        return;
      }

      // get the tiles around it
      const up = (tile.row > 0 && isSet(grid[tile.row - 1][tile.col].id)) ? true : false;
      const down = (tile.row < GRID_SIZE - 1 && isSet(grid[tile.row + 1][tile.col].id)) ? true : false;
      const left = (tile.col > 0 && isSet(grid[tile.row][tile.col - 1].id)) ? true : false;
      const right = (tile.col < GRID_SIZE - 1 && isSet(grid[tile.row][tile.col + 1].id)) ? true : false;

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
