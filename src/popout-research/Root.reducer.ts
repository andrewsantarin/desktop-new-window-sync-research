import { combineReducers } from 'redux';
import { withReduxStateSync } from 'redux-state-sync';

import { valueReducer as value, ValueState } from "./Value.state";

// Root reducer
export type RootState = {
  value: ValueState;
};

const combinedReducers = combineReducers({
  value,
});

export const rootReducer = withReduxStateSync(combinedReducers);
