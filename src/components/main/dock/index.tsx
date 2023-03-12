import React, { FC, useEffect, useState } from 'react';

import { Tile, isSet } from 'models';
import { TileElement, Button } from 'elements';

import * as Style from './style.module.scss';

type DockProps = {
  dockTile: Tile;
  shuffle: () => void;
  score: number;
}

const Dock: FC<DockProps> = ({ dockTile, shuffle, score }) => {

  const [deg, setDeg] = useState<number>(0);

  useEffect(() => {
    if (dockTile.isSet()) {
      const deg = Math.random() * 12 - 6;
      setDeg(deg);
    } else {
      setDeg(0);
    }
  }, [dockTile]);

  return (
    <div className={Style.dock}>
      <div className={Style.dockTileHolder}>
        <div
          className={Style.dockTile}
          style={{
            transform: `translateX(-50%) rotate(${deg}deg)`
          }}
        >
          <TileElement
            tile={dockTile}
            selectable={dockTile.isSet()}
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
    </div>
  )
}


export { Dock }
