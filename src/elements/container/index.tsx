import React, { FC } from 'react';
import classNames from 'classnames';

import * as Style from './style.module.scss';

export const Bun: FC = ({
  children
}) => {
  const className = classNames(Style.containerRow, Style.bun);
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export const Burger: FC = ({
  children
}) => {
  const className = classNames(Style.containerRow, Style.burger);
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export const Container: FC = ({
  children
}) => {
  return (
    <div className={Style.container}>
      {children}
    </div>
  );
}