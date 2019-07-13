import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useRef
} from "react";
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
  away: 0
};

export const ClickerContext = createContext();

export const Clicker = ({ match }) => {
  const [state, dispatch] = useReducer(clickerReducer, initialState);
  let didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      console.log("gameId", match.params.gameId);
    }
    didMount.current = false;
  });

  return (
    <ClickerContext.Provider value={{ state, dispatch }}>
      <div className="content-container clicker">
        <h2>Current Inning</h2>
        <div className="inning">
          <Counter label="Balls" />
          <Counter label="Strikes" />
          <Counter label="Outs" />
          <button
            className="clear-button"
            onClick={useCallback(() => dispatch({ type: "CLEAR_INNING" }), [])}
          >
            Clear Inning
          </button>
          <button
            className="clear-button"
            onClick={useCallback(() => dispatch({ type: "CLEAR_COUNT" }), [])}
          >
            Clear Count
          </button>
        </div>

        <h2>Game</h2>
        <div className="game">
          <Counter label="Home" />
          <Counter label="Away" />
          <Counter label="Inning" className={state.halfInning} />
        </div>
      </div>
    </ClickerContext.Provider>
  );
};
