import React from 'react';
import './message-box.scss';
import { ButtonGroup, Button } from '../Button';
import { MessageBoxConfig } from './';

type MessageBoxProps = MessageBoxConfig;
type MessageBoxState = MessageBoxConfig;

class MessageBox extends React.Component<MessageBoxProps, MessageBoxState> {
  constructor(props: MessageBoxProps) {
    super(props);
    this.state = { ...props };
  }

  componentWillReceiveProps(props: MessageBoxProps) {
    this.setState({ ...props });
  }

  userResponse(result: boolean) {
    this.setState({ show: false });
    this.state.onUserResponse && this.state.onUserResponse(result);
  }

  render() {
    if (!this.state.show) return <></>;

    var buttonGroup;

    switch (this.state.type) {
      case "yorn": buttonGroup = (
        <ButtonGroup>
          <Button icon="accept" onClick={e => this.userResponse(true)}></Button>
          <Button icon="reject" onClick={e => this.userResponse(false)}></Button>
        </ButtonGroup>
      ); break;

      case "hint": buttonGroup = (
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
          {buttonGroup}
        </div>
      </div>
    );
  }
}

export default MessageBox;