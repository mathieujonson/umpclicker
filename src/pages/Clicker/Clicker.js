import React, { createContext, useCallback, useEffect, useReducer, useRef } from "react";
import "./clicker.scss";
import { Counter } from "./Counter";
import { clickerReducer } from "./reducer";

const initialState = {
  balls: 0,
  strikes: 0,
  outs: 0,
  inning: 1,
  halfInning: "top",
  home: 0,
  away: 0,
};

export const ClickerContext = createContext();

export const Clicker = ({ match }) => {
  const [state, dispatch] = useReducer(clickerReducer, initialState);
  let didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      const gameId = match.params.gameId;
      const body = {
        gameId,
        ...state,
      };

      fetch(`https://umpclicker.com/api/game`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
    }
    didMount.current = true;
  });

  return (
    <ClickerContext.Provider value={{ state, dispatch }}>
      <div className="content-container clicker">
        <h1>Current Inning</h1>
        <div className="inning">
          <Counter label="Balls" />
          <Counter label="Strikes" />
          <Counter label="Outs" />
          <button className="clear-button" onClick={useCallback(() => dispatch({ type: "CLEAR_INNING" }), [])}>
            Clear Inning
          </button>
          <button className="clear-button" onClick={useCallback(() => dispatch({ type: "CLEAR_COUNT" }), [])}>
            Clear Count
          </button>
        </div>

        <h1>Game</h1>
        <div className="game">
          <Counter label="Home" />
          <Counter label="Away" />
          <Counter label="Inning" className={state.halfInning} />
        </div>
      </div>
    </ClickerContext.Provider>
  );
};
