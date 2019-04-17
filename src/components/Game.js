import React, { useState } from 'react';
import Board from './Board';
import { calculateWinner } from '../utils/calculateWinner';

const Game = () => {
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null),
  }]);
  const [xIsNext, setXIsNext] = useState(true);

  const currentBoard = history[history.length - 1];
  const winner = calculateWinner(currentBoard.squares);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const handleClick = (i) => {
    const newSquares = [...currentBoard.squares];
    if (winner || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setHistory([...history, { squares: newSquares }]);
    setXIsNext(!xIsNext);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={currentBoard.squares}
          onClick={i => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

export default Game;
