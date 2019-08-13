import './button.scss';
import React from 'react';
import classNames from 'classnames';

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { icon: string };

function Button({...props}: ButtonProps) {
  props.className = classNames(props.className, props.icon);
  delete props.icon;
  return <button {...props}></button>;
}

export default Button;