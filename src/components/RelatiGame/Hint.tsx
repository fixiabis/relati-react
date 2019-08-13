import React from 'react';

type HintProps = { x: number, y: number, color: string };

function Hint(props: HintProps) {
  let cx = props.x * 5 + 2.5;
  let cy = props.y * 5 + 2.5;
  return <circle cx={cx} cy={cy} r="0.5" fill={props.color}></circle>;
}

export default Hint;