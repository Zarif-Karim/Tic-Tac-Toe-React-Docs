import React, { useState } from "react";

function Square({ value, onSquareClick, isWinSquare }) {
  return (
    <button
      className={"square ".concat(isWinSquare ? "win-path" : "")}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Row({ rowNo, cols, state, setState, winPath }) {
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
          isWinSquare={winPath && winPath.includes(index)}
        />
      ))}
    </div>
  );
}

function Board({ rows, cols, xturn, squares, onPlay, winPath }) {
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

/*
  Challenges:
  1. [Done] For the current move only, show “You are at move #…” instead of a button.
  2. [Done] Rewrite Board to use two loops to make the squares instead of hardcoding them.
  3. [Done] Add a toggle button that lets you sort the moves in either ascending or descending order.
  4. [Done] When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
  5. [Done] Display the location for each move in the format (row, col) in the move history list.
*/

export default function Game({ rows, cols }) {
  const [history, setHistory] = useState([Array(rows * cols).fill(null)]);
  const [indexHistory, setIndexHistory] = useState([null]);
  const [currentMove, setCurrentMove] = useState(0);
  const xturn = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const [isAscending, setIsAscending] = useState(true);

  function handlePlay(nextSquares, index) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setIndexHistory([...indexHistory.slice(0, currentMove + 1), index]);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    console.log(indexHistory);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_, move) => {
    const row = Math.floor(indexHistory[move] / 3) + 1;
    const col = (indexHistory[move] % 3) + 1;
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

function calculateWinner(squares) {
  let winner = null;
  let path = null;

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
      winner = squares[a];
      path = [a, b, c];
      break;
    }
  }
  return {
    winner,
    path,
  };
}
