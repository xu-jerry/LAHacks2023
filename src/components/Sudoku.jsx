import React, { useState, useEffect } from 'react';
import styles from '../styles/Sudoku.module.css';

// Define the initial state of the game board
const initialBoards = [[
  [null, null, 5, 3, null, null, null, null, null],
  [8, null, null, null, null, null, null, 2, null],
  [null, 7, null, null, 1, null, 5, null, null],
  [4, null, null, null, null, 5, 3, null, null],
  [null, 1, null, null, 7, null, null, null, 6],
  [null, null, 3, 2, null, null, null, 8, null],
  [null, 6, null, 5, null, null, null, null, 9],
  [null, null, 4, null, null, null, null, 3, null],
  [null, null, null, null, null, 9, 7, null, null],
]];

// Define the Sudoku component
function Sudoku() {
  // Set up state for the game board
  const [curIndex, setCurIndex] = useState(0);
  const [board, setBoard] = useState([]);
  const [message, setMessage] = useState('');

  // Define the render function for each cell in the game board
  function renderCell(row, col, changeable) {
    // Define the function to handle changes to a cell's value
    function handleCellChange(r, c, value) {
      const newBoard = [...board];
      newBoard[r][c] = value ? Number(value) : null;
      setBoard(newBoard);
    }

    const value = board[row][col];
    return (
      changeable
        ? (
          <input
            type="number"
            min="1"
            max="9"
            value={value || ''}
            onChange={(e) => handleCellChange(row, col, e.target.value)}
          />
        ) : (
          <div>
            {' '}
            {initialBoards[curIndex][row][col]}
            {' '}
          </div>
        )
    );
  }

  function isValidSudoku() {
    // Check rows
    for (let row = 0; row < 9; row += 1) {
      const rowSet = new Set();
      for (let col = 0; col < 9; col += 1) {
        const val = board[row][col];
        if (val !== '.') {
          if (rowSet.has(val)) {
            return false;
          }
          rowSet.add(val);
        }
      }
    }

    // Check columns
    for (let col = 0; col < 9; col += 1) {
      const colSet = new Set();
      for (let row = 0; row < 9; row += 1) {
        const val = board[row][col];
        if (val !== '.') {
          if (colSet.has(val)) {
            return false;
          }
          colSet.add(val);
        }
      }
    }

    // Check 3x3 boxes
    for (let boxRow = 0; boxRow < 3; boxRow += 1) {
      for (let boxCol = 0; boxCol < 3; boxCol += 1) {
        const boxSet = new Set();
        for (let row = boxRow * 3; row < boxRow * 3 + 3; row += 1) {
          for (let col = boxCol * 3; col < boxCol * 3 + 3; col += 1) {
            const val = board[row][col];
            if (val !== '.') {
              if (boxSet.has(val)) {
                return false;
              }
              boxSet.add(val);
            }
          }
        }
      }
    }

    return true;
  }

  function checkBoard(event) {
    event.preventDefault();
    if (isValidSudoku()) {
      setMessage("Yay! You've solved the game!");
      setCurIndex(0);
    } else {
      setMessage('Sorry :(');
    }
  }

  useEffect(() => { setBoard(initialBoards[curIndex]); }, []);

  // Render the game board
  return (
    <div className={styles.sudoku}>
      {board.map((row, rowIndex) => (
        <div className={styles.sudoku_row}>
          {row.map((cell, colIndex) => (
            <div className={styles.sudoku_cell}>
              {renderCell(rowIndex, colIndex, initialBoards[curIndex][rowIndex][colIndex] == null)}
            </div>
          ))}
          <br />
        </div>
      ))}
      <form onSubmit={(e) => checkBoard(e)}>
        <input type="submit" value="Submit" />
      </form>
      <div>{message}</div>
    </div>
  );
}

export default Sudoku;
