
import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import { GridType, TileType, Tile } from 'models';
// import { Tile } from 'elements';

import * as Style from './style.module.scss';

type TileProps = { // TODO: move to element
  tile: TileType,
  dockTile: TileType;
  selectTile: (tile: TileType) => void;
}

const TileComponent: FC<TileProps> = ({
  tile,
  dockTile,
  selectTile
}) => {

  // TODO: grid tile on hover display dockTile info

  const [deg, setDeg] = useState<number>(0);

  useEffect(() => {
    if (tile.id !== -1) {
      const deg = Math.random() * 6 - 3;
      setDeg(deg);
    }
  }, [tile]);


  const getTileStyle = () => {
    return { transform: `rotate(${deg}deg)` };
  }

  const getTileClassName = (tile: TileType) => {
    return classNames(Style.gridTile, {
      [Style.empty]: tile.id === -1,
      [Style.selectable]: (tile.id === -1 && dockTile.id !== -1) || tile.id !== -1,
      [Style.real]: tile.id !== -1,
    });
  }

  return (
    <div
      className={getTileClassName(tile)}
      onClick={() => selectTile(tile)}
      style={getTileStyle()}
    >
      <div className={Style.character}>{Tile.getDisplayCharacter(tile)}</div>
      <div className={Style.value}>{Tile.getDisplayValue(tile)}</div>
    </div>
  )
}

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
                        dockTile={dockTile}
                        selectTile={selectTile}
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



