import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { userHasRole } from "../../auth/actions/auth";
import AppRoute from "./AppRoute";

const PrivateRoute = props => {
  const auth = useSelector(state => state.auth);

  const userAuthorized = () => auth.isAuthenticated && userHasRole(props.roles);

  return userAuthorized() ? <AppRoute {...props} /> : <Redirect to="/login" />;
};

export default PrivateRoute;
