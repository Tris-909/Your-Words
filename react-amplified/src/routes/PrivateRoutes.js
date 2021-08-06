import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      render={(props) =>
        isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/auth", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
