import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./app/layout/App";
import "react-calendar/dist/Calendar.css";
import "./app/layout/index.css";
import { store, StoreContext } from "./app/stores/store";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <Router>
      <App />
    </Router>
  </StoreContext.Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
