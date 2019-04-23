import React, { useReducer } from 'react';
import Board from './Board';
import { calculateWinner } from '../utils/calculateWinner';

const initialState = {
  history: [{
    squares: Array(9).fill(null),
  }],
  stepNumber: 0,
  xIsNext: true,
};

const reducer = (state, action) => {
  switch (action.type) {
  case 'make_move':
    return {
      ...state,
      history: [...state.history.slice(0, state.stepNumber + 1), action.newBoardState],
      stepNumber: state.stepNumber + 1,
      xIsNext: !state.xIsNext,
    };
  case 'jump_to':
    return {
      ...state,
      stepNumber: action.step,
      xIsNext: (action.step % 2) === 0,
    };
  default:
    throw new Error();
  }
};

const Game = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { history, stepNumber, xIsNext } = state;

  const currentBoard = history[stepNumber];
  const winner = calculateWinner(currentBoard.squares);

  const handleClick = (i) => {
    const newSquares = [...currentBoard.squares];
    if (winner || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    dispatch({ type: 'make_move', newBoardState: { squares: newSquares } });
  };

  const jumpTo = (step) => {
    dispatch({ type: 'jump_to', step });
  };

  const moves = history.map((step, move) => {
    const desc = move ?
      `Go to move #${move}` :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

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
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
