
import React from "react";
import Row from "./Row"
import { calculateWinner } from "../utils";

interface BoardProps {
  rows: number;
  cols: number;
  xturn: boolean;
  squares: string[];
  onPlay: (squares: string[], index: number) => void;
  winPath: number[] | null;
};

export default function Board({ rows, cols, xturn, squares, onPlay, winPath }: BoardProps) {
  function handleClick(index: number) {
    if (calculateWinner(squares).winner || squares[index]) return;

    const nextSquares = squares.slice();
    nextSquares[index] = xturn ? "X" : "O";
    onPlay(nextSquares, index);
  }

  return (
    <div>
      {Array(rows)
        .fill(null)
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
