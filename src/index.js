import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CssBaseline } from "@material-ui/core";
import ThemeProvider from "./theme";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./graphql/client";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.register();
