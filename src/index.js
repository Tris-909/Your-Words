import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { store } from "redux/store";
import { Provider } from "react-redux";
import "./theme/theme.css";

import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

ReactDOM.render(
  <ChakraProvider>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ChakraProvider>,
  document.getElementById("root")
);
