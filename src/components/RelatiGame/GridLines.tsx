import React from 'react';
import GridLine from './GridLine';

type GridLinesProps = {
  width: number,
  height: number
};

function GridLines(props: GridLinesProps) {
  let horizonLines = [];
  let verticalLines = [];

  for (let x = 1; x < props.height; x++) {
    horizonLines.push(
      <GridLine key={x} d={`M 0 ${x * 5} H ${props.width * 5}`} />
    );
  }

  for (let y = 1; y < props.width; y++) {
    verticalLines.push(
      <GridLine key={y} d={`M ${y * 5} 0 V ${props.height * 5}`} />
    );
  }

  return <g>{horizonLines}{verticalLines}</g>;
}

export default GridLines;