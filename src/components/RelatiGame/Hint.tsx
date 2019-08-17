import React from 'react';

type HintProps = { x: number, y: number, color: string };

function Hint({ x, y, color }: HintProps) {
  let cx = x * 5 + 2.5;
  let cy = y * 5 + 2.5;
  return <circle cx={cx} cy={cy} r="0.5" fill={color}></circle>;
}

export default Hint;