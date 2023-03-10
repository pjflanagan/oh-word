
import React, { FC } from 'react';

import { Grid, Tile, isSet, isUnset } from 'models';
import { TileElement } from 'elements';

import * as Style from './style.module.scss';

type GridComponentProps = {
  grid: Grid;
  dockTile: Tile;
  selectTile: (tile: Tile) => void;
  clusterTileIds: number[];
}

const GridComponent: FC<GridComponentProps> = ({
  grid,
  dockTile,
  selectTile,
  clusterTileIds
}) => {

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
                        onClick={() => selectTile(tile)}   // TODO: empty grid tile on hover display dockTile info
                        selectable={(isUnset(tile.id) && isSet(dockTile.id)) || isSet(tile.id)}
                        inCluster={clusterTileIds.includes(tile.id)}
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



