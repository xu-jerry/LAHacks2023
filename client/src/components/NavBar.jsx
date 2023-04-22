import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/NavBar.module.css';

// Navigation Bar component used to navigate to different pages

function NavBar() {
  return (
    <div>
      <div className={styles.container}>
        <Link to="/" className={styles.no_link}>
          <h1 className={styles.dopa_mind}>DopaMind</h1>
        </Link>
        <Link to="/games" className={styles.btn_info}>
          GAMES
        </Link>
        {/* TODO: have requests link instead for admin */}
        <Link to="/transcribble" className={styles.btn_info}>
          TRANSCRIBBLE
        </Link>
        <Link to="/timer" className={styles.btn_info}>
          TIMER
        </Link>
        <Link to="/resources" className={styles.btn_info}>
          RESOURCES
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
