import './message-box.scss';
import React from 'react';
import { ButtonGroup, Button } from '../Button';
import { MessageBoxConfig } from '../MessageBox';

type MessageBoxProps = MessageBoxConfig;
type MessageBoxState = MessageBoxConfig & { initiative?: boolean };

export default class MessageBox extends React.Component<MessageBoxProps, MessageBoxState> {
  constructor(props: MessageBoxProps) {
    super(props);
    this.state = { ...props };
  }

  static getDerivedStateFromProps(props: MessageBoxProps, state: MessageBoxState) {
    if (state.initiative) {
      delete state.initiative;
      return state;
    } else return { ...props };
  }

  render() {
    if (this.state.show === false) return <></>;

    var controls;

    switch (this.state.type) {
      case 'yorn': controls = (
        <ButtonGroup>
          <Button icon="accept" onClick={e => this.userResponse(true)}></Button>
          <Button icon="reject" onClick={e => this.userResponse(false)}></Button>
        </ButtonGroup>
      ); break;

      case 'hint': controls = (
        <ButtonGroup>
          <Button icon="verify" onClick={e => this.userResponse(true)}></Button>
        </ButtonGroup>
      ); break;
    }

    return (
      <div className="message-box-container">
        <div className="message-box">
          <div className={`message-icon ${this.state.icon}`}></div>
          <div className="message-text">{this.state.text}</div>
          {controls}
        </div>
      </div>
    );
  }

  userResponse(result: boolean) {
    this.setState({ show: false, initiative: true });
    this.props.onUserResponse && this.props.onUserResponse(result);
  }
}
