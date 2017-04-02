import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from '../store/configureStore';
import routes from '../routes';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

export default () =>
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>;