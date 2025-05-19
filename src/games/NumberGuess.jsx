import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import '../styles/GameStyle.css';

const NumberGuess = () => {
  const [target, setTarget] = useState(null);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setTarget(Math.floor(Math.random() * 100) + 1);
  }, []);

const launchConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ff00e6', '#00ff9f', '#ffea00'],
    });
  };

  const handleGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num)) return;

    setAttempts((prev) => prev + 1);

    if (num === target) {
      setMessage(`🎉 You guessed it in ${attempts + 1} tries!`);
      setGameOver(true);
      launchConfetti(); 
    } else if (num < target) {
      setMessage("🔻 Too Low!");
    } else {
      setMessage("🔺 Too High!");
    }
    setGuess("");
  };

  return (
    <div className="retro-box flex flex-col gap-5 text-white text-center p-4">
      <h1 className="text-2xl mb-4 neon">Number Guessing</h1>
      <p>Guess the number between 1 and 100</p>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        className="retro-input mt-4"
        disabled={gameOver}
      />
      <button onClick={handleGuess} className="bg-sky-600 hover:bg-sky-700 ml-2 border-2 rounded-sm p-1 neon" disabled={gameOver}>
        Guess
      </button>
      
      <p className="mt-4 result-text">{message}</p>
      {gameOver && (
  <button
    className="retro-btn mt-4"
    onClick={() => {
      setTarget(Math.floor(Math.random() * 100) + 1);
      setGuess("");
      setMessage("");
      setAttempts(0);
      setGameOver(false);
    }}
  >
    🔁 Play Again
  </button>
)}

    </div>
  );
};

export default NumberGuess;
