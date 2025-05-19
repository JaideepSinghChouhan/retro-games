import React, { useState, useEffect } from 'react';
import '../styles/WordUnscramble.css'
import confetti from 'canvas-confetti';

// List of words for the puzzle
const words = [
  { word: 'REACT', hint: 'A popular JavaScript library for building UI' },
  { word: 'JAVASCRIPT', hint: 'Programming language of the web' },
  { word: 'PUZZLE', hint: 'A game that tests your problem-solving skills' },
  { word: 'CODING', hint: 'What developers do to create software' },
  { word: 'DEBUG', hint: 'Finding and fixing errors in code' },
];

// Utility to shuffle letters of a word
const shuffleWord = (word) => {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export default function WordUnscramblePuzzle() {
  const [currentIndex, setCurrentIndex] = useState(0);  // Current word index
  const [shuffled, setShuffled] = useState(shuffleWord(words[0].word));  // Shuffled letters
  const [userAnswer, setUserAnswer] = useState('');  // User typed answer
  const [score, setScore] = useState(0);  // Player score
  const [usedHint, setUsedHint] = useState(false);  // Hint usage state
  const [gameOver, setGameOver] = useState(false);  // Game finished flag

  
    useEffect(() => {
      if (score ===50 ) {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 }
        });
      }
    }, [score]);

  // Reset for next word
  const nextWord = () => {
    setUserAnswer('');
    setUsedHint(false);
    if (currentIndex + 1 === words.length) {
      setGameOver(true);
      setConfetti(true);  // Show confetti when game finishes
    } else {
      setCurrentIndex(currentIndex + 1);
      setShuffled(shuffleWord(words[currentIndex + 1].word));
    }
  };

  // Check answer correctness
  const checkAnswer = () => {
    if (userAnswer.toUpperCase() === words[currentIndex].word) {
      // Award points (bonus if no hint used)
      setScore(score + (usedHint ? 5 : 10));
      nextWord();
    } else {
      alert('Try again!');
    }
  };

  // Hint reduces points for this round
  const showHint = () => {
    setUsedHint(true);
  };

  // Reset game
  const resetGame = () => {
    setScore(0);
    setCurrentIndex(0);
    setUserAnswer('');
    setUsedHint(false);
    setGameOver(false);
    setConfetti(false);
    setShuffled(shuffleWord(words[0].word));
  };

  return (
    <div className="retro-container flex flex-col justify-center gap-3">
      <h2 className="retro-title">Word Unscramble Puzzle</h2>

      

      {!gameOver ? (
        <>
          <div className="shuffled-word">
            {shuffled.map((letter, i) => (
              <span key={i} className="letter-box">{letter}</span>
            ))}
          </div>

          <input
            type="text"
            className="answer-input"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value.toUpperCase())}
            maxLength={words[currentIndex].word.length}
            placeholder="Type your answer"
          />

          <div className="controls">
            <button onClick={checkAnswer}>Submit</button>
            <button onClick={showHint} disabled={usedHint}>Hint</button>
          </div>

          {usedHint && <p className="hint-text">Hint: {words[currentIndex].hint}</p>}

          <p className="score-text">Score: {score}</p>
          <p className="progress-text">
            Word {currentIndex + 1} / {words.length}
          </p>
        </>
      ) : (
        <>
          <h3>Congratulations! You completed all words.</h3>
          <p>Your final score is: {score}</p>
          <button className='border bg-sky-800 p-0' onClick={resetGame}>Play Again</button>
        </>
      )}
    </div>
  );
}
