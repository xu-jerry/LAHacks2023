import React from 'react';
import Sudoku from '../components/Sudoku';
import Anagrams from '../components/Anagrams';

function Games() {
  return (
    <div>
      <div>
        Sudoku:
        {' '}
        <Sudoku />
      </div>
      <div>
        Anagrams:
        {' '}
        <Anagrams />
      </div>
    </div>
  );
}

export default Games;
