import React from 'react';
import './game-page.scss';
import { Page } from '../Page';
import { Button, ButtonGroup } from '../Button';
import { Redirect } from 'react-router';
import { MessageBox, MessageBoxConfig } from '../MessageBox';
import RelatiGame from '../../game/RelatiGame';
import { BoardView, BoardContainer } from '../BoardView';

type GamePageState = { currentPath: string, messageBoxConfig: MessageBoxConfig };

class GamePage extends React.Component<any, GamePageState> {
  public game = new RelatiGame();

  constructor(props: any) {
    super(props);

    this.state = {
      currentPath: "",
      messageBoxConfig: {
        icon: "dots rotate",
        text: "正在尋找對手",
        show: true
      }
    };

    setTimeout(() => this.setState({
      messageBoxConfig: {
        show: false
      }
    }), 2000);
  }

  render() {
    if (this.state.currentPath) return <Redirect to={this.state.currentPath} />;

    return (
      <Page id="game-page">
        <div className="versus-header">
          <div className="player-o"></div>
          <div className="versus"></div>
          <div className="player-x"></div>
        </div>
        <BoardContainer id="game-board">
          <BoardView board={this.game.board} containerId="game-board" onGridSelect={
            grid => {
              this.game.onGridSelect(grid);

              if (this.game.winner) {
                var messageBoxConfig: MessageBoxConfig;

                if (this.game.winner.symbol === "") {
                  messageBoxConfig = {
                    icon: "draw",
                    text: "平手",
                    show: true,
                    type: "yorn",
                    onUserResponse: gameRestart => {
                      if (gameRestart) this.game.restart();
                      this.setState({ messageBoxConfig: { show: false } });
                    }
                  };
                } else {
                  messageBoxConfig = {
                    icon: `${this.game.winner.symbol.toLowerCase()}win`,
                    text: `${this.game.winner.symbol}獲勝`,
                    show: true,
                    type: "yorn",
                    onUserResponse: gameRestart => {
                      if (gameRestart) this.game.restart();
                      this.setState({ messageBoxConfig: { show: false } });
                    }
                  };
                }

                this.setState({ messageBoxConfig });
              }
            }
          } />
        </BoardContainer>
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

export default GamePage;