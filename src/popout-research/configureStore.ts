import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import { createStateSyncMiddleware, initStateWithPrevTab, Config } from 'redux-state-sync';
import { composeWithDevTools as compose } from 'redux-devtools-extension';
import { rootSaga } from './Root.saga';
import { persistedRootReducer } from './Root.reducer';
import { rootBlacklistStateTransfomers } from './Root.sync';
import { createStateSyncBlacklistMiddleware } from './redux-state-sync-blacklist';

const config: Config = {
  channel: 'value',
};

export const configureStore = () => {
  const stateSyncMiddleware = createStateSyncMiddleware(config);
  const stateSyncBlacklistMiddleware = createStateSyncBlacklistMiddleware(rootBlacklistStateTransfomers);
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    persistedRootReducer,
    {},
    compose(
      applyMiddleware(
        sagaMiddleware,
        stateSyncMiddleware,
        stateSyncBlacklistMiddleware
      )
    )
  );

  // initStateWithPrevTab(store);
  sagaMiddleware.run(rootSaga);

  const createPersistor = () => {
    return persistStore(store);
  };

  type PersistableStore = typeof store & {
    createPersistor: typeof createPersistor;
  };

  (store as PersistableStore).createPersistor = createPersistor;

  return store as PersistableStore;
};
