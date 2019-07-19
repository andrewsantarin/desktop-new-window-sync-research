import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Main } from './Main';
import { DetachableValueContainer, URL_PATH as VALUE_CONTAINER_URL_PATH } from './Value';
import { DetachableSimpleWindowListener, URL_PATH as SIMPLE_WINDOW_LISTENER_URL_PATH } from './SimpleWindowListener';
import { DataGrid, URL_PATH as DATA_GRID_URL_PATH } from './DataGrid';
import { URL_PATH as DETACHABLE_URL_PATH } from './Detachable';

import { configureStore } from './configureStore';

const store = configureStore();
const storePersistor = store.createPersistor();

export function Root() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={storePersistor}>
        <Router>
          <Route path="/" exact component={Main} />
          <Route path={`${DETACHABLE_URL_PATH}${VALUE_CONTAINER_URL_PATH}`} component={DetachableValueContainer} />
          <Route path={`${DETACHABLE_URL_PATH}${DATA_GRID_URL_PATH}`} component={DataGrid} />
          <Route path={`${DETACHABLE_URL_PATH}${SIMPLE_WINDOW_LISTENER_URL_PATH}`} component={DetachableSimpleWindowListener} />
        </Router>
      </PersistGate>
    </Provider>
  );
}
