import { Link } from "react-router-dom";

import './App.css'

const Home = () => {
  return (
    <div className="home-container">
      <Link to="/game"><button className="btn">Começar jogo</button></Link>
    </div>
  )
};

export default Home;