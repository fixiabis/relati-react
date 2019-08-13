import React from 'react';
import Hint from './Hint';
import { RelatiGrid } from '../../game';

type HintsProps = {
  grids: RelatiGrid[]
  color: string
};

function Hints(props: HintsProps) {
  return <g>{props.grids.map((grid, key) => <Hint key={key} {...grid} color={props.color} />)}</g>;
}

export default Hints;