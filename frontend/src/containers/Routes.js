import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import TimeMap from "./TimeMap";

const Routes = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/mongols" component={TimeMap} />
    </Switch>
  </main>
);

export default Routes;
