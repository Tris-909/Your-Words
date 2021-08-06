import React, { useState, useEffect } from "react";
import Routes from "./Route";
import { AppContext } from "./libs/context-libs";
import { Auth } from "aws-amplify";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    try {
      await Auth.currentSession();
      setIsAuthenticated(true);
    } catch (error) {
      if (error !== "No Current User") {
        alert(error);
      }
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
