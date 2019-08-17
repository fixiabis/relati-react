import './game-page.scss';
import React from 'react';
import { Redirect } from 'react-router';
import { Page } from '../../components/Page';
import { Board, Hint } from '../../components/RelatiGame';
import { Button, ButtonGroup } from '../../components/Button';
import { MessageBox, MessageBoxConfig } from '../../components/MessageBox';
import { RelatiGame, RelatiGrid, RelatiSymbolColor } from '../../game';
import Effect from '../../components/RelatiGameEffect/Effect';

type GamePageState = { pathName: string, messageBoxConfig: MessageBoxConfig };

class GamePage extends React.Component<any, GamePageState> {
  public game = new RelatiGame();

  public selectCoor = ({ x, y }: { x: number, y: number }) => (
    this.selectGrid(this.game.board.getGrid(x, y))
  );

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

  selectGrid(grid: RelatiGrid | null) {
    let { game } = this;
    game.onGridSelect(grid);

    if (game.winner !== null) {
      var messageBoxConfig: MessageBoxConfig = {
        icon: 'draw',
        text: '平手',
        show: true,
        type: 'yorn',
        onUserResponse: gameRestart => {
          if (gameRestart) game.restart();
          this.setState({ messageBoxConfig: { show: false } });
        }
      };

      if (game.winner !== '') {
        messageBoxConfig.icon = `${game.winner.toLowerCase()}win`;
        messageBoxConfig.text = `${game.winner}獲勝`;
      }

      this.setState({ messageBoxConfig });
    } else this.forceUpdate();
  }

  render() {
    if (this.state.pathName) return <Redirect to={this.state.pathName} />;

    let {
      turn,
      board,
      routeType,
      board: { width, height },
      nowPlayer: { symbol }
    } = this.game;

    let hints = this.game.getPlaceableGrids(symbol).map(
      ({ x, y }, key) => (
        <Hint key={key} x={x} y={y} color={RelatiSymbolColor[symbol]} />
      )
    );

    return (
      <Page id="game-page">
        <div className="versus-header">
          <div className="player-o"></div>
          <div className="versus"></div>
          <div className="player-x"></div>
        </div>
        <Board id="game-board" width={width} height={height} onCoorSelect={this.selectCoor}>
          <g className="hints">{hints}</g>
          <Effect turn={turn} symbol={symbol} board={board} routeType={routeType} />
        </Board>
        <ButtonGroup>
          <Button icon="exit" onClick={e => this.confirmSwitchPathTo('/main')} />
        </ButtonGroup>
        <MessageBox {...this.state.messageBoxConfig} />
      </Page>
    );
  }
}

export default GamePage;