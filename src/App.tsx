import React, { useState } from "react";
import Board from "./components/Board";
import { calculateWinner } from "./utils";
/*
  Challenges:
  1. [Done] For the current move only, show “You are at move #…” instead of a button.
  2. [Done] Rewrite Board to use two loops to make the squares instead of hardcoding them.
  3. [Done] Add a toggle button that lets you sort the moves in either ascending or descending order.
  4. [Done] When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
  5. [Done] Display the location for each move in the format (row, col) in the move history list.
*/
type GameProps = {
  rows: number;
  cols: number;
};

export default function Game({ rows, cols }: GameProps) {
  const [history, setHistory] = useState([Array(rows * cols).fill(null)]);
  const [indexHistory, setIndexHistory] = useState<(number|null)[]>([null]);
  const [currentMove, setCurrentMove] = useState(0);
  const xturn = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const [isAscending, setIsAscending] = useState(true);

  function handlePlay(nextSquares: string[], index: number) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setIndexHistory([...indexHistory.slice(0, currentMove + 1), index]);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_, move) => {
    const row = Math.floor(indexHistory[move]! / 3) + 1;
    const col = (indexHistory[move]! % 3) + 1;
    const desc = move ? `Go to move #${move}: (${row} ${col})` : "Go to game start";
    return (
      <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let { winner, path } = calculateWinner(currentSquares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (currentMove === 9) {
    status = `Draw!`;
  } else {
    status = `Next player: ${xturn ? "X" : "O"}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <div className="status">{status}</div>
        <Board
          rows={rows}
          cols={cols}
          xturn={xturn}
          squares={currentSquares}
          onPlay={handlePlay}
          winPath={path}
        />
      </div>
      <div className="game-info">
        <ol>
          <button onClick={() => setIsAscending(!isAscending)}>Toggle</button>
        </ol>
        <ol reversed={!isAscending}>
          {isAscending ? moves : moves.reverse()}
          <li>You are at move #{history.length}</li>
        </ol>
      </div>
    </div>
  );
}