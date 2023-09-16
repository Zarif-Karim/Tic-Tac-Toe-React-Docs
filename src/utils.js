// function to calculate the winner of tic-tac-toe game
export function calculateWinner(squares) {
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