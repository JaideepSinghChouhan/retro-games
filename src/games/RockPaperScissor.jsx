import React, { useState } from 'react';
import rock from '../assets/rock.png';
import paper from '../assets/paper.png';
import scissors from '../assets/scissors.png';

import '../styles/GameStyle.css';

const choices = ['Rock', 'Paper', 'Scissors'];
const choiceImages = {
  Rock: rock,
  Paper: paper,
  Scissors: scissors,
};

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const play = (choice) => {
    const computer = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setComputerChoice(computer);

    if (choice === computer) {
      setResult("It's a Draw!");
    } else if (
      (choice === 'Rock' && computer === 'Scissors') ||
      (choice === 'Paper' && computer === 'Rock') ||
      (choice === 'Scissors' && computer === 'Paper')
    ) {
      setResult('You Win!');
      setPlayerScore(prev => prev + 1);
    } else {
      setResult('You Lose!');
      setComputerScore(prev => prev + 1);
    }
  };

  return (
    <div className="retro-box text-center p-6 text-white">
      <h1 className="text-3xl neon mb-6">Rock Paper Scissors</h1>

      {/* Scoreboard */}
      <div className="scoreboard flex justify-center gap-10 mb-6 text-xl">
        <div className="player-score">👤 You: {playerScore}</div>
        <div className="computer-score">🤖 Computer: {computerScore}</div>
      </div>

      {/* Choices */}
      <div className="choices flex justify-center gap-10 mb-6">
        {choices.map((choice) => (
          <div
            key={choice}
            className="choice cursor-pointer transition-transform hover:scale-110"
            onClick={() => play(choice)}
          >
            <img src={choiceImages[choice]} alt={choice} className="w-24 h-24" />
            <p className="mt-2">{choice}</p>
          </div>
        ))}
      </div>

      {/* Result */}
      {playerChoice && (
        <div className="result mt-4 text-lg">
          <p>You chose: <strong>{playerChoice}</strong></p>
          <p>Computer chose: <strong>{computerChoice}</strong></p>
          <h2 className="mt-2 result-text font-bold">{result}</h2>
        </div>
      )}
    </div>
  );
};

export default RockPaperScissors;
