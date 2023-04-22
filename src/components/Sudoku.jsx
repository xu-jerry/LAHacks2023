import React, { useState } from 'react';
import styles from '../styles/Sudoku.module.css';

// Define the initial state of the game board
const initialBoard = [
  [null, null, 5, 3, null, null, null, null, null],
  [8, null, null, null, null, null, null, 2, null],
  [null, 7, null, null, 1, null, 5, null, null],
  [4, null, null, null, null, 5, 3, null, null],
  [null, 1, null, null, 7, null, null, null, 6],
  [null, null, 3, 2, null, null, null, 8, null],
  [null, 6, null, 5, null, null, null, null, 9],
  [null, null, 4, null, null, null, null, 3, null],
  [null, null, null, null, null, 9, 7, null, null],
];

// Define the Sudoku component
function Sudoku() {
  // Set up state for the game board
  const [board, setBoard] = useState(initialBoard);

  // Define the render function for each cell in the game board
  function renderCell(row, col) {
    // Define the function to handle changes to a cell's value
    function handleCellChange(r, c, value) {
      const newBoard = [...board];
      newBoard[r][c] = value ? Number(value) : null;
      setBoard(newBoard);
    }

    const value = board[row][col];
    return (
      <input
        type="number"
        min="1"
        max="9"
        value={value || ''}
        onChange={(e) => handleCellChange(row, col, e.target.value)}
      />
    );
  }

  // Render the game board
  return (
    <div className={styles.sudoku}>
      {board.map((row, rowIndex) => (
        <div className={styles.sudoku_row}>
          {row.map((cell, colIndex) => (
            <div className={styles.sudoku_cell}>
              {renderCell(rowIndex, colIndex)}
            </div>
          ))}
          <br />
        </div>
      ))}
    </div>
  );
}

export default Sudoku;
