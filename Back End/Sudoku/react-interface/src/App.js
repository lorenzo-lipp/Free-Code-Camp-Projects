import { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board.jsx';
import Keyboard  from './components/Keyboard.jsx';

export default function App() {
  const [keysVisible, setKeysVisible] = useState(false);
  const [activeCell, setActiveCell] = useState("");
  const [game, setGame] = useState(".................................................................................");
  const [solution, setSolution] = useState(".................................................................................");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/newgame")
      .then(response => response.json())
      .then(data => {
        setGame(data.game);
        setSolution(data.solution);
        setIsLoading(false);
        window.dispatchEvent(new Event('resize'));
      })
  }, [])
  
  const selectCell = (cell) => {
    if (activeCell === cell) {
      setKeysVisible(false);
      setActiveCell("");
    } else {
      setKeysVisible(true);
      setActiveCell(cell);
    }
  }
  const setCell = (value) => {
    if (!Number.isNaN(activeCell)) {
      if (game[activeCell] == value) value = ".";
      setGame(game.slice(0, activeCell) + value + game.slice(activeCell + 1)); 
      setActiveCell("");
      setKeysVisible(false);
    }
  }

  return (
    <main>
      <div className="center">
        {
          isLoading ? "Loading..." : (
            <>
              <Board game={game} selectCell={selectCell} activeCell={activeCell} solution={solution} />
              <Keyboard show={keysVisible} setCell={setCell} />
            </>
          )
        }
      </div>
    </main>
  )
}
