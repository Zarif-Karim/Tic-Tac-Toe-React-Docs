import React, { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Row({ indexes, state, setState }) {
  return (
    <div className="board-row">
      {indexes.map((index) => (
        <Square value={state[index]} onSquareClick={() => setState(index)} />
      ))}
    </div>
  );
}

function Board({ xturn, squares, onPlay }) {
  
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
      <Row indexes={[0, 1, 2]} state={squares} setState={handleClick} />
      <Row indexes={[3, 4, 5]} state={squares} setState={handleClick} />
      <Row indexes={[6, 7, 8]} state={squares} setState={handleClick} />
    </div>
  );
}

export default function Game() {
  const [xturn, setXTurn] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXTurn(!xturn);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xturn={xturn} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
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
