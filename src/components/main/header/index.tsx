import React, { FC } from 'react';

import * as Style from './style.module.scss';

const Header: FC = () => {
  return (
    <div className={Style.header}>
      <div className={Style.title}>Cross Word Cubes</div>
    </div>
  )
}


export { Header }
