import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import queryString from "query-string";

import Search from "./pages/Search";
import Error from "./pages/Error";
import About from "./pages/About";

function useQueryString() {
  return queryString.parse(useLocation().search);
}

function App() {
  return (
    <div>
      <Switch>
        <Route path="/search">
          <Search query={useQueryString().q} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route exact path="/">
          <Redirect to="/search" />
        </Route>
        <Route component={Error} />
      </Switch>
    </div>
  );
}

export default App;
