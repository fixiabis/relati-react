import React from 'react';
import './button.scss';

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

class Button extends React.Component<ButtonProps & { icon: string }> {
  render() {
    let props = { ...this.props };

    if (!props.className) props.className = props.icon;
    else props.className += ` ${props.icon}`;
    delete props.icon;

    return <button {...props}></button>;
  }
}

export default Button;