import React from 'react';
import { RelatiGrid } from '../../game/RelatiDefs';
import RelatiSymbolColor from '../../game/RelatiSymbolColor';

type GridProps = { grid: RelatiGrid };

const SymbolPathMap = {
  "O": "m 0 -1.5, a 1.5 1.5, 0 0 1, 0 3, a 1.5 1.5, 0 0 1, 0 -3",
  "X": "m -1.5 -1.5, l 3 3, m 0 -3, l -3 3"
};

class GridView extends React.Component<GridProps> {
  render() {
    let { grid } = this.props;

    if (!grid.body) return <g></g>;

    let paths = [];
    let x = grid.x * 5 + 2.5;
    let y = grid.y * 5 + 2.5;

    let props = {
      d: `M ${x} ${y}, ${SymbolPathMap[grid.body.symbol as "O" | "X"]}`,
      strokeWidth: "0.6",
      stroke: RelatiSymbolColor[grid.body.symbol],
      fill: "none",
      key: "1"
    };

    if (grid.body.is("launcher")) {
      props.strokeWidth = "1";
      paths.push(<path {...props}></path>);
      props.key = "2";
      props.stroke = "#f2f2f2";
      props.strokeWidth = "0.5";
    } else if (!grid.body.is("repeater")) {
      props.stroke = "#666";
    }

    paths.push(<path {...props}></path>);
    return <g>{paths}</g>;
  }
}

export default GridView;