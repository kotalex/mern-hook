import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import MainRoutes from "./Main";
import AuthRoutes from "./Auth";
import AdminRoutes from "./admin/Admin";

const Routes = () => (
  <Router>
    <MainRoutes />
    <AuthRoutes />
    <AdminRoutes />
  </Router>
);

export default Routes;
