import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import OverviewPage from './pages/OverviewPage';
import UserPage from './pages/UserPage';

const Router = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={OverviewPage} />
        <Route path="/users/:userId" exact={true} component={UserPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
