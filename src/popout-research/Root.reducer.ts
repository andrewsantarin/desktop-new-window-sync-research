import { combineReducers } from 'redux';
import { withReduxStateSync } from 'redux-state-sync';

import { valueReducer as value, ValueState } from "./Value.state";
import { PersistConfig, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';

// Root reducer
export type RootState = {
  value: ValueState;
};

const combinedReducers = combineReducers({
  value,
});

export const rootReducer = withReduxStateSync(combinedReducers);

const persistConfig: PersistConfig = {
  key: 'root',
  storage,
};

export const persistedRootReducer = persistReducer(persistConfig, rootReducer);
