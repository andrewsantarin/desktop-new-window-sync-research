import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStateSyncMiddleware, initStateWithPrevTab, Config } from 'redux-state-sync';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { composeWithDevTools as compose } from 'redux-devtools-extension';

import { Main } from './Main';
import { DetachableValueContainer, URL_PATH as VALUE_CONTAINER_URL_PATH } from './Value';
import { DetachableSimpleWindowListener, URL_PATH as SIMPLE_WINDOW_LISTENER_URL_PATH } from './SimpleWindowListener';
import { DataGrid, URL_PATH as DATA_GRID_URL_PATH } from './DataGrid';
import { URL_PATH as DETACHABLE_URL_PATH } from './Detachable';

import { rootReducer } from './Root.reducer';
import { rootSaga } from './Root.saga';
import { rootBlacklistStateTransfomers } from './Root.sync';
import { createStateSyncBlacklistMiddleware } from './redux-state-sync-blacklist';

const config: Config = {
  channel: 'value',
};
const stateSyncMiddleware = createStateSyncMiddleware(config);
const stateSyncBlacklistMiddleware = createStateSyncBlacklistMiddleware(rootBlacklistStateTransfomers);
const sagaMiddleware = createSagaMiddleware();

// Store
const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(
      sagaMiddleware,
      stateSyncMiddleware,
      stateSyncBlacklistMiddleware
    )
  )
);

initStateWithPrevTab(store);

sagaMiddleware.run(rootSaga);

export function Root() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact component={Main} />
        <Route path={`${DETACHABLE_URL_PATH}${VALUE_CONTAINER_URL_PATH}`} component={DetachableValueContainer} />
        <Route path={`${DETACHABLE_URL_PATH}${DATA_GRID_URL_PATH}`} component={DataGrid} />
        <Route path={`${DETACHABLE_URL_PATH}${SIMPLE_WINDOW_LISTENER_URL_PATH}`} component={DetachableSimpleWindowListener} />
      </Router>
    </Provider>
  );
}
