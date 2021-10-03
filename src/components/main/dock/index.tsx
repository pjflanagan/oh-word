import React, { FC, useState, useEffect } from 'react';
import classNames from 'classnames';

import { TileType, CopyTypeEnum } from 'models';
import { Tile, Button } from 'elements';

import * as Style from './style.module.scss';

type DockProps = {
  dockTile: TileType;
  newRoll: () => void;
  score: number;
}

const Dock: FC<DockProps> = ({ dockTile, newRoll, score }) => {

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

        <Button
          disabled
          icon={`${score}`}
          label="Score"
        />
      </div>
    </div >
  )
}


export { Dock }
