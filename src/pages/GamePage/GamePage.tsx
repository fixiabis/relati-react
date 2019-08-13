import './game-page.scss';
import React from 'react';
import { Redirect } from 'react-router';
import { Page } from '../../components/Page';
import { Board, Hints } from '../../components/RelatiGame';
import { Button, ButtonGroup } from '../../components/Button';
import { MessageBox, MessageBoxConfig } from '../../components/MessageBox';
import { RelatiGame, RelatiGrid, RelatiSymbolColor } from '../../game';

type GamePageState = { pathName: string, messageBoxConfig: MessageBoxConfig };

class GamePage extends React.Component<any, GamePageState> {
  public game = new RelatiGame();

  constructor(props: any) {
    super(props);

    this.state = {
      pathName: '',
      messageBoxConfig: { show: false }
    };

    console.log(this.game);
  }

  confirmSwitchPathTo(pathName: string) {
    this.setState({
      messageBoxConfig: {
        icon: 'yorn',
        text: '確認離開',
        show: true,
        type: 'yorn',
        onUserResponse: confirm => confirm && this.switchPathTo(pathName)
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

    let { game: { board, routeType, nowPlayer: { symbol } } } = this;
    let placeableGrids = RelatiGame.getPlaceable(board, symbol, routeType);

    return (
      <Page id="game-page">
        <div className="versus-header">
          <div className="player-o"></div>
          <div className="versus"></div>
          <div className="player-x"></div>
        </div>
        <Board id="game-board" board={board} onGridSelect={grid => this.selectGrid(grid)}>
          <Hints grids={placeableGrids} color={RelatiSymbolColor[symbol]} />
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