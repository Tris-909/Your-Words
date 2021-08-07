import React from "react";
import UnauthenticatedRoute from "routes/UnAuthenticatedRoute";
import PrivateRoute from "routes/PrivateRoutes";
import { Switch } from "react-router-dom";
import { useAppContext } from "libs/context-libs";
import { BasicLayout, Login, Home, NotFound } from "containers";

export default function Routes() {
  const { isAuthenticated } = useAppContext();

  return (
    <Switch>
      <UnauthenticatedRoute exact path="/auth">
        <Login />
      </UnauthenticatedRoute>
      <BasicLayout>
        <Switch>
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            component={Home}
            path="/"
          />
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            component={NotFound}
          />
        </Switch>
      </BasicLayout>
    </Switch>
  );
}
