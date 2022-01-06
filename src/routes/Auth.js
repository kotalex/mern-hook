import React from "react";
import { Switch } from "react-router-dom";

import AuthLayout from "../layouts/Auth";
import PrivateRoute from "../modules/common/components/PrivateRoute";

import AppRoute from "../modules/common/components/AppRoute";
import Login from "../modules/auth/components/Login";
import Register from "../modules/auth/components/Register";
import ForgotPassword from "../modules/auth/components/ForgotPassword";
import ResetPassword from "../modules/auth/components/ResetPassword";
import ChangePassword from "../modules/auth/components/ChangePassword";
import Profile from "../modules/auth/components/Profile";

const AuthRoutes = () => (
  <Switch>
    <AppRoute exact path="/login" layout={AuthLayout} component={Login} />
    <AppRoute exact path="/register" layout={AuthLayout} component={Register} />
    <AppRoute
      exact
      path="/forgot-password"
      layout={AuthLayout}
      component={ForgotPassword}
    />
    <AppRoute
      exact
      path="/reset-password/:token"
      layout={AuthLayout}
      component={ResetPassword}
    />
    <PrivateRoute exact path="/profile" component={Profile} />
    <PrivateRoute exact path="/change-password" component={ChangePassword} />
  </Switch>
);

export default AuthRoutes;
