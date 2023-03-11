import React, { FC } from 'react';
import classNames from 'classnames';
import { GrClose } from 'react-icons/gr';

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
      <div className={Style.header}>
        <div className={Style.title}>{title}</div>
        <div className={Style.close}><GrClose /></div>
      </div>
      <div className={Style.body}>{children}</div>
    </div>
  );
}
