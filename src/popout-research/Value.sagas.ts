import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';

import { fetchValue, ValueState, fetchValueSuccess, fetchValueFailure } from './Value.state';
import { RootState } from './Root.reducer';
import { oc } from 'ts-optchain';

function* fetchValueSaga() {
  const api: ValueState['api'] = yield select<(state: RootState) => ValueState['api']>(state => oc(state).value.api());

  if (!api) {
    console.warn('API not found. Will execute on the main window, hopefully...');
    return;
  }

  console.log('API found. Executing fetch...');
  console.log(api, api.fetch);

  try {
    const result = yield call(api.fetch, Math.random() >= 0.5);
    console.log(result);
    yield put(fetchValueSuccess(result));
  } catch (exception) {
    console.error(exception);
    yield put(fetchValueFailure(exception));
  }
}

function* watchFetchValueSaga() {
  yield takeLatest(fetchValue.type, fetchValueSaga);
}

export const valueSaga = function* valueSaga() {
  yield all([
    fork(watchFetchValueSaga),
  ]);
}
