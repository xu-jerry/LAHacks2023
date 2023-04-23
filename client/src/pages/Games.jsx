import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Games.module.css';
import Sudoku from '../assets/sudoku.png';

function Games() {
  return (
    <div className={styles.games}>
      <div className={styles.cards_container}>
        <Link to="/games/sudoku">
          <div className={styles.card}>
            <img src={Sudoku} alt="Sudoku thumbnail" className={styles.card_image} />
            <p className={styles.card_name}>Sudoku</p>
          </div>
        </Link>
        <Link to="/games/anagrams">
          <div className={styles.card}>
            <img src="https://reactjs.org/logo-og.png" alt="Anagrams thumbnail" className={styles.card_image} />
            <p className={styles.card_name}>Anagrams</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Games;
