import React, { FC } from 'react';

import { URLMode } from 'models';
import { Button } from 'elements';

import * as Style from './style.module.scss';
import classNames from 'classnames';

type HeaderProps = {
  copyURL: (copyType: URLMode) => void;
}

const Header: FC<HeaderProps> = ({
  copyURL
}) => {
  return (
    <div className={Style.header}>
      <div className={classNames(Style.title, Style.headerItem)}>
        {'Oh Word!?'}
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
