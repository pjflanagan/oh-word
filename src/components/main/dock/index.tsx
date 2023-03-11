import React, { FC } from 'react';

import { Tile, isSet } from 'models';
import { TileElement, Button } from 'elements';

import * as Style from './style.module.scss';

type DockProps = {
  dockTile: Tile;
  shuffle: () => void;
  score: number;
}

const Dock: FC<DockProps> = ({ dockTile, shuffle, score }) => {

  return (
    <div className={Style.dock}>
      <div className={Style.dockTileHolder}>
        <div className={Style.dockTile}>
          <TileElement
            tile={dockTile}
            selectable={isSet(dockTile.id)}
            dock
            inCluster={false}
          />
        </div>
      </div>
      <div className={Style.dockButtons}>
        <Button
          onClick={shuffle}
          icon="calendar"
          label="Daily"
        />
        <Button
          onClick={shuffle}
          icon="shuffle"
          label="Random"
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
