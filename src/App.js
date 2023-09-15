import React, { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Row({ rowNo, cols, state, setState }) {
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
        />
      ))}
    </div>
  );
}

function Board({ rows, cols, xturn, squares, onPlay }) {
  function handleClick(index) {
    if (calculateWinner(squares) || squares[index]) return;

    const nextSquares = squares.slice();
    nextSquares[index] = xturn ? "X" : "O";
    onPlay(nextSquares);
  }

  let winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xturn ? "X" : "O"}`;
  }

  return (
    <div>
      <div className="status">{status}</div>
      {Array(rows)
        .fill()
        .map((_, i) => (
          <Row
            rowNo={i}
            cols={cols}
            state={squares}
            setState={handleClick}
            key={i}
          />
        ))}
    </div>
  );
}

/*
  Challenges:
  1. [Done] For the current move only, show “You are at move #…” instead of a button.
  2. [Done] Rewrite Board to use two loops to make the squares instead of hardcoding them.
  3. Add a toggle button that lets you sort the moves in either ascending or descending order.
  4. When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
  5. Display the location for each move in the format (row, col) in the move history list.
*/

export default function Game({ rows, cols }) {
  const [history, setHistory] = useState([Array(rows * cols).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xturn = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_, move) => {
    if (move === currentMove) {
      return (
        <li key={move}>
          <b>You are at move #{move}</b>
        </li>
      );
    }

    const desc = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          rows={rows}
          cols={cols}
          xturn={xturn}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
