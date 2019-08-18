import classNames from "classnames";
import React from "react";
import "./button-group.scss";

type ButtonGroupProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export default function ButtonGroup({...props}: ButtonGroupProps) {
  props.className = classNames(props.className, "button-group");
  return  <div {...props}/>;
}
