// src/components/Clock/Clock.jsx
import React, { useEffect, useState } from 'react';
import Digit from '../Digit/Digit';
import './Clock.css';

const Clock = () => {
  const [minutesTens, setMinutesTens] = useState("");
  const [minutesOnes, setMinutesOnes] = useState("");
  const [secondsTens, setSecondsTens] = useState("");
  const [secondsOnes, setSecondsOnes] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const minutes = now.getMinutes(); // 0–59
      const seconds = now.getSeconds(); // 0–59

      // Minuten in Zehner und Einer aufsplitten
      setMinutesTens(Math.floor(minutes / 10) === 0 ? "" : Math.floor(minutes / 10));
      setMinutesOnes(minutes % 10);

      // Sekunden in Zehner und Einer aufsplitten
      setSecondsTens(Math.floor(seconds / 10));
      setSecondsOnes(seconds % 10);
    };

    updateClock(); // beim ersten Rendern sofort aufrufen
    const intervalId = setInterval(updateClock, 1000);

    // Cleanup, wenn Komponente ungemountet wird
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flip-clock-container">
      {/* Minuten-Zehner */}
      <Digit value={minutesTens} />
      {/* Minuten-Einer */}
      <Digit value={minutesOnes} />
      {/* Sekunden-Zehner */}
      <Digit value={secondsTens} />
      {/* Sekunden-Einer */}
      <Digit value={secondsOnes} />
    </div>
  );
};

export default Clock;
