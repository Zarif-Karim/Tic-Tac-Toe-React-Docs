import React from "react";

export type SquareProps = {
  value: string;
  onSquareClick: () => void;
  isWinSquare: boolean;
};

export default function Square({ value, onSquareClick, isWinSquare }: SquareProps) {
  return (
    <button
      className={"square ".concat(isWinSquare ? "win-path" : "")}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
