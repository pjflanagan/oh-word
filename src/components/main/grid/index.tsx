
import React, { FC } from 'react';

import { GridType, TileType, isSet, isUnset } from 'models';
import { Tile as TileComponent } from 'elements';

import * as Style from './style.module.scss';

type GridProps = {
  grid: GridType;
  dockTile: TileType;
  selectTile: (tile: TileType) => void;
}

const Grid: FC<GridProps> = ({
  grid,
  dockTile,
  selectTile
}) => {

  return (
    <div className={Style.gridContainer}>
      <div className={Style.gridHolder}>
        <div className={Style.grid}>
          {
            grid.map((row: TileType[], i) => (
              <div className={Style.row} key={i}>
                {
                  row.map((tile: TileType, i) => (
                    <div className={Style.col} key={i}>
                      <TileComponent
                        tile={tile}
                        onClick={() => selectTile(tile)}   // TODO: empty grid tile on hover display dockTile info
                        selectable={(isUnset(tile.id) && isSet(dockTile.id)) || isSet(tile.id)}
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


export { Grid }



