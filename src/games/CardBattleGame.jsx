import React, { useState } from 'react';
import Confetti from 'react-confetti';
import '../styles/CardBattle.css'

export default function CardBattleGame() {
  const [playerHP, setPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);
  const [message, setMessage] = useState('Battle Start!');
  const [showConfetti, setShowConfetti] = useState(false);

  const attack = () => {
    const playerDmg = Math.floor(Math.random() * 15) + 5;
    const enemyDmg = Math.floor(Math.random() * 12) + 3;

    setEnemyHP(prev => Math.max(0, prev - playerDmg));
    setPlayerHP(prev => Math.max(0, prev - enemyDmg));
    setMessage(`You dealt ${playerDmg} damage. Enemy dealt ${enemyDmg} damage.`);

    if (enemyHP - playerDmg <= 0 && playerHP - enemyDmg > 0) {
      setMessage('Victory! You defeated the enemy.');
      setShowConfetti(true);
    } else if (playerHP - enemyDmg <= 0 && enemyHP - playerDmg > 0) {
      setMessage('Defeat! You were defeated by the enemy.');
    } else if (enemyHP - playerDmg <= 0 && playerHP - enemyDmg <= 0) {
      setMessage("It's a draw! Both fell.");
    }
  };

  const resetGame = () => {
    setPlayerHP(100);
    setEnemyHP(100);
    setMessage('Battle Start!');
    setShowConfetti(false);
  };

  return (
    <div className="retro-container flex flex-col justify-center items-center gap-5">
      {showConfetti && <Confetti />}
      <h2 className="retro-title">Card Battle</h2>

      <div className="health-bars">
        <p className="health player">Player HP: {playerHP}</p>
        <p className="health enemy">Enemy HP: {enemyHP}</p>
      </div>

      <div className="card-battle-actions flex gap-5 justiy-center">
        <button className="attack-btn bg-red-900 rounded border p-2" onClick={attack}>Attack</button>
        <button className="reset-btn bg-sky-900 rounded border p-2" onClick={resetGame}>Reset</button>
      </div>

      <p className="battle-message">{message}</p>
    </div>
  );
}
