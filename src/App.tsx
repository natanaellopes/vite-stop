import { Routes, Route, Link } from "react-router-dom";
import Game from './Game';
import Home from './Home';

import './App.css'

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  )
}

export default App
