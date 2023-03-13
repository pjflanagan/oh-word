import React, { FC, useState, useEffect } from 'react';
import classNames from 'classnames';

import { Tile } from 'models';

import * as Style from './style.module.scss';

function getDisplayValue(value: number): string {
  return `${value === 0 ? '' : value}`
}

type TileElementProps = {
  onClick?: () => void;
  tile: Tile;
  onMouseOver?: () => void;
  selectable: boolean;
  dock?: boolean;
  inCluster: boolean;
  isDoubled?: boolean;
  horizontalWordScore?: number;
  verticalWordScore?: number;
}


// TODO: make a GridTile and a DockTile?
export const TileElement: FC<TileElementProps> = ({
  tile,
  onClick,
  onMouseOver,
  selectable,
  dock,
  inCluster,
  isDoubled,
  horizontalWordScore,
  verticalWordScore
}) => {
  const [deg, setDeg] = useState<number>(0);

  useEffect(() => {
    if (tile.isSet() && !dock) {
      const deg = Math.random() * 6 - 3;
      setDeg(deg);
    }
  }, [tile]);


  const getTileStyle = () => {
    return { transform: `rotate(${deg}deg)` };
  }

  const getTileClassName = () => {
    return classNames(Style.tile, {
      [Style.empty]: !tile.isSet(),
      [Style.selectable]: selectable,
      [Style.real]: tile.isSet(),
      [Style.dock]: dock,
      [Style.cluster]: inCluster,
      [Style.doubled]: isDoubled
    });
  }

  const displayValue = getDisplayValue(tile.getValue() * (isDoubled ? 2 : 1));

  return (
    <div
      className={getTileClassName()}
      style={getTileStyle()}
      onClick={onClick}
      onMouseOver={onMouseOver}
    >
      {
        !tile.isSet() && <div className={Style.dot} />
      }
      {
        horizontalWordScore && <div className={classNames(Style.wordScore, Style.horizontal)}>{horizontalWordScore}</div>
      }
      {
        verticalWordScore && <div className={classNames(Style.wordScore, Style.vertical)}>{verticalWordScore}</div>
      }
      <div className={Style.character}>
          {tile.getDisplayCharacter()}
      </div>
      <div className={classNames(Style.value, { [Style.doubled]: isDoubled })}>
          {displayValue}
      </div>
    </div>
  );
}
