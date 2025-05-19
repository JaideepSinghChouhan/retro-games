import React, { useState, useEffect } from 'react';
import '../styles/MemoryGame.css'
import confetti from 'canvas-confetti';

// Array of unique icons for the game
const icons = [
  '☀', '☁', '☂', '☃', '☄',
  '★', '☔', '☕', '☠', '☢',
  '☯', '☺', '♠', '♣', '♥',
  '♦', '✈', '✉', '✊', '✋',
  '✨', '❄', '❤', '⚡', '⚽'
];

// Function to generate a shuffled 5x5 grid with 12 pairs and 1 extra unmatched icon
const generateShuffledGrid = () => {
  const selected = icons.slice(0, 12); // Select 12 unique icons for pairs
  const pairIcons = [...selected, ...selected]; // Duplicate icons to form pairs
  const remaining = icons.find(icon => !selected.includes(icon)); // Add 1 extra icon to make 25 cards
  const fullSet = [...pairIcons, remaining];

  return fullSet
    .sort(() => Math.random() - 0.5) // Shuffle the icons
    .map((icon, index) => ({
      id: index,
      icon,
      matched: false,
      flipped: false
    }));
};




export default function MemoryGame() {
  const [grid, setGrid] = useState(generateShuffledGrid()); // Game grid state
  const [flipped, setFlipped] = useState([]); // Stores indices of flipped cards
  const [matchedCount, setMatchedCount] = useState(0); // Count of matched pairs

  useEffect(() => {
    if (matchedCount === 12) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    }
  }, [matchedCount]);

  // Handle clicking on a card
  const handleClick = (index) => {
    // Prevent clicking if two cards are already flipped or the card is already flipped/matched
    if (flipped.length === 2 || grid[index].flipped || grid[index].matched) return;

    const newGrid = [...grid];
    newGrid[index].flipped = true;

    const newFlipped = [...flipped, index];
    setGrid(newGrid);
    setFlipped(newFlipped);
  };

  // Check for a match when two cards are flipped
  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      const firstCard = grid[first];
      const secondCard = grid[second];

      if (firstCard.icon === secondCard.icon) {
        // If icons match, mark both cards as matched
        const updated = grid.map((card, i) =>
          i === first || i === second ? { ...card, matched: true } : card
        );
        setGrid(updated);
        setMatchedCount((prev) => prev + 1);
      } else {
        // If not a match, flip the cards back after a delay
        setTimeout(() => {
          const updated = grid.map((card, i) =>
            i === first || i === second ? { ...card, flipped: false } : card
          );
          setGrid(updated);
        }, 500);
      }
      setFlipped([]); // Reset flipped state
    }
  }, [flipped, grid]);

  // Reset the game to start over
  const resetGame = () => {
    setGrid(generateShuffledGrid());
    setFlipped([]);
    setMatchedCount(0);
  };

  return (
   <div className="memory-container">
  <h2 className="memory-title">Memory Match</h2>

  <div className="memory-grid grid-5x5">
    {grid.map((card, index) => (
      <div
        key={card.id}
        className={`memory-card ${card.flipped || card.matched ? 'flipped' : ''}`}
        onClick={() => handleClick(index)}
      >
        <span>{card.flipped || card.matched ? card.icon : '?'}</span>
      </div>
    ))}
  </div>

  <div className="memory-info">
    <p>Matches: {matchedCount} / 12</p>
    {matchedCount === 12 && <button onClick={resetGame}>Play Again</button>}
  </div>
</div>

  );
}
