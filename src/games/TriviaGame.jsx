import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import '../styles/TriviaGame.css';

const rounds = [
  {
    name: 'Round 1: Easy',
    questions: [
      {
        question: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        answer: '4',
      },
      {
        question: 'What color is the sky on a clear day?',
        options: ['Red', 'Blue', 'Green', 'Yellow'],
        answer: 'Blue',
      },
    ],
  },
  {
    name: 'Round 2: Medium',
    questions: [
      {
        question: 'Which gas do plants absorb from the atmosphere?',
        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
        answer: 'Carbon Dioxide',
      },
      {
        question: 'Which planet has the most moons?',
        options: ['Earth', 'Saturn', 'Mars', 'Venus'],
        answer: 'Saturn',
      },
    ],
  },
  {
    name: 'Round 3: Hard',
    questions: [
      {
        question: 'What is the smallest prime number?',
        options: ['0', '1', '2', '3'],
        answer: '2',
      },
      {
        question: 'Who developed the theory of relativity?',
        options: ['Isaac Newton', 'Marie Curie', 'Albert Einstein', 'Galileo'],
        answer: 'Albert Einstein',
      },
    ],
  },
];

export default function TriviaGame() {
  const [roundIndex, setRoundIndex] = useState(0);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(5);
  const [showSummary, setShowSummary] = useState(false);
  const [perfectRounds, setPerfectRounds] = useState([]);

  const currentRound = rounds[roundIndex];
  const totalQuestions = currentRound.questions.length;
  const allRoundsCompleted = roundIndex === rounds.length;

  // Countdown timer
  useEffect(() => {
    if (showSummary || allRoundsCompleted) return;

    if (timer === 0) {
      handleNext();
      return;
    }

    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, showSummary, allRoundsCompleted]);

  // Handle next question or show summary
  const handleNext = () => {
    const correct = currentRound.questions[current].answer;
    if (selected === correct) {
      setScore(s => s + 1);
    }

    if (current + 1 === totalQuestions) {
      setShowSummary(true);
      if (selected === correct && score + 1 === totalQuestions) {
        setPerfectRounds(r => [...r, roundIndex]);
      }
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setTimer(5);
    }
  };

  // Proceed to next round or restart
  const handleNextRound = () => {
    setRoundIndex(i => i + 1);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setTimer(5);
    setShowSummary(false);
  };

  const handleRestart = () => {
    setRoundIndex(0);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setTimer(15);
    setShowSummary(false);
    setPerfectRounds([]);
  };

  return (
    <div className="retro-container">
      <h2 className="retro-title">Trivia Quiz</h2>

      {/* 🎊 Confetti on perfect round */}
      {showSummary && perfectRounds.includes(roundIndex) && <Confetti />}

      {/* 🏆 Celebration on clearing all rounds perfectly */}
      {allRoundsCompleted && perfectRounds.length === rounds.length && <Confetti numberOfPieces={500} recycle={false} />}

      {!showSummary && !allRoundsCompleted ? (
        <div className="question-card">
          <h3>{currentRound.name}</h3>
          <h4>{currentRound.questions[current].question}</h4>
          <div className="options">
            {currentRound.questions[current].options.map(opt => (
              <button
                key={opt}
                className={`option-btn ${selected === opt ? 'selected' : ''}`}
                onClick={() => setSelected(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="footer">
            <p>Time left: {timer}s</p>
            <button className="next-btn" onClick={handleNext} disabled={!selected}>
              {current === totalQuestions - 1 ? 'Finish Round' : 'Next'}
            </button>
          </div>
        </div>
      ) : allRoundsCompleted ? (
        <div className="summary">
          <h3>🏁 All Rounds Completed!</h3>
          <p>Perfect Rounds: {perfectRounds.length} / {rounds.length}</p>
          {perfectRounds.length === rounds.length && <p className="perfect">🎉 Perfect Game! 🎉</p>}
          <button onClick={handleRestart}>Restart</button>
        </div>
      ) : (
        <div className="summary">
          <h3>{currentRound.name} Complete!</h3>
          <p>Your Score: {score} / {totalQuestions}</p>
          {perfectRounds.includes(roundIndex) && <p className="perfect">🎯 Perfect Round!</p>}
          <button className='transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 ...' onClick={handleNextRound}>Next Round</button>
        </div>
      )}
    </div>
  );
}
