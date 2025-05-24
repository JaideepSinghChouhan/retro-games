import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
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
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
        maxWidth: "500px",
        height: "100%",
        fontFamily: "'Press Start 2P', cursive",
        textAlign: "center",
        userSelect: "none",
      }}
    >
      {/* <audio ref={audioRef} src={welcomeSound} /> */}
      <img
        src={arcade}
        alt=""
        style={{
          position: "absolute",
          left:"0px",
          zIndex: -1,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "20px",
        }}
      />

      {!showMenu ? (
        <h1 style={{ position: "absolute",
                    top: '20%',
                    left: "30%",
                    color: "#00ff99",   
                    textShadow: "0 0 8px #00ff99", 
                    fontSize: "24px", 
                    marginTop: "180px" }}>
          Loading...
        </h1>
      ) : (
        <>
          <h2
            ref={gameNameRef}
            style={{
              position: "absolute",
              top: "34%",
              left: "35%",    
              width:"140px",         
              color: "#00ff99",
              textShadow: "0 0 6px #00ff99",
              fontSize: "18px",
            }}
          >
            {currentGame.name}
          </h2>

          <div style={{  
              position: "absolute",
              top: '45%',
              left: "25%",
              display: "flex",
              justifyContent: "center",
              gap: "20px", 
              marginBottom: "20px" }}>
            <button onClick={prevGame} style={arrowStyle}>⟨</button>
            <button onClick={() => navigate(currentGame.path)} style={playButtonStyle}>Play</button>
            <button onClick={nextGame} style={arrowStyle}>⟩</button>
          </div>
        </>
      )}
    </div>
  );
}

const playButtonStyle = {
  backgroundColor: "#00ff99",
  color: "#121212",
  border: "none",
  borderRadius: "12px",
  padding: "12px 24px",
  fontSize: "14px",
  fontWeight: "bold",
  boxShadow: "0 0 12px #00ff99",
  cursor: "pointer",
  transition: "0.3s",
};

const arrowStyle = {
  backgroundColor: "#ff00e6",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  fontSize: "20px",
  boxShadow: "0 0 10px #ff00e6",
  cursor: "pointer",
  transition: "0.3s",
};
