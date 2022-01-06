import React from "react";
import { Route } from "react-router-dom";
import MainLayout from "../../../layouts/Main";

const AppRoute = ({
  component: Component,
  layout: Layout = MainLayout,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      <Layout {...props}>
        <Component {...props} />
      </Layout>
    )}
  />
);

export default AppRoute;
