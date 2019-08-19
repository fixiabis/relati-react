import classNames from "classnames";
import React from "react";
import "./page.scss";

type PageProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export default function Page({ ...props }: PageProps) {
  props.className = classNames(props.className, "page");
  return <div {...props} />;
}
