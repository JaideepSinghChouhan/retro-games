import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import '../styles/ReactionSpeed.css';

export default function ReactionSpeedGame() {
  const [gameState, setGameState] = useState('idle'); // idle | waiting | ready | result
  const [message, setMessage] = useState('Click to Start');
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const timeoutRef = useRef(null);

  const startGame = () => {
    setGameState('waiting');
    setMessage('Wait for green...');
    const randomDelay = Math.floor(Math.random() * 3000) + 2000;
    timeoutRef.current = setTimeout(() => {
      setGameState('ready');
      setMessage('Click now!');
      setStartTime(Date.now());
    }, randomDelay);
  };

  const handleClick = () => {
    if (gameState === 'idle') {
      startGame();
    } else if (gameState === 'waiting') {
      clearTimeout(timeoutRef.current);
      setMessage('Too soon! Click to try again.');
      setGameState('idle');
    } else if (gameState === 'ready') {
      const time = Date.now() - startTime;
      setReactionTime(time);
      if (!bestTime || time < bestTime) {
        setBestTime(time);
      }
      setMessage(`Your time: ${time}ms\nClick to play again.`);
      setGameState('result');
    } else if (gameState === 'result') {
      setGameState('idle');
      setMessage('Click to Start');
      setReactionTime(null);
    }
  };

  return (
    <div className={`retro-container reaction-container flex flex-col justify-center ${gameState}`} onClick={handleClick}>
      {(bestTime && reactionTime && reactionTime <= bestTime) && <Confetti />}
      <h2 className="retro-title">Reaction Speed Test</h2>
      <div className="reaction-box">
        <p className="reaction-message">{message}</p>
        {reactionTime && (
          <p className="reaction-result">Reaction Time: {reactionTime}ms</p>
        )}
        {bestTime && (
          <p className="reaction-best">Best Time (Ghost): {bestTime}ms</p>
        )}
      </div>
    </div>
  );
}
