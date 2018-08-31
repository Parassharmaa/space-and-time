import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import TimeMap from "./TimeMap";
import Dashboard from "./Dashboard";
import {AuthGaurd} from "../hoc";

const Routes = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/mongols" component={TimeMap} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/dashboard" component={AuthGaurd(Dashboard)} />
    </Switch>
  </main>
);

export default Routes;
