import React from "react";
import { Redirect } from "react-router";
import { Button, ButtonGroup } from "../../components/Button";
import { MessageBox, MessageBoxConfig } from "../../components/MessageBox";
import { Page } from "../../components/Page";
import { RelatiGame } from "../../game";
import "./help-page.scss";

interface HelpPageState { pathName: string; messageBoxConfig: MessageBoxConfig; }

export default class HelpPage extends React.Component<any, HelpPageState> {
  public game = new RelatiGame();

  constructor(props: any) {
    super(props);

    this.state = {
      messageBoxConfig: { show: false },
      pathName: ""
    };
  }

  public hideMessageBox() {
    this.setState({ messageBoxConfig: { show: false } });
  }

  public confirmSwitchPathTo(pathName: string) {
    this.setState({
      messageBoxConfig: {
        icon: "yorn",
        onUserResponse: confirm => {
          if (confirm) this.switchPathTo(pathName);
          else this.hideMessageBox();
        },
        show: true,
        text: "確認離開",
        type: "yorn"
      }
    });
  }

  public switchPathTo(pathName: string) {
    this.setState({ pathName });
  }

  public render() {
    if (this.state.pathName) return <Redirect to={this.state.pathName} />;

    return (
      <Page id="help-page">
        <div className="description">
          <h2>遊戲玩法</h2>
          <p>遊戲開始時，可選擇棋盤上任何空格下子</p>
          <p>遊戲開始後，只能在棋子連線範圍內下子</p>
          <p>跨格連線中間經過的格子必須為空格，倘若之後對方下子在空格時，該連線將會失效</p>
          <p>當原本的連線失效時，棋子將會尋找新的連線方式，若找不到時，該棋子的連線範圍將會失效</p>
          <p>當連線範圍失效的棋子找到新的連線方式時，該棋子的連線範圍將會恢復</p>
          <p>當對方無法繼續下子時，即為我方的勝利</p>
        </div>
        <ButtonGroup>
          <Button icon="exit" onClick={() => this.confirmSwitchPathTo("/main")} />
        </ButtonGroup>
        <MessageBox {...this.state.messageBoxConfig} />
      </Page>
    );
  }
}
