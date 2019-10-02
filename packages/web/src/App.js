import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Movie } from "./pages/Movie";

function App() {
  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/movie/:id" component={Movie} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
