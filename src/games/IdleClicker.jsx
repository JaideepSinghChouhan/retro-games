import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import '../styles/IdleClicker.css';

export default function IdleClickerGame() {
  const [points, setPoints] = useState(0); // Total points
  const [clickPower, setClickPower] = useState(1); // Points per click
  const [autoPoints, setAutoPoints] = useState(0); // Points per second
  const [showConfetti, setShowConfetti] = useState(false);

  // Increment points passively every second
  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prev => prev + autoPoints);
    }, 1000);
    return () => clearInterval(interval);
  }, [autoPoints]);

  // Show confetti when reaching 1000 points
  useEffect(() => {
    if (points >= 1000 && !showConfetti) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [points, showConfetti]);

  // Handle clicking the main button
  const handleClick = () => {
    setPoints(prev => prev + clickPower);
  };

  // Upgrade click power by spending 50 points
  const upgradeClick = () => {
    if (points >= 50) {
      setPoints(prev => prev - 50);
      setClickPower(prev => prev + 1);
    }
  };

  // Upgrade auto points by spending 100 points
  const upgradeAuto = () => {
    if (points >= 100) {
      setPoints(prev => prev - 100);
      setAutoPoints(prev => prev + 1);
    }
  };

  return (
    <div className="retro-container flex flex-col justify-center">
      {showConfetti && <Confetti />}
      <h2 className="retro-title">Idle Clicker</h2>

      <p className="points">Points: {points}</p>

      {/* Click button */}
      <button className="click-button" onClick={handleClick}>
        Click Me (+{clickPower})
      </button>

      {/* Upgrade controls */}
      <div className="upgrades">
        <button onClick={upgradeClick}>Upgrade Click (+1) - 50 pts</button>
        <button onClick={upgradeAuto}>Upgrade Auto (+1/sec) - 100 pts</button>
      </div>

      <p className="status">Auto Income: {autoPoints}/sec</p>
    </div>
  );
}
