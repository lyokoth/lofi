'use client'

import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material';
import './pomodoro.css';

const PomoodoroWidget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
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

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          alert("Time's up!");
          resetTimer();
        } else if (seconds === 0) {
          if (minutes === 0) {
            setHours((prev) => prev - 1);
            setMinutes(59);
            setSeconds(59);
          } else {
            setMinutes((prev) => prev - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, hours, minutes, seconds]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);

  const resetTimer = () => {
    setIsRunning(false);
    setHours(0);
    setMinutes(25);
    setSeconds(0);
  };

  const selectInterval = (interval) => {
    setIsRunning(false);
    switch (interval) {
      case 'regular':
        setHours(0);
        setMinutes(25);
        setSeconds(0);
        break;
      case 'short': 
        setHours(0);
        setMinutes(5);
        setSeconds(0);
        break;
      case 'long':
        setHours(1);
        setMinutes(0);
        setSeconds(0);
        break;
      case 'workday':
        setHours(8);
        setMinutes(0);
        setSeconds(0);
      default:
        break;
    }
  }

  return (
    <PomoodoroWidget>
      <div className="time-display">
        {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="controls">
        <button onClick={startTimer} disabled={isRunning} aria-label="Start Timer">Start</button>
        <button onClick={pauseTimer} disabled={!isRunning} aria-label="Pause Timer">Pause</button>
        <button onClick={resetTimer} aria-label="Reset Timer">Reset</button>
      </div>
      <div className="intervals">
        <button onClick={() => selectInterval('regular')}>Regular (25:00)</button>
        <button onClick={() => selectInterval('short')}>Short Break (5:00)</button>
        <button onClick={() => selectInterval('long')}>Long Break (60:00)</button>
        <button onClick={() => selectInterval('workday')}>Work Day (8:00:00)</button>
      </div>
    </PomoodoroWidget>
  );
};

export default Timer;
