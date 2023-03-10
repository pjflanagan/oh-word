import React, { FC, useState, useEffect } from 'react';
import classNames from 'classnames';

import * as Style from './style.module.scss';

type PopupProps = {
  children: string;
  isOpen: boolean;
  severity?: 'NORMAL' | 'WARN' | 'ERROR';
}

export const Popup: FC<PopupProps> = ({
  children,
  isOpen,
}) => {

  const className = classNames(Style.popup, {
    [Style.open]: isOpen
  });

  return (
    <div className={className}>
      {children}
    </div>
  );
}

export const usePopup = (duration = 3000): [boolean, string, (m: string) => void] => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, duration);
    }
  }, [isOpen]);

  // TODO: this should take message: string, and maybe duration: number
  const sendPopup = (message: string) => {
    setIsOpen(true);
    setMessage(message);
  };

  return [isOpen, message, sendPopup];
}
