// src/CountdownTimer.js

import React, { useState, useEffect } from 'react';
import './style.scss';

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
      <div className="countdown">
        <div className='countBlock'>
          <h2>{timeLeft.days || '0'}</h2>
          <span>Days</span>
        </div>
        <div className='countBlock'>
          <h2>{timeLeft.hours || '0'}</h2>
          <span>Hrs</span>
        </div>
        <div className='countBlock'>
          <h2>{timeLeft.minutes || '0'}</h2>
          <span>Min</span>
        </div>
        <div className='countBlock'>
          <h2>{timeLeft.seconds || '0'}</h2>
          <span>Sec</span>
        </div>
      </div>
  );
};

export default CountdownTimer;
