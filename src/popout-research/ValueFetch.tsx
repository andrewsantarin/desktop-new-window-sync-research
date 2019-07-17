import React, { Fragment } from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

import { RootState } from './Root.reducer';

import { fetchValue, ValueState } from './Value.state';
import { Spinner } from './Spinner';

// Components
export type ValueFetchStateProps = Omit<ValueState, 'value'> & {
  
};

export type ValueFetchDispatchProps = {
  fetchValue(): void;
};

export type ValueFetchOwnProps = {

};

export type ValueFetchProps = ValueFetchStateProps & ValueFetchDispatchProps & ValueFetchOwnProps;

export const ValueFetch = ({ fetchValue, api, fetching, data, error }: ValueFetchProps) => {
  return (
    <div style={{ margin: '8px 0' }}>
      {fetching ? <Spinner /> : <div style={{ width: 1, height: 129 }}></div>}
      <button onClick={fetchValue} disabled={fetching}>Fetch a value</button>
      <div>API status: <strong>{fetching ? 'Fetching data' : 'Idle'}</strong></div>
      <div>API presence: <strong style={{ color: api ? 'blue' : 'red' }}>{api ? '---> Exists here <---' : '...'}</strong></div>
      <div>
        {!fetching && (data || error) && (
          <Fragment>
            <div>API example result:</div>
            <pre>
              {data && JSON.stringify(data)}
              {error && JSON.stringify(error)}
            </pre>
          </Fragment>
        )}
      </div>
    </div>
  )
};

const mapStateToProps: MapStateToProps<ValueFetchStateProps, ValueFetchOwnProps, RootState> = (state) => ({
  api: state.value.api,
  fetching: state.value.fetching,
  data: state.value.data,
  error: state.value.error,
});

const mapDispatchToProps: MapDispatchToProps<ValueFetchDispatchProps, ValueFetchOwnProps> = {
  fetchValue,
};

export const ValueFetchContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ValueFetch);
