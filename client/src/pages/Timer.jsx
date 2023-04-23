/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect } from 'react';
import Waveform from '../components/Waveform';

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
    <div>
      <Waveform />
      <h1>{timerType === 'work' ? 'Work Timer' : 'Break Timer'}</h1>
      <h2>{formatTime(timer)}</h2>
      <button type="button" onClick={toggleTimer}>{isRunning ? 'Pause' : 'Start'}</button>
      <button type="button" onClick={resetTimer}>Reset</button>
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
