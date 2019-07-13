import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./currentGames.scss";

export const CurrentGames = () => {
  const [recentGames, setRecentGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://umpclicker.com/api/games").then(response => {
      response.json().then(json => {
        setRecentGames(json);
        setLoading(false);
      });
    });
  }, [setRecentGames, setLoading]);

  // TODO: possible cleanup opportunity...the nested ternary smells
  return (
    <div className="current-games">
      <h2>Current games:</h2>
      {loading ? (
        <div className="waiter" />
      ) : (
        <ul>
          {recentGames.length ? (
            recentGames.map((game, index) => (
              <li key={index}>
                {game.homeTeam} vs {game.awayTeam}
              </li>
            ))
          ) : (
            <li>
              No games playing. <br />
              <Link to="/teams">Pick teams!</Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
