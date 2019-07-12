import React, { useEffect, useState } from "react";
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

  return (
    <div className="current-games">
      <h2>Current games:</h2>
      {loading ? (
        <div className="waiter" />
      ) : (
        <ul>
          {recentGames.map((game, index) => (
            <li key={index}>
              {game.homeTeam} vs {game.awayTeam}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
