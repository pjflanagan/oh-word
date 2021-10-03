import React, { FC, useState, useEffect } from 'react';
import classNames from 'classnames';

import { Tile as TileHelper, TileType } from 'models';

import * as Style from './style.module.scss';

type TileProps = {
  onClick?: () => void;
  tile: TileType;
  onMouseOver?: () => void;
  selectable: boolean;
}

export const Tile: FC<TileProps> = ({
  tile,
  onClick,
  onMouseOver,
  selectable
}) => {
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

  const getTileClassName = () => {
    return classNames(Style.tile, {
      [Style.empty]: tile.id === -1,
      [Style.selectable]: selectable,
      [Style.real]: tile.id !== -1,
    });
  }

  return (
    <div
      className={getTileClassName()}
      style={getTileStyle()}
      onClick={onClick}
      onMouseOver={onMouseOver}
    >
      <div className={Style.character}>{TileHelper.getDisplayCharacter(tile)}</div>
      <div className={Style.value}>{TileHelper.getDisplayValue(tile)}</div>
    </div>
  );
}
