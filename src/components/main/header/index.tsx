import React, { FC } from 'react';

import { CopyTypeEnum } from 'models';
import { Button } from 'elements';

import * as Style from './style.module.scss';

type HeaderProps = {
  copyURL: (copyType: CopyTypeEnum) => void;
}

const Header: FC<HeaderProps> = ({
  copyURL
}) => {
  return (
    <div className={Style.header}>
      <div className={Style.title}>
        {'Crossword Cubes'}
      </div>
      <div className={Style.buttonHolder}>
        <Button
          onClick={() => copyURL('ROLL')}
          icon={'Share'}
          label="Roll"
        />
        <Button
          onClick={() => copyURL('SCORE')}
          icon={'Share'}
          label="Score"
        />
      </div>
    </div>
  )
}


export { Header }
