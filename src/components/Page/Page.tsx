import './page.scss';
import React from 'react';
import classNames from 'classnames';

type PageProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

function Page({ ...props }: PageProps) {
  props.className = classNames(props.className, 'page');
  return <div {...props}></div>;
}

export default Page;