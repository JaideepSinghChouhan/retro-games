import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import '../styles/SlidingPuzzle.css'

// Utility to generate shuffled puzzle tiles
const generateShuffledTiles = () => {
  let tiles;
  do {
    tiles = [...Array(15).keys()].map(n => n + 1).concat(null);
    tiles.sort(() => Math.random() - 0.5);
  } while (!isSolvable(tiles));
  return tiles;
};

// Check if the puzzle is solvable (based on inversion count)
const isSolvable = (tiles) => {
  let inversions = 0;
  for (let i = 0; i < tiles.length; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      if (tiles[i] && tiles[j] && tiles[i] > tiles[j]) inversions++;
    }
  }
  const emptyRow = Math.floor(tiles.indexOf(null) / 4);
  return (inversions + emptyRow) % 2 === 0;
};

export default function SlidingPuzzle() {
  const [tiles, setTiles] = useState(generateShuffledTiles());
  const [gameWon, setGameWon] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Check if the tiles are in the winning order
  useEffect(() => {
    const isOrdered = tiles.every((tile, i) =>
      i === 15 ? tile === null : tile === i + 1
    );
    setGameWon(isOrdered);
  }, [tiles]);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // Handle tile click
  const handleTileClick = (index) => {
    const emptyIndex = tiles.indexOf(null);
    const validMoves = [
      emptyIndex - 1, emptyIndex + 1,
      emptyIndex - 4, emptyIndex + 4
    ];

    if (validMoves.includes(index) &&
        Math.abs(index - emptyIndex) !== 3) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
    }
  };

  const resetGame = () => {
    setTiles(generateShuffledTiles());
    setGameWon(false);
  };

  return (
    <div className="retro-container">
      <h2 className="retro-title">Sliding Puzzle</h2>

      <div className="grid-4x4 puzzle-grid">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`tile ${tile === null ? 'empty' : ''}`}
            onClick={() => handleTileClick(index)}
          >
            {tile}
          </div>
        ))}
      </div>

      {gameWon && (
        <>
          <Confetti width={windowSize.width} height={windowSize.height} />
          <div className="win-message">
            🎉 You solved it!
            <button onClick={resetGame}>Play Again</button>
          </div>
        </>
      )}

      {!gameWon && (
        <button onClick={resetGame} className="reset-button">Reset</button>
      )}
    </div>
  );
}