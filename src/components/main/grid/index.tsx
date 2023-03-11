
import React, { FC } from 'react';

import { Grid, Tile, isSet, isUnset, Game } from 'models';
import { TileElement } from 'elements';

import * as Style from './style.module.scss';
import { Score } from 'models/score';

type GridComponentProps = {
  tiles: Tile[];
  setTiles: (tiles: Tile[]) => void;
  dockTile: Tile;
  setDockTileId: (dockTileId: number) => void;
  score: Score;
}

const GridComponent: FC<GridComponentProps> = ({
  tiles,
  setTiles,
  dockTile,
  setDockTileId,
  score
}) => {

  const grid = Game.makeGridFromTiles(tiles);


  const replace = (selectedTile: Tile) => {
    if (isUnset(dockTile.id) && isUnset(selectedTile.id)) {
      return;
    }
    const { row, col } = selectedTile;
    // filter the selected tile out
    let newTiles: Tile[] = [...tiles];
    if (isSet(selectedTile.id)) {
      // if there is a selected tile
      newTiles = newTiles.filter(t => t.id !== selectedTile.id);
      // replace the tile with an unplaced one
      newTiles = [...newTiles, selectedTile.unplaceTile()];
    }
    if (isSet(dockTile.id)) {
      // filter the dock tile from tiles
      newTiles = newTiles.filter(t => t.id !== dockTile.id);
      // make a newly placed tile and put it in the array
      const newlyPlacedTile = dockTile.placeTile({ row, col });
      newTiles = [...newTiles, newlyPlacedTile];
    }
    setTiles(newTiles);
    setDockTileId(selectedTile.id);
  }

  return (
    <div className={Style.gridContainer}>
      <div className={Style.gridHolder}>
        <div className={Style.grid}>
          {
            grid.map((row: Tile[], i: number) => (
              <div className={Style.row} key={i}>
                {
                  row.map((tile: Tile, i) => (
                    <div className={Style.col} key={i}>
                      <TileElement
                        tile={tile}
                        onClick={() => replace(tile)}   // TODO: empty grid tile on hover display dockTile info
                        selectable={(isUnset(tile.id) && isSet(dockTile.id)) || isSet(tile.id)}
                        inCluster={score.clusterTileIds.includes(tile.id)}
                        horizontalWordScore={score.wordLengthScores.find(wls => wls.direction === 'horizontal' && wls.lastLetterTile === tile.id)?.score}
                        verticalWordScore={score.wordLengthScores.find(wls => wls.direction === 'vertical' && wls.lastLetterTile === tile.id)?.score}
                      />
                    </div>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    </div >
  )
}


export { GridComponent }



