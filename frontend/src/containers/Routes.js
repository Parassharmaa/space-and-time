import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Mongols from "./Mongols";

const Routes = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/mongols" component={Mongols} />
    </Switch>
  </main>
);

export default Routes;
