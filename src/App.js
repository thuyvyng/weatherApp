import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import queryString from "query-string";

import Search from "./pages/Search";
import Error from "./pages/Error";

function useQueryString() {
  return queryString.parse(useLocation().search);
}

function App() {
  return (
    <div
      style={{
        backgroundImage: `url("https://img.freepik.com/free-vector/leopard-print-texture-background_125540-1998.jpg?w=360")`,
      }}
    >
      <Switch>
        <Route path="/search">
          <Search query={useQueryString().q} />
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
