import React from 'react';
import classNames from 'classnames';

import * as Style from './style.module.scss';

type HamburgerContainerProps = {
  children: JSX.Element | JSX.Element[];
}

export const Bun = ({
  children
}: HamburgerContainerProps) => {
  const className = classNames(Style.containerRow, Style.bun);
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export const Burger = ({
  children
}: HamburgerContainerProps) => {
  const className = classNames(Style.containerRow, Style.burger);
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export const Container = ({
  children
}: HamburgerContainerProps) => {
  return (
    <div className={Style.container}>
      {children}
    </div>
  );
}