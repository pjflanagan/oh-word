
import React, { FC } from 'react';

import { Tile, Game } from 'models';
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
    if (dockTile.isEmpty() && selectedTile.isEmpty()) {
      return;
    }
    const { row, col } = selectedTile.getLocation();
    // filter the selected tile out
    let newTiles: Tile[] = [...tiles];
    if (selectedTile.isSet()) {
      // if there is a selected tile
      newTiles = newTiles.filter(t => t.getId() !== selectedTile.getId());
      // replace the tile with an unplaced one
      newTiles = [...newTiles, selectedTile.unplaceTile()];
    }
    if (dockTile.isSet()) {
      // filter the dock tile from tiles
      newTiles = newTiles.filter(t => t.getId() !== dockTile.getId());
      // make a newly placed tile and put it in the array
      const newlyPlacedTile = dockTile.placeTile({ row, col });
      newTiles = [...newTiles, newlyPlacedTile];
    }
    setTiles(newTiles);
    setDockTileId(selectedTile.getId());
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
                        selectable={(tile.isEmpty() && dockTile.isSet()) || tile.isSet()}
                        inCluster={score.clusterTileIds.includes(tile.getId())}
                        isDoubled={tile.isDoubled(grid)}
                        horizontalWordScore={score.wordLengthScores.find(wls => wls.direction === 'horizontal' && wls.lastLetterTile === tile.getId())?.score}
                        verticalWordScore={score.wordLengthScores.find(wls => wls.direction === 'vertical' && wls.lastLetterTile === tile.getId())?.score}
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



