import pull from 'lodash/pull';

export const generateFetchReducer = (
  [ requestType, successType, errorType, invalidateType ],
  defaultState,
  cases,
) => {
  const initialState = {
    ids: [],
    isFetching: false,
    isSuccess: false,
    error: null,
    ...defaultState,
  };

  const handlers = {
    [requestType]: state => ({
      ...state,
      ids: [],
      isFetching: true,
      isSuccess: false,
      error: null,
    }),
    [successType]: (state, { response }) => ({
      ...state,
      isFetching: false,
      isSuccess: true,
      ids: response && (Array.isArray(response.result) ? response.result : [response.result]),
    }),
    [errorType]: (state, { response, error }) => ({
      ...state,
      isFetching: false,
      isSuccess: false,
      error,
    }),
    [invalidateType]: state => ({
      ...state,
      ids: [],
    }),
    ...cases,
  };

  return (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
};

export const generateDeleteReducer = (
  [ requestType, successType, errorType, invalidateType ],
  defaultState,
  cases,
) => {
  const initialState = {
    ids: [],
    isDeleting: false,
    isSuccess: false,
    error: null,
    ...defaultState,
  };

  const handlers = {
    [requestType]: (state, { payload }) => ({
      ...state,
      ids: [
        ...state.ids,
        payload,
      ],
      isDeleting: true,
      isSuccess: false,
      error: null,
    }),
    [successType]: (state, { payload }) => ({
      ...state,
      ids: pull(state.ids, payload),
      isDeleting: false,
      isSuccess: true,
    }),
    [errorType]: (state, { payload, error }) => ({
      ...state,
      isFetching: false,
      isDeleting: false,
      ids: pull(state.ids, payload),
      error,
    }),
    [invalidateType]: state => ({
      ...state,
      ids: [],
    }),
    ...cases,
  };

  return (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
};