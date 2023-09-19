import React from "react";
import Square from "./Square";

export type RowProps = {
  rowNo: number;
  cols: number;
  state: string[];
  setState: (index: number) => void;
  winPath: number[] | null;
};

export default function Row({ rowNo, cols, state, setState, winPath }: RowProps) {
  const indexes = [];
  for (let c = 0; c < cols; c++) {
    indexes.push(rowNo * cols + c);
  }

  return (
    <div className="board-row">
      {indexes.map((index, key) => (
        <Square
          key={key}
          value={state[index]}
          onSquareClick={() => setState(index)}
          isWinSquare={!!winPath && winPath.includes(index)}
        />
      ))}
    </div>
  );
}
