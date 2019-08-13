import "./relati-board.scss";
import React from 'react';
import Grids from "./Grids";
import GridLines from './GridLines';
import { RelatiBoard, RelatiGrid } from '../../game';

type BoardProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  id: string,
  board: RelatiBoard,
  onGridSelect?: (grid: RelatiGrid | null) => void,
  children?: any
};

type BoardState = { scaleRatio: number };

class Board extends React.Component<BoardProps, BoardState> {
  public viewWidth: number;
  public viewHeight: number;

  constructor(props: BoardProps) {
    super(props);
    this.state = { scaleRatio: 0 };
    this.viewWidth = props.board.width * 5;
    this.viewHeight = props.board.height * 5;
    window.addEventListener('resize', e => this.resize());
  }

  resize() {
    let container = document.getElementById(this.props.id);
    if (!container) return;

    let containerWidth = container.offsetWidth;
    let containerHeight = container.offsetHeight;

    let scaleRatio = Math.min(
      containerWidth / this.viewWidth,
      containerHeight / this.viewHeight
    ) * 0.95;

    this.setState({ scaleRatio });
  }

  onBoardClick(e: React.MouseEvent) {
    let { board, onGridSelect } = this.props;
    let { offsetX, offsetY } = e.nativeEvent;
    let x = Math.floor(offsetX / 5), y = Math.floor(offsetY / 5);
    let grid = board.getGrid(x, y);
    if (onGridSelect) onGridSelect(grid);
    this.forceUpdate();
  }

  componentDidMount() { this.resize(); }

  render() {
    let { viewWidth, viewHeight, props } = this;
    let containerProps = { ...props };
    delete containerProps.board;
    delete containerProps.onGridSelect;

    let boardStyle = {
      transform: `scale(${this.state.scaleRatio})`,
      width: viewWidth,
      height: viewHeight
    };

    return (
      <div className="board-container" {...containerProps}>
        <div className="relati-board" style={boardStyle}>
          <svg width="45" height="45">
            <GridLines {...props.board} />
            <Grids {...props.board} />
            {this.props.children}
          </svg>
          <div onClick={e => this.onBoardClick(e)}></div>
        </div>
      </div>
    );
  }
}

export default Board;