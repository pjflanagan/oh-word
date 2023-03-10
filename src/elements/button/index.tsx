import React, { FC } from 'react';
import classNames from 'classnames';
import { ImShuffle } from 'react-icons/im';
import { IoMdCalendar } from 'react-icons/io';
import { HiShare } from 'react-icons/hi'

import * as Style from './style.module.scss';

function getIcon(name: string): JSX.Element | string {
  switch(name) {
    case 'shuffle':
      return <ImShuffle />;
    case 'calendar':
      return <IoMdCalendar />;
    case 'share':
      return <HiShare />;
    default:
      return name;
  }
}

type ButtonProps = {
  onClick?: () => void;
  icon: string;
  label: string;
  disabled?: boolean;
  onMouseOver?: () => void;
}

export const Button: FC<ButtonProps> = ({
  icon,
  label,
  onClick,
  disabled,
  onMouseOver,
}) => {
  const className = classNames(Style.button, {
    [Style.disabled]: disabled,
    [Style.clickable]: onClick
  });
  return (
    <div
      className={className}
      onClick={onClick}
      onMouseOver={onMouseOver}
    >
      <div className={Style.icon}>{getIcon(icon)}</div>
      <div className={Style.label}>{label}</div>
    </div>
  );
}
