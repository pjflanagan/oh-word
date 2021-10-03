import React, { Children, FC } from 'react';
import classNames from 'classnames';

import * as Style from './style.module.scss';

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
      <div className={Style.icon}>{icon}</div>
      <div className={Style.label}>{label}</div>
    </div>
  );
}
