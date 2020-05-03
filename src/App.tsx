import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import Navbar from "./components/ui/nabvar";
import Home from "./containers/pages/home";
import Search from "./containers/pages/search";
import Detail from "./components/pages/detail";

const App: React.FC<RouteComponentProps> = (props) => {
  const renderHome = () => <Home />;
  const renderSearch = () => <Search />;
  const renderDetail = (props: any) => <Detail id={props.match.params.id} />;
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route path="/home" component={renderHome} />
        <Route path="/search" component={renderSearch} />
        <Route path="/detail/:id" component={renderDetail} />
        <Redirect to="/home" />
      </Switch>
    </React.Fragment>
  );
};

export default withRouter(App);
