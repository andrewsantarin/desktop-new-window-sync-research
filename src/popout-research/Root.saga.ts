import { all, fork } from 'redux-saga/effects';

import { valueSaga } from './Value.sagas';

export const rootSaga = function* rootSaga() {
  yield all([
    fork(valueSaga),
  ]);
}
