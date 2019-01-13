'use strict';
const { useEffect, useState } = require('react');

function useCountdownSeconds (durationSec, warningSec) {
  const [startTime, start] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isWarning, warn] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    // incoming expiration or warning
    if (intervalId) {
      clearInterval(intervalId);
      warn(false);
    }

    // expired
    if (!startTime) {
      return;
    }

    // start timer
    let t = durationSec;
    setTimeLeft(t--);

    setIntervalId(setInterval(() => {
      setTimeLeft(t);
      if (!t) {
        start(0);
      } else if (t === warningSec) {
        warn(true);
      }
      // decrement every second
      t--;
    }, 1000))
  }, [startTime])

  return { start, startTime, timeLeft, isWarning }
}

module.exports = useCountdownSeconds;
