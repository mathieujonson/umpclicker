import React from "react";
import { Link } from "react-router-dom";
import "./home.scss";

export const Home = () => (
  <div className="home">
    <h1>Ready for the game?</h1>
    <Link className="primary-button" to="/clicker">
      Play Ball!
    </Link>
  </div>
);
