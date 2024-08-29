'use client';

import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material';
import './pomodoro.css';

const PomoodoroWidget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 350,
  maxWidth: '100%',
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
}));

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // total time in seconds
  const [totalTime, setTotalTime] = useState(25 * 60); // total time in seconds

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        if (timeLeft === 0) {
          clearInterval(timer);
          toast("Time's up!");
          resetTimer();
        } else {
          setTimeLeft((prev) => prev - 1);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  }, [timeLeft]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(totalTime);
  };

  const selectInterval = (interval) => {
    setIsRunning(false);
    let newTime;
    switch (interval) {
      case 'regular':
        newTime = 25 * 60;
        break;
      case 'short':
        newTime = 5 * 60;
        break;
      case 'long':
        newTime = 60 * 60;
        break;
      case 'workday':
        newTime = 8 * 60 * 60;
        break;
      default:
        newTime = 25 * 60;
        break;
       case 'lunch break':
        newTime = 30 * 60;
        break;
    }
    setTimeLeft(newTime);
    setTotalTime(newTime);
  };

  const calculateProgress = () => {
    return (timeLeft / totalTime) * 100;
  };

  return (
    <PomoodoroWidget>
      <div className="circle-container">
        <svg width="200" height="200" className="timer-circle">
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="#e0e0e0"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="var(--background-primary)"
            strokeWidth="10"
            fill="none"
            strokeDasharray={565.48} // 2 * PI * R
            strokeDashoffset={(calculateProgress() / 100) * 565.48}
          />
        </svg>
        <div className="time-display">
          {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:
          {String(seconds).padStart(2, '0')}
        </div>
      </div>
      <div className="controls">
        <button onClick={startTimer} disabled={isRunning} aria-label="Start Timer">
          Start
        </button>
        <button onClick={pauseTimer} disabled={!isRunning} aria-label="Pause Timer">
          Pause
        </button>
        <button onClick={resetTimer} aria-label="Reset Timer">
          Reset
        </button>
      </div>
      <div className="intervals">
        <button onClick={() => selectInterval('regular')}>Regular (25:00)</button>
        <button onClick={() => selectInterval('short')}>Short Break (5:00)</button>
        <button onClick={() => selectInterval('long')}>Long Break (60:00)</button>
        <button onClick={() => selectInterval('Lunch Break')}>Lunch Break(30:00)</button>
        <button onClick={() => selectInterval('workday')}>Work Day (8:00:00)</button>
      </div>
    </PomoodoroWidget>
  );
};

export default Timer;
