import React from "react";
import { Switch } from "react-router-dom";

import AppRoute from "../modules/common/components/AppRoute";
import Home from "../modules/home/components/Home";

const MainRoutes = () => (
  <Switch>
    <AppRoute exact path="/" component={Home} />
  </Switch>
);

export default MainRoutes;
