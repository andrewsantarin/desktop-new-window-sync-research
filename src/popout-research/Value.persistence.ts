import { createTransform } from 'redux-persist';

import { ValueState } from './Value.state';

export const createValuePersistedState = (state: Partial<ValueState>): Partial<ValueState> => {
  const { value } = state;
  return { value };
};

export const valueTransform = createTransform(
  createValuePersistedState, // to serialization
  createValuePersistedState, // from hydration
);
