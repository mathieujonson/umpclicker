import React, { createContext, useReducer } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./app.scss";
import { Clicker } from "./pages/Clicker";
import { Home } from "./pages/Home";
import { TeamPicker } from "./pages/TeamPicker";
import { globalReducer } from "./reducer";
import { PageFooter } from "./shared/PageFooter";
import { PageHeader } from "./shared/PageHeader";

const initialState = {
  home: "",
  away: ""
};

export const GlobalContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <div className="app">
          <PageHeader />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/teams" component={TeamPicker} />
            <Route exact path="/clicker" component={Clicker} />
          </Switch>
          <PageFooter />
        </div>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
};

export default App;
