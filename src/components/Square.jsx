import React from "react";

export default function Square({ value, onSquareClick, isWinSquare }) {
  return (
    <button
      className={"square ".concat(isWinSquare ? "win-path" : "")}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
