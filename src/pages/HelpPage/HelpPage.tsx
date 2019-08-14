import './help-page.scss';
import React from 'react';
import { Redirect } from 'react-router';
import { Page } from '../../components/Page';
import { Board } from '../../components/RelatiGame';
import { Button, ButtonGroup } from '../../components/Button';
import { MessageBox, MessageBoxConfig } from '../../components/MessageBox';
import { RelatiGame, RelatiRole } from '../../game';
import { GridBoard } from '../../game/GridBoard';

type HelpPageState = { pathName: string, messageBoxConfig: MessageBoxConfig };

class HelpPage extends React.Component<any, HelpPageState> {
  public game = new RelatiGame();

  constructor(props: any) {
    super(props);

    this.state = {
      pathName: '',
      messageBoxConfig: { show: false }
    };
  }

  hideMessageBox() {
    this.setState({ messageBoxConfig: { show: false } });
  }

  confirmSwitchPathTo(pathName: string) {
    this.setState({
      messageBoxConfig: {
        icon: 'yorn',
        text: '確認離開',
        show: true,
        type: 'yorn',
        onUserResponse: confirm => {
          if (confirm) this.switchPathTo(pathName);
          else this.hideMessageBox();
        }
      }
    });
  }

  switchPathTo(pathName: string) {
    this.setState({ pathName });
  }

  render() {
    if (this.state.pathName) return <Redirect to={this.state.pathName} />;

    return (
      <Page id="help-page">
        <div className="description">
          <h2>暫無說明</h2>
        </div>
        <ButtonGroup>
          <Button icon="exit" onClick={() => this.confirmSwitchPathTo('/main')} />
        </ButtonGroup>
        <MessageBox {...this.state.messageBoxConfig} />
      </Page>
    );
  }
}

export default HelpPage;