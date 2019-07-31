import React from 'react';
import './button-group.scss';

type ButtonGroupProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

class ButtonGroup extends React.Component<ButtonGroupProps> {
  render() {
    let props = { ...this.props };

    if (!props.className) props.className = 'button-group';
    else props.className += ' button-group';

    return <div {...props}></div>;
  }
}

export default ButtonGroup;