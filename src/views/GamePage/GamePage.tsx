import React from "react";
import { Redirect } from "react-router";
import { Button, ButtonGroup } from "../../components/Button";
import { MessageBox, MessageBoxConfig } from "../../components/MessageBox";
import { Page } from "../../components/Page";
import { Board, Hint } from "../../components/RelatiGame";
import Effect from "../../components/RelatiGameEffect/Effect";
import { RelatiGame, RelatiGrid, RelatiSymbolColor } from "../../game";
import "./game-page.scss";

interface GamePageState { pathName: string; messageBoxConfig: MessageBoxConfig; }

export default class GamePage extends React.Component<any, GamePageState> {
  public game = new RelatiGame();

  constructor(props: any) {
    super(props);

    this.state = {
      messageBoxConfig: { show: false },
      pathName: ""
    };
  }

  public selectCoor = ({ x, y }: { x: number, y: number }) => (
    this.selectGrid(this.game.board.getGrid(x, y))
  )

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

  public selectGrid(grid: RelatiGrid | null) {
    let { game } = this;
    game.onGridSelect(grid);

    if (game.winner !== null) {
      let messageBoxConfig: MessageBoxConfig = {
        icon: "draw",
        onUserResponse: gameRestart => {
          if (gameRestart) game.restart();
          this.setState({ messageBoxConfig: { show: false } });
        },
        show: true,
        text: "平手",
        type: "yorn"
      };

      if (game.winner !== "") {
        messageBoxConfig.icon = `${game.winner.toLowerCase()}win`;
        messageBoxConfig.text = `${game.winner}獲勝`;
      }

      this.setState({ messageBoxConfig });
    } else this.forceUpdate();
  }

  public render() {
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
          <div className="player-o" />
          <div className="versus" />
          <div className="player-x" />
        </div>
        <Board id="game-board" width={width} height={height} onCoorSelect={this.selectCoor}>
          <g className="hints">{hints}</g>
          <Effect turn={turn} symbol={symbol} board={board} routeType={routeType} />
        </Board>
        <ButtonGroup>
          <Button icon="exit" onClick={e => this.confirmSwitchPathTo("/main")} />
        </ButtonGroup>
        <MessageBox {...this.state.messageBoxConfig} />
      </Page>
    );
  }
}
