// Librareis
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

// Funcation Components
import App from "./App";
import store from "./app/store"; // redux

// Css
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
