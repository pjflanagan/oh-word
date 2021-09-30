
import React, { FC } from 'react';
import classNames from 'classnames';

import { GridType, TileType, Tile } from 'models';

import * as Style from './style.module.scss';

type GridProps = {
  grid: GridType;
  dockTile: TileType,
  selectTile: (tile: TileType) => void;
}

const Grid: FC<GridProps> = ({
  grid,
  dockTile,
  selectTile
}) => {

  const getTileClassName = (tile: TileType) => {
    return classNames(Style.gridTile, {
      [Style.empty]: tile.id === -1,
      [Style.selectable]: (tile.id === -1 && dockTile.id !== -1) || tile.id !== -1,
      [Style.real]: tile.id !== -1,
    });
  }

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
                      <div
                        className={getTileClassName(tile)}
                        // TODO: ng-style="tile.style" this is for angles
                        onClick={() => selectTile(tile)}
                      >
                        <div className={Style.character}>{Tile.getDisplayCharacter(tile)}</div>
                        <div className={Style.value}>{Tile.getDisplayValue(tile)}</div>
                      </div>
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



