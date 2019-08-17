import './button-group.scss';
import React from 'react';
import classNames from 'classnames';

type ButtonGroupProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export default function ButtonGroup({...props}: ButtonGroupProps) {
  props.className = classNames(props.className, 'button-group');
  return <div {...props}></div>;
}