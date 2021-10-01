import React, { FC, useState, useEffect } from 'react';
import classNames from 'classnames';

import { TileType, Tile, CopyTypeEnum } from 'models';

import * as Style from './style.module.scss';

type DockProps = {
  dockTile: TileType,
  score: number
  newRoll: () => void,
  copyURL: (copyType: CopyTypeEnum) => void
}


const Dock: FC<DockProps> = ({ dockTile, score, newRoll, copyURL }) => {

  const tileClassName = dockTile.id === -1 ? Style.empty : '';
  const scoreShareClassName = classNames(Style.button, {
    [Style.disabled]: dockTile.id !== -1,
  });

  return (
    <div className={Style.dock}>
      <div className={Style.dockItem}>
        <div className={`${Style.dockTile} ${tileClassName}`}>
          <div className={Style.character}>{Tile.getDisplayCharacter(dockTile)}</div>
          <div className={Style.value}>{Tile.getDisplayValue(dockTile)}</div>
        </div>
      </div>
      <div className={Style.dockItem}>
        <div className={Style.button}>
          <div className={Style.top}>{score}</div>
          <div className={Style.bottom}>Score</div>
        </div>
      </div>
      <div className={Style.dockItem}>
        <div className={Style.button} onClick={newRoll}>
          <div className={Style.top}>Re-</div>
          <div className={Style.bottom}>Roll</div>
        </div>
      </div>
      <div className={Style.dockItem}>
        <div className={Style.button} onClick={() => copyURL('ROLL')}>
          <div className={Style.top}>Roll</div>
          <div className={Style.bottom}>Share</div>
        </div>
      </div>
      <div className={Style.dockItem}>
        <div className={scoreShareClassName} onClick={() => copyURL('SCORE')}>
          <div className={Style.top}>Score</div>
          <div className={Style.bottom}>Share</div>
        </div>
      </div>
    </div >
  )
}


export { Dock }
