import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./app.scss";
import { Home } from "./pages/Home";
import { PageFooter } from "./shared/PageFooter";
import { PageHeader } from "./shared/PageHeader";

const App = () => (
  <BrowserRouter>
    <div className="app">
      <PageHeader />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
      <PageFooter />
    </div>
  </BrowserRouter>
);

export default App;
