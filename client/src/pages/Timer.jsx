/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect } from 'react';
import water from '../assets/water.wav';
import styles from '../styles/Timer.module.css';

function Timer() {
  const [timer, setTimer] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [timerType, setTimerType] = useState('work');

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimer(timerType === 'work' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleTimerTypeChange = (e) => {
    const newTimerType = e.target.value;
    setTimerType(newTimerType);
    setIsRunning(false);
    setTimer(newTimerType === 'work' ? 25 * 60 : 5 * 60);
  };

  return (
    <div className={styles.timer}>
      <h1>Calming Music</h1>
      <audio controls>
        <source src={water} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
      <h1>{timerType === 'work' ? 'Work Timer 🍅' : 'Break Timer 🍅'}</h1>
      <h2>{formatTime(timer)}</h2>
      <button className={styles.butt} type="button" onClick={toggleTimer}>{isRunning ? 'Pause' : 'Start'}</button>
      <button className={styles.butt} type="button" onClick={resetTimer}>Reset</button>
      <div>
        <label htmlFor="work-timer">
          <input
            id="work-timer"
            type="radio"
            value="work"
            checked={timerType === 'work'}
            onChange={handleTimerTypeChange}
          />
          Work Timer
        </label>
        <label htmlFor="break-timer">
          <input
            id="break-timer"
            type="radio"
            value="break"
            checked={timerType === 'break'}
            onChange={handleTimerTypeChange}
          />
          Break Timer
        </label>
      </div>
    </div>
  );
}

export default Timer;
