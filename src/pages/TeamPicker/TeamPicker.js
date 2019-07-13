import React, { useCallback, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../App";
import { createGame } from "./service";
import { TeamDropDown } from "./TeamDropDown";
import "./teamPicker.scss";

export const TeamPicker = props => {
  const [teamNames, setTeamNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state } = useContext(GlobalContext);

  useEffect(() => {
    // TODO: MOVE THIS TO SERVICE...AND RENAME SERVICE :joy:
    fetch("https://umpclicker.com/api/teams").then(response => {
      response.json().then(data => {
        setTeamNames(data);
        setLoading(false);
      });
    });
  }, []);

  const onClickHandler = useCallback(async () => {
    setLoading(true);
    const response = await createGame(state.home, state.away);
    props.history.push(`/clicker/${response.gameName}+${response.startTime}`);
  }, [props.history, state.home, state.away]);

  return (
    <div className="content-container team-picker">
      {loading ? (
        <div className="waiter" />
      ) : (
        <>
          <h1>Who's playing today?</h1>
          <h2>Home</h2>
          <TeamDropDown teamNames={teamNames} team="home" />
          <h2>Away</h2>
          <TeamDropDown teamNames={teamNames} team="away" />
          <button
            className="primary-button"
            onClick={onClickHandler}
            disabled={!(state.home && state.away && state.home !== state.away)}
          >
            Play Ball!
          </button>
        </>
      )}
    </div>
  );
};
