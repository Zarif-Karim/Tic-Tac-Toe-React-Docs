
import React from "react";
import Row from "./Row"
import { calculateWinner } from "../utils";

export default function Board({ rows, cols, xturn, squares, onPlay, winPath }) {
  function handleClick(index) {
    if (calculateWinner(squares).winner || squares[index]) return;

    const nextSquares = squares.slice();
    nextSquares[index] = xturn ? "X" : "O";
    onPlay(nextSquares, index);
  }

  return (
    <div>
      {Array(rows)
        .fill()
        .map((_, i) => (
          <Row
            rowNo={i}
            cols={cols}
            state={squares}
            setState={handleClick}
            winPath={winPath}
            key={i}
          />
        ))}
    </div>
  );
}
