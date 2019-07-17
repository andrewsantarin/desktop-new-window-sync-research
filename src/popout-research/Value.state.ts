import { Action } from 'redux';

import { ValueService, ValueServiceData, ValueServiceError } from './Value.service';

// Value state
export type ValueState = {
  value: number;
  api?: ValueService;
  fetching: boolean;
  data?: ValueServiceData;
  error?: ValueServiceError;
};

export const initialValue: ValueState = {
  value: 0,
  fetching: false,
};

// Value action
export const UPDATE_VALUE = 'UPDATE_VALUE';
export const updateValue = (value: number) => {
  return {
    type: UPDATE_VALUE,
    value: value,
  };
};
updateValue.type = UPDATE_VALUE;

export const CREATE_VALUE_SERVICE = 'CREATE_VALUE_SERVICE';
export const createValueService = () => {
  return {
    type: CREATE_VALUE_SERVICE,
  };
}
createValueService.type = CREATE_VALUE_SERVICE;

export const FETCH_VALUE = 'FETCH_VALUE';
export const fetchValue = () => {
  return {
    type: FETCH_VALUE,
  };
}
fetchValue.type = FETCH_VALUE;

export const FETCH_VALUE_SUCCESS = 'FETCH_VALUE_SUCCESS';
export const fetchValueSuccess = (data: ValueServiceData) => {
  return {
    type: FETCH_VALUE_SUCCESS,
    data: data,
  };
}
fetchValueSuccess.type = FETCH_VALUE_SUCCESS;

export const FETCH_VALUE_FAILURE = 'FETCH_VALUE_FAILURE';
export const fetchValueFailure = (error: ValueServiceError) => {
  return {
    type: FETCH_VALUE_FAILURE,
    error: error,
  };
}
fetchValueFailure.type = FETCH_VALUE_FAILURE;

// Value reducer
const reducers = {
  [UPDATE_VALUE]: (state: ValueState, action: ReturnType<typeof updateValue>): ValueState => {
    const { value } = action;
    return {
      ...state,
      value,
    };
  },
  [CREATE_VALUE_SERVICE]: (state: ValueState): ValueState => {
    const api = new ValueService();
    return {
      ...state,
      api,
    };
  },
  [FETCH_VALUE]: (state: ValueState): ValueState => {
    return {
      ...state,
      fetching: true,
    };
  },
  [FETCH_VALUE_SUCCESS]: (state: ValueState, action: ReturnType<typeof fetchValueSuccess>): ValueState => {
    return {
      ...state,
      fetching: false,
      data: action.data,
      error: undefined,
    };
  },
  [FETCH_VALUE_FAILURE]: (state: ValueState, action: ReturnType<typeof fetchValueFailure>): ValueState => {
    return {
      ...state,
      fetching: false,
      data: undefined,
      error: action.error,
    };
  },
};

const reducerKeys = Object.keys(reducers);

export const valueReducer = <Key extends keyof typeof reducers>(
  state: ValueState = initialValue,
  action: Action<Key>
) => {
  if (reducerKeys.indexOf(action.type) < 0) {
    return state;
  }

  const newState = reducers[action.type](state, action as any);

  return newState;
};
