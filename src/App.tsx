import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Navbar from "./components/ui/nabvar";
import Home from "./containers/pages/home";
import Search from "./containers/pages/search";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route path="/home" component={() => <Home />} />
        <Route path="/search" component={() => <Search />} />
        <Redirect to="/home" />
      </Switch>
    </React.Fragment>
  );
}

export default withRouter(App);
