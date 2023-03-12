import { Grid, EmptyTile, Tile, isSet, isUnset, makeGridFromTiles, GRID_SIZE } from '../';

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
  let untrackedTileIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const clusters = [];
  while (untrackedTileIndices.length > 0) {
    const tile = tiles.find(t => t.getId() === untrackedTileIndices[0]);
    if (!tile) {
      untrackedTileIndices.shift();
      break;
    }
    if (!tile.isPlaced()) {
      // if it hasn't been played then it can be considered an individual cluster
      clusters.push([tile.getId()]);
      untrackedTileIndices.shift();
    } else {
      // otherwise it is on the board, so try and make a cluster from it
      let cluster = makeCluster(grid, tile, []);
      cluster = Array.from(new Set(cluster));
      clusters.push(cluster);
      untrackedTileIndices = untrackedTileIndices.filter(id => !cluster.includes(id));
    }
  }
  return clusters;
}

const makeCluster = function (grid: Grid, tile: Tile, cluster: ClusterType): ClusterType {
  // if there is no id, then this is not a tile
  if (tile.isEmpty() || tile.getCharacter() === ' ') {
    return [];
  }

  // add this id to the cluster
  cluster.push(tile.getId());

  // get the surrounding tiles
  const { up, down, left, right } = tile.getSurroundingTiles(grid);

  // add the sub clusters to this cluster if they are not already
  if (!cluster.includes(up.getId())) {
    cluster.concat(makeCluster(grid, up, cluster));
  }
  if (!cluster.includes(down.getId())) {
    cluster.concat(makeCluster(grid, down, cluster));
  }
  if (!cluster.includes(left.getId())) {
    cluster.concat(makeCluster(grid, left, cluster));
  }
  if (!cluster.includes(right.getId())) {
    cluster.concat(makeCluster(grid, right, cluster));
  }

  return cluster;
}

export const getClusterScore = (tiles: Tile[]): { score: number, largestCluster: ClusterType } => {
  const grid = makeGridFromTiles(tiles);
  const largestCluster = getLargestCluster(grid, tiles);
  let scoreLargestCluster = 0;
  let scoreOthers = 0;

  tiles.forEach(tile => {
    if (largestCluster.includes(tile.getId())) {
      // if this is in the largest cluster then determine how much it is worth
      if (!tile.isPlaced()) {
        // if this tile is not on the board then don't look for its neighbors
        return;
      }

      // get the tiles around it that exist
      const { up, down, left, right } = tile.getSurroundingTiles(grid).exists;

      // if it is in a up down word, add it's score
      if (up || down) {
        scoreLargestCluster += tile.getValue();
      }

      // if it is in a right left word, add it's score too
      if (right || left) {
        scoreLargestCluster += tile.getValue();
      }
    } else {
      // if it isn't in the largest cluster then add it's score to the others
      scoreOthers += tile.getValue();
    }
  });
  return {
    score: Math.max(scoreLargestCluster - scoreOthers, 0),
    largestCluster
  };
}
