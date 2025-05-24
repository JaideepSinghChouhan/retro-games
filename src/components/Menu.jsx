import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import "../styles/Menu.css"; // 🔗 Link to external CSS
// import welcomeSound from "../assets/welcome.mp3";
import arcade from "../assets/arcadebg.png";

const gamesList = [
  { name: "Dice Roller", path: "/dice-roller" },
  { name: "Memory Match", path: "/memory-match" },
  { name: "Trivia Quiz", path: "/trivia-quiz" },
  { name: "Word Unscramble", path: "/word-unscramble" },
  { name: "Grid Puzzle", path: "/grid-puzzle" },
  { name: "Idle Clicker", path: "/idle-clicker" },
  { name: "Card Battle", path: "/card-battle" },
  { name: "Reaction Speed", path: "/reaction-speed" },
  { name: "Rock Paper Scissors", path: "/rock-paper-scissors" },
  { name: "Number Guess", path: "/number-guess" },
];

export default function Menu() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const gameNameRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }

    const utterance = new SpeechSynthesisUtterance("Welcome to Retro Games");
    utterance.lang = "en-US";
    utterance.rate = 1;
    speechSynthesis.speak(utterance);

    const timer = setTimeout(() => {
      setShowMenu(true);
      gsap.fromTo(gameNameRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 });
    }, 3000);

    return () => {
      clearTimeout(timer);
      speechSynthesis.cancel();
    };
  }, []);

  const nextGame = () => {
    setCurrentIndex((prev) => (prev + 1) % gamesList.length);
  };

  const prevGame = () => {
    setCurrentIndex((prev) => (prev - 1 + gamesList.length) % gamesList.length);
  };

  const currentGame = gamesList[currentIndex];

  return (
    <div className="menu-container">
      {/* <audio ref={audioRef} src={welcomeSound} /> */}
      <img src={arcade} alt="" className="menu-background" />

      {!showMenu ? (
        <h1 className="loading-text">Loading...</h1>
      ) : (
        <>
          <h2 ref={gameNameRef} className="game-name">
            {currentGame.name}
          </h2>
          <div className="menu-controls">
            <button onClick={prevGame} className="arrow-button">⟨</button>
            <button onClick={() => navigate(currentGame.path)} className="play-button">Play</button>
            <button onClick={nextGame} className="arrow-button">⟩</button>
          </div>
        </>
      )}
    </div>
  );
}
