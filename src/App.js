import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { PageHeader } from "./shared/PageHeader";

const App = () => (
  <BrowserRouter>
    <div className="app">
      <PageHeader />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
