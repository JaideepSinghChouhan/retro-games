import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
// import welcomeSound from "../assets/welcome.mp3";

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
  const [showMenu, setShowMenu] = useState(false);
  const containerRef = useRef(null);
  const bubblesRef = useRef([]);
  const audioRef = useRef(null);
  const navigate = useNavigate();

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
      gsap.fromTo(
        bubblesRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          ease: "back.out(1.7)",
          duration: 0.7,
        }
      );
    }, 3500);

    return () => {
      clearTimeout(timer);
      speechSynthesis.cancel();
    };
  }, []);

  const radius = 150;
  const centerX = 0;
  const centerY = 0;

  const angleStep = (2 * Math.PI) / gamesList.length;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        width: "400px",
        height: "400px",
        transform: "translate(-50%, -50%)",
        fontFamily: "'Press Start 2P', cursive",
        backgroundColor: "#121212",
        border: "3px dashed #ff00e6",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "visible",
        userSelect: "none",
      }}
    >
      {/* <audio ref={audioRef} src={welcomeSound} /> */}

      {!showMenu && (
        <h1
          style={{
            color: "#00ff99",
            textShadow: "0 0 8px #00ff99",
            fontSize: "24px",
            textAlign: "center",
            width: "100%",
            position: "absolute",
          }}
        >
          Loading...
        </h1>
      )}

      {showMenu && (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          {gamesList.map((game, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            return (
              <div
                key={game.name}
                ref={(el) => (bubblesRef.current[i] = el)}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "100px",
                  height: "100px",
                  marginLeft: "-50px",
                  marginTop: "-50px",
                  backgroundColor: "#00ff99",
                  borderRadius: "50%",
                  boxShadow: "0 0 12px #00ff99",
                  color: "#121212",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "12px",
                  fontWeight: "700",
                  textAlign: "center",
                  padding: "10px",
                  cursor: "pointer",
                  userSelect: "none",
                  transform: `translate(${x}px, ${y}px)`,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  willChange: "transform",
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1.2,
                    boxShadow: "0 0 20px #ff00e6",
                    duration: 0.3,
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    boxShadow: "0 0 12px #00ff99",
                    duration: 0.3,
                  });
                }}
                onClick={() => {
                  navigate(game.path);
                }}
              >
                {game.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
