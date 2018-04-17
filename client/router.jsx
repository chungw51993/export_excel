import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Export from './components/Export.jsx';

const Router = () => (
  <Switch>
    <Route exact path="/" component={Export} />
  </Switch>
);

export default Router;
