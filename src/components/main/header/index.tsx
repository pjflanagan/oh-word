import React, { FC } from 'react';

import { Button } from 'elements';

import * as Style from './style.module.scss';

type HeaderProps = {
  score: number;
}

const Header: FC<HeaderProps> = ({
  score
}) => {
  return (
    <div className={Style.header}>
      <div className={Style.title}>
        {'Cross Word Cubes'}
      </div>
      <div className={Style.buttonHolder}>
        <Button
          onClick={() => { }}
          icon={'Score'}
          label="Share"
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


export { Header }
