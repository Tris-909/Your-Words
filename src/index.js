import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { store } from "redux/store";
import { Provider } from "react-redux";
import "./theme/theme.css";
import Amplify from "aws-amplify";
import awsExports2 from "./aws-exports-env";

const ENV = process.env.REACT_APP_DEV_ENV;
Amplify.configure(awsExports2[ENV]);

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
