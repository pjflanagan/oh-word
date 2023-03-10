import React, { FC } from 'react';

import { URLMode } from 'models';
import { Button } from 'elements';

import * as Style from './style.module.scss';

type HeaderProps = {
  copyURL: (copyType: URLMode) => void;
}

const Header: FC<HeaderProps> = ({
  copyURL
}) => {
  return (
    <div className={Style.header}>
      <div className={Style.title}>
        {'Oh Word!?'}
      </div>
      <div className={Style.buttonHolder}>
        <Button
          onClick={() => copyURL(URLMode.ROLL)}
          icon={'Share'}
          label="Roll"
        />
        <Button
          onClick={() => copyURL(URLMode.SCORE)}
          icon={'Share'}
          label="Score"
        />
      </div>
    </div>
  )
}


export { Header }
