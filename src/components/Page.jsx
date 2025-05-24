import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Menu from "./Menu";

import bg  from '../assets/sunset.png'
import CardBattleGame from '../games/CardBattleGame'
import DiceRoller from '../games/DiceRoller'
import IdleClicker from '../games/IdleClicker'
import MemoryGame from '../games/MemoryGame'
import NumberGuess from '../games/NumberGuess'
import ReactionSpeedGame from '../games/ReactionSpeedGame'
import RockPaperScissors from '../games/RockPaperScissor'
import SlidingPuzzle from '../games/SlidingPuzzle'
import TriviaGame from '../games/TriviaGame'
import WordUnscramble from '../games/WordUnscramble'
export default function Page(){
    return(
        <div className="relative w-screen h-screen bg-blue text-xl">
            <img className='w-full h-full object-fill' src={bg} alt="" />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/dice-roller" element={<DiceRoller />} />
        <Route path="/memory-match" element={<MemoryGame />} />
        <Route path="/trivia-quiz" element={<TriviaGame />} />
        <Route path="/word-unscramble" element={<WordUnscramble />} />
        <Route path="/grid-puzzle" element={<SlidingPuzzle />} />
        <Route path="/idle-clicker" element={<IdleClicker />} />
        <Route path="/card-battle" element={<CardBattleGame />} />
        <Route path="/reaction-speed" element={<ReactionSpeedGame />} />
        <Route path="/rock-paper-scissors" element={<RockPaperScissors />} />
        <Route path="/number-guess" element={<NumberGuess />} />
      </Routes>
    </Router>

            </div>
        </div>
    )
}
