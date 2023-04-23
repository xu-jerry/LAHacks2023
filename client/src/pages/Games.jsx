import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Games.module.css';

function Games() {
  return (
    <div className={styles.games}>
      <div className={styles.cards_container}>
        <Link to="/games/sudoku">
          <div className={styles.card}>
            <img src="https://reactjs.org/logo-og.png" alt="React logo" className={styles.card_image} />
            <p className={styles.card_name}>Sudoku</p>
          </div>
        </Link>
        <Link to="/games/anagrams">
          <div className={styles.card}>
            <img src="https://reactjs.org/logo-og.png" alt="React logo" className={styles.card_image} />
            <p className={styles.card_name}>Anagrams</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Games;
