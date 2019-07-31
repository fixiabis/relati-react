import React from 'react';
import './help-page.scss';
import { Page } from '../Page';
import { Button, ButtonGroup } from '../Button';
import { Redirect } from 'react-router';
import { MessageBox, MessageBoxConfig } from '../MessageBox';
import { BoardContainer } from '../BoardView';

type HelpPageState = { currentPath: string, messageBoxConfig: MessageBoxConfig };

class HelpPage extends React.Component<any, HelpPageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentPath: "",
      messageBoxConfig: { show: false }
    };
  }

  render() {
    if (this.state.currentPath) return <Redirect to={this.state.currentPath} />;

    return (
      <Page id="help-page">
        <div className="direction"></div>
        <BoardContainer id="help-board"></BoardContainer>
        <ButtonGroup>
          <Button icon="exit" onClick={e => this.setState({
            messageBoxConfig: {
              icon: "yorn",
              text: "確定離開?",
              show: true,
              type: "yorn",
              onUserResponse: result => {
                if (result) this.setState({ currentPath: "/menu" })
              }
            }
          })} />
        </ButtonGroup>
        <MessageBox {...this.state.messageBoxConfig} />
      </Page>
    );
  }
}

export default HelpPage;