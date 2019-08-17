import './effect.scss';
import React from 'react';
import { RelatiBoard, RelatiRole, RelatiRouter, RelatiRouteType, RelatiGrid, RelatiSymbol } from '../../game';
import { GridBoard } from '../../game/GridBoard';
import Grid from '../RelatiGame/Grid';
import Route from './Route';

type EffectProps = {
  turn: number,
  symbol: RelatiSymbol,
  routeType: RelatiRouteType,
  board: RelatiBoard
};

type EffectState = {
  turn: number,
  running: boolean,
  routes: RelatiGrid[][]
};

export default class Effect extends React.Component<EffectProps, EffectState> {
  public board: RelatiBoard;
  public router: RelatiRouter;

  constructor(props: EffectProps) {
    super(props);

    this.state = {
      turn: props.turn,
      running: false,
      routes: []
    };

    this.board = new GridBoard<RelatiRole>(props.board.width, props.board.height);
    this.router = new RelatiRouter(props.routeType)
  }

  static getDerivedStateFromProps(props: EffectProps, state: EffectState) {
    if (props.turn !== state.turn) {
      return {
        turn: props.turn,
        running: false,
        routes: []
      };
    } else return null;
  }

  recovery(turn: number) {
    for (let { body: role } of this.board.grids) {
      if (role && role.is('launcher')) {
        this.relati(role, turn);
      }
    }
  }

  relati(sourceRole: RelatiRole, turn: number, route: RelatiGrid[] = []) {
    if (sourceRole.is('repeater')) return;
    sourceRole.gain('repeater');

    var repeatRelati = () => {
      let routes: RelatiGrid[][] = this.router.getRoutes(
        sourceRole.grid, sourceRole.symbol, ['receiver']
      );

      for (let route of routes) {
        let [{ body: targetRole }] = route;

        if (targetRole) {
          route = [sourceRole.grid, ...route.reverse()];
          this.relati(targetRole, turn, route);
        }
      }
    };

    if (this.state.turn === turn) {
      this.setState({
        running: true,
        routes: [...this.state.routes, route]
      });

      setTimeout(repeatRelati, 250);
    } else repeatRelati();
  }

  interrupt() {
    for (let { body: role } of this.board.grids) {
      if (role && role.symbol !== this.props.symbol) {
        role.lost('repeater');
      }
    }
  }

  cloneBoard() {
    for (let { i, body: role } of this.props.board.grids) {
      let grid = this.board.grids[i];

      if (role) {
        if (!grid.body) {
          grid.body = new RelatiRole(grid, role.symbol);
          grid.body.status = { ...role.status };
        }
      } else delete grid.body;
    }
  }

  componentDidUpdate() {
    if (!this.state.running) {
      this.cloneBoard();
      this.interrupt();
      this.recovery(this.props.turn);
    }
  }

  render() {
    let grids = this.board.grids.map((grid, key) => {
      let role = this.props.board.grids[key].body;

      if (role && !role.is('repeater')) {
        if (grid.body) {
          grid.body.lost('repeater');
        }
      }

      return <Grid key={key} grid={grid} />
    });

    let routes = this.state.routes.map((route, key) => (
      <Route key={key} grids={route} />
    ));

    return (
      <>
        <g className='effect-lines'>{routes}</g>
        <g className='effect-grids'>{grids}</g>
      </>
    );
  }
}
