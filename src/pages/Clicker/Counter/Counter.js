import React, { useCallback, useContext } from "react";
import { ClickerContext } from "../Clicker";
import "./counter.scss";

export const Counter = ({ label, className }) => {
  const { state, dispatch } = useContext(ClickerContext);
  const stateKey = label.toLowerCase();

  const minusClickHandler = useCallback(
    () => dispatch({ type: `MINUS_${stateKey.toUpperCase()}` }),
    [dispatch, stateKey]
  );

  const addClickHandler = useCallback(
    () => dispatch({ type: `ADD_${stateKey.toUpperCase()}` }),
    [dispatch, stateKey]
  );

  const useClass = className ? ` ${className}` : "";

  return (
    <div className={`counter${useClass}`}>
      <h4>{label}</h4>
      <div className="count-container">
        <button className="plus-button" onClick={addClickHandler}>
          +
        </button>
        <div className="count-number">{state[stateKey]}</div>
        <button className="minus-button" onClick={minusClickHandler}>
          -
        </button>
      </div>
    </div>
  );
};
