import React, { FC } from 'react';
import classNames from 'classnames';

import * as Style from './style.module.scss';

type ModalProps = {
  children: JSX.Element | JSX.Element[];
  isOpen: boolean;
  title: string;
}

export const Modal: FC<ModalProps> = ({
  children,
  isOpen,
  title,
}) => {

  const className = classNames(Style.modal, {
    [Style.open]: isOpen
  });

  return (
    <div className={className}>
      <div className={Style.title}>{title}</div>
      {children}
    </div>
  );
}
