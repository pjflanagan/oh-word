import React, { FC } from 'react';
import classNames from 'classnames';

import { URLMode } from 'models';
import { Button } from 'elements';

import OhWordLogo from './ohwordlogo.png'
import * as Style from './style.module.scss';

type HeaderProps = {
  copyURL: (copyType: URLMode) => void;
}

const Header: FC<HeaderProps> = ({
  copyURL
}) => {
  return (
    <div className={Style.header}>
      <div className={classNames(Style.logo, Style.headerItem)}>
        <img src={OhWordLogo} />
      </div>
      <div className={classNames(Style.buttonHolder, Style.headerItem)}>
        <Button
          onClick={() => copyURL(URLMode.ROLL)}
          icon={'share'}
          label="Tiles"
        />
        <Button
          onClick={() => copyURL(URLMode.SCORE)}
          icon={'share'}
          label="Words"
        />
      </div>
    </div>
  )
}


export { Header }
