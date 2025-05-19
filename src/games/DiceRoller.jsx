import '../styles/DiceRoller.css'
import React, { useState } from 'react';
import '../styles/GameStyle.css';

const DiceRoller = () => {
  const [side, setSide] = useState(Math.floor(Math.random()*6+1));
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (isRolling) return;
    const result = Math.floor(Math.random() * 6) + 1;
    setIsRolling(true);
    setSide(result);

    setTimeout(() => {
      setIsRolling(false);
    }, 3000); // match animation duration
  };

  return (
    <div className="retro-box text-center p-6 relative flex flex-col gap-5">
      <h1 className="text-4xl neon absolute top-25">Dice Roller</h1>
      <div className='text-red-500 mb-3'>
        Click To Roll !!
      </div>

      <div
        id="dice"
        className={isRolling ? 'reRoll' : ''}
        data-side={side}
        onClick={rollDice}
      >
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`sides side-${i + 1}`}>
            {[...Array(i + 1)].map((_, j) => (
              <span key={j} className={`dot dot-${j + 1}`}></span>
            ))}
          </div>
        ))}
      </div>

      <div id="diceResult" className={`dice-result ${isRolling ?'reveal' : 'hide' }`}>
        You rolled a {side}
      </div>
    </div>
  );
};

export default DiceRoller;
