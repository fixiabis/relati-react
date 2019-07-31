import React from 'react';
import './page.scss';

type PageProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

class Page extends React.Component<PageProps> {
  render() {
    let props = { ...this.props };

    if (!props.className) props.className = 'page';
    else props.className += ' page';

    return <div {...props}></div>;
  }
}

export default Page;