import classNames from "classnames";
import React from "react";
import "./button.scss";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { icon: string };

export default function Button({ ...props }: ButtonProps) {
  props.className = classNames(props.className, props.icon);
  delete props.icon;
  return <button {...props} />;
}
