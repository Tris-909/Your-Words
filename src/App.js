import React, { useState, useEffect } from "react";
import Routes from "./Route";
import { AppContext } from "./libs/context-libs";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

function App() {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    try {
      const result = await Auth.currentAuthenticatedUser();

      if (result && (result.username || result.email)) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      history.push("/auth");
    }

    setIsLoading(false);
  };

  return (
    !isLoading && (
      <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <Routes />
      </AppContext.Provider>
    )
  );
}

export default App;
