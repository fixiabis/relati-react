import React from 'react';
import Grid from './Grid';
import { RelatiGrid } from '../../game';

type GridsProps = {
  grids: RelatiGrid[]
};

function Grids(props: GridsProps) {
  return <g>{props.grids.map((grid, key) => <Grid key={key} grid={grid} />)}</g>;
}

export default Grids;