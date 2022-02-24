import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'
import { Progress } from './components/Progress';

const availableAlphabet = 'ABCDEFGHIJLMNOPQRSTUVZ'.split('');

const INITIAL_PRE_GAME_COUNTER = 5;
const INITIAL_GAME_FREE_COUNTER = 120;
const INITIAL_GAME_STOPED_COUNTER = 120;

function Game() {

  const navigate = useNavigate();

  const [availableLetters, setAvailableLetters] = useState(availableAlphabet);
  const [currentLetter, setCurrentLetter] = useState('');

  const [preGameCounter, setPreGameCounter] = useState(INITIAL_PRE_GAME_COUNTER);
  const [timeAmount, setTimeAmount] = useState(-1);
  const [stopTimeAmount, setStopTimeAmount] = useState(-1);

  const startGame = () => {
    sortLetter();
    setTimeAmount(INITIAL_GAME_FREE_COUNTER);
  }

  const sortLetter = () => {
    const index = Math.floor(Math.random() * availableLetters.length);
    const letter = availableLetters[index];

    setCurrentLetter(letter);
    setAvailableLetters(availableLetters.filter(l => l !== letter));
  };

  const stop = () => {
    alert('STOOOP!');
    setPreGameCounter(-1);
    setTimeAmount(-1);
    setStopTimeAmount(-1);
  };

  const newGameHandle = () => {
    confirm('Deseja iniciar um novo jogo?') && navigate('/');
  }

  useEffect(() => {
    if (preGameCounter === 0) {
      startGame();
    }

    if (preGameCounter > 0) {
      setTimeout(() => {
        setPreGameCounter((oldState) => oldState - 1);
      }, 1000);
    }
  }, [preGameCounter])

  useEffect(() => {
    if(timeAmount === 0) {
      setStopTimeAmount(INITIAL_GAME_STOPED_COUNTER);
    }

    if (timeAmount > 0) {
      setTimeout(() => {
        setTimeAmount((oldState) => oldState - 1);
      }, 1000);
    }
  }, [timeAmount])

  useEffect(() => {
    if(stopTimeAmount === 0) {
      stop()
    }

    if (stopTimeAmount > 0) {
      setTimeout(() => {
        setStopTimeAmount((oldState) => oldState - 1);
      }, 1000);
    }
  }, [stopTimeAmount])

  return (
    <div className="App">
      <div className="game-container">
        { preGameCounter > 0 ? 
          <p className="letter-current"><b>{ preGameCounter }</b></p>
        : (
          <>
            <div className="letter-current">
              <p><b>{ currentLetter }</b></p>
            </div>

            { timeAmount > 0 && (
              <>
                <Progress 
                  percent={100 - (timeAmount / INITIAL_GAME_FREE_COUNTER * 100)}
                  type="free"
                />
                <div className="btn-container">
                  <button className="btn" disabled>STOP</button>
                </div>
              </>
            )
            }
            { stopTimeAmount > 0 && 
              <>
                <Progress 
                  percent={stopTimeAmount / INITIAL_GAME_STOPED_COUNTER * 100}
                  type="stop"
                />
                <div className="btn-container">
                  <button className="btn btn-danger" onClick={() => stop()}>STOP</button>
                </div>
              </>
            }
      
            { timeAmount < 1 && stopTimeAmount < 1  && (
              <div className="btn-container">
                <button className="btn" onClick={() => setPreGameCounter(INITIAL_PRE_GAME_COUNTER)}>NOVA LETRA</button>
                <button className="btn" onClick={newGameHandle}>NOVO JOGO</button>
              </div>
            )}
          </>
        ) }
      </div>
    </div>
  )
}

export default Game
