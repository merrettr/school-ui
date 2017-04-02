import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import reducer from '../reducers';
import sagas from '../sagas';

export default initialState => {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [
    sagaMiddleware,
    routerMiddleware(browserHistory),
  ];

  if (process.env.NODE_ENV === 'development') {
    middleware.push(createLogger());
  }

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware),
  );

  sagaMiddleware.run(sagas);

  return store;
}