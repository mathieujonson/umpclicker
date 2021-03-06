import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../App";
import { CurrentGames } from "./CurrentGames";
import "./home.scss";

export const Home = () => {
  const { dispatch } = useContext(GlobalContext);

  useEffect(() => {
    dispatch({ type: "CLEAR_GAME" });
  }, [dispatch]);

  return (
    <div className="content-container home">
      <h1>Ready for the game?</h1>
      <Link className="primary-button" to="/teams">
        Pick Teams!
      </Link>
      <CurrentGames />
    </div>
  );
};
