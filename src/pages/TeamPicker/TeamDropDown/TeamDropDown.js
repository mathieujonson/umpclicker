import React, { useCallback, useContext } from "react";
import { GlobalContext } from "../../../App";
import "./teamDropDown.scss";

export const TeamDropDown = ({ teamNames, team }) => {
  const { state, dispatch } = useContext(GlobalContext);

  const changeHandler = useCallback(
    event => {
      document.activeElement.blur();
      dispatch({
        type: `UPDATE_${team.toUpperCase()}`,
        payload: event.target.value
      });
    },
    [dispatch, team]
  );

  const errorClass =
    state.home !== "" && state.home === state.away ? " error" : "";

  return (
    <div className={`team-drop-down${errorClass}`}>
      <select onChange={changeHandler} value={state[team]}>
        <option>Select a team</option>
        {teamNames.map((name, index) => (
          <option key={index}>{name}</option>
        ))}
      </select>
    </div>
  );
};
