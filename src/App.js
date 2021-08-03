import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "pages/Home/Home";
import GlobalStyles from "styles/GlobalStyles";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
