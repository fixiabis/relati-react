import React from 'react';
import { RelatiGrid, RelatiSymbolColor, RelatiRole } from '../../game';

type RouteProps = {
  grids: RelatiGrid[]
};

export default function Route({ grids }: RouteProps) {
  if (!grids[0]) return <></>;

  let routeStyle = {
    fill: 'none',
    strokeWidth: '0.6',
    stroke: RelatiSymbolColor[(grids[0].body as RelatiRole).symbol],
    d: `M ${grids.map(({ x, y }) => (
      `${x * 5 + 2.5} ${y * 5 + 2.5}`
    )).join(', L ')}`
  };

  return <path {...routeStyle} />;
}