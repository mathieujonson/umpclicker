import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../App";
import "./home.scss";

export const Home = () => {
  const { dispatch } = useContext(GlobalContext);
  const [recentGames, setRecentGames] = useState([]);

  useEffect(() => {
    dispatch({ type: "CLEAR_TEAMS" });

    fetch("https://umpclicker.com/api/games").then(response => {
      response.json().then(json => {
        setRecentGames(json);
      });
    });
  }, [dispatch, setRecentGames]);

  return (
    <div className="home">
      <h1>Ready for the game?</h1>
      <Link className="primary-button" to="/teams">
        Pick Teams!
      </Link>
      <h2>Current games:</h2>
      <ul>
        {recentGames.map((game, index) => (
          <li key={index}>
            {game.homeTeam} vs {game.awayTeam}
          </li>
        ))}
      </ul>
    </div>
  );
};
