import React from 'react';
import './relati-board.scss';
import { RelatiBoard, RelatiGrid } from '../../game/RelatiDefs';
import GridView from './GridView';

type BoardProps = {
  containerId: string,
  board: RelatiBoard,
  onGridSelect?: (grid: RelatiGrid | null) => void,
  onClick?: React.MouseEventHandler
};

type BoardState = {
  scaleRatio: number
};

function RelatiBoardLine(props: { d: string }) {
  return <path stroke="#888" strokeWidth="0.4" {...props}></path>;
}

class BoardView extends React.Component<BoardProps, BoardState> {
  public viewWidth: number;
  public viewHeight: number;
  public horizonLines: JSX.Element[] = [];
  public verticalLines: JSX.Element[] = [];

  constructor(props: BoardProps) {
    super(props);
    this.state = { scaleRatio: 0 };
    this.viewWidth = props.board.width * 5;
    this.viewHeight = props.board.height * 5;
    window.addEventListener('resize', e => this.resize());

    for (let x = 1; x < props.board.width; x++) {
      this.horizonLines.push(
        <RelatiBoardLine key={x} d={`M 0 ${x * 5} H ${this.viewWidth}`} />
      );
    }

    for (let y = 1; y < props.board.height; y++) {
      this.verticalLines.push(
        <RelatiBoardLine key={y} d={`M ${y * 5} 0 V ${this.viewHeight}`} />
      );
    }
  }

  componentDidMount() {
    this.resize();
  }

  resize() {
    let container = document.getElementById(this.props.containerId);
    if (!container) return;

    let containerWidth = container.offsetWidth;
    let containerHeight = container.offsetHeight;

    let scaleRatio = Math.min(
      containerWidth / this.viewWidth,
      containerHeight / this.viewHeight
    ) * 0.95;

    this.setState({ scaleRatio });
  }

  _onClick(e: React.MouseEvent) {
    let { board, onClick, onGridSelect } = this.props;
    let { offsetX, offsetY } = e.nativeEvent;
    let x = Math.floor(offsetX / 5), y = Math.floor(offsetY / 5);
    let grid = board.getGrid(x, y);
    if (onClick) onClick(e);
    if (onGridSelect) onGridSelect(grid);
    this.forceUpdate();
  }

  render() {
    let { viewWidth, viewHeight, horizonLines, verticalLines, props: { board } } = this;

    let boardStyle = {
      transform: `scale(${this.state.scaleRatio})`,
      width: viewWidth,
      height: viewHeight
    };

    let grids = board.grids.map(
      (grid, key) => <GridView key={key} grid={grid} />
    );

    /* let hints = this.props.hints.map(
      (grid, key) => <RelatiGridHint key={key} grid={grid} color={this.state.hintColor} />
    ); */

    return (
      <div className="relati-board" style={boardStyle}>
        <svg width="45" height="45">
          <g className="relati-lines"></g>
          <g className="horizon-lines">{horizonLines}</g>
          <g className="vertical-lines">{verticalLines}</g>
          <g className="relati-grids">{grids}</g>
          <g className="placement-hints"></g>
        </svg>
        <div onClick={e => this._onClick(e)}></div>
      </div>
    );
  }
}

export default BoardView;