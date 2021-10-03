import React, { FC, useState, useEffect } from 'react';
import classNames from 'classnames';

import { TileType, CopyTypeEnum } from 'models';
import { Tile, Button } from 'elements';

import * as Style from './style.module.scss';

type DockProps = {
  dockTile: TileType,
  newRoll: () => void,
  copyURL: (copyType: CopyTypeEnum) => void
}


const Dock: FC<DockProps> = ({ dockTile, newRoll, copyURL }) => {

  const tileClassName = dockTile.id === -1 ? Style.empty : '';
  const scoreShareClassName = classNames(Style.button, {
    [Style.disabled]: dockTile.id !== -1,
  });

  return (
    <div className={Style.dock}>
      <div className={Style.dockTile}>
        <Tile
          tile={dockTile}
          selectable={dockTile.id !== -1}
        />
      </div>
      <div className={Style.dockButtons}>
        <Button
          onClick={newRoll}
          icon="New"
          label="Roll"
        />
      </div>
      {/* <div className={Style.dockItem}>
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
      </div> */}
    </div >
  )
}


export { Dock }
