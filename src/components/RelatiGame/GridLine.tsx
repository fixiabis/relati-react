import React from 'react';

function GridLine(props: { key: number, d: string }) {
  return <path stroke="#888" strokeWidth="0.4" {...props} />;
}

export default GridLine;