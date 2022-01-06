import React from "react";
import { Switch } from "react-router-dom";

import PrivateRoute from "../../modules/common/components/PrivateRoute";

import UsersList from "../../modules/admin/users/components/UsersList";
import CreateEditUser from "../../modules/admin/users/components/CreateEditUser";

const UserRoutes = () => (
  <Switch>
    <PrivateRoute
      exact
      path="/admin/users"
      roles={["admin"]}
      component={UsersList}
    />
    <PrivateRoute
      exact
      path="/admin/users/add"
      roles={["admin"]}
      component={CreateEditUser}
    />
    <PrivateRoute
      exact
      path="/admin/users/edit/:id"
      roles={["admin"]}
      component={CreateEditUser}
    />
  </Switch>
);

export default UserRoutes;
