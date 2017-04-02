import {
  USER_FETCH_REQUEST,
  USER_FETCH_SUCCESS,
  USER_FETCH_ERROR,
  LOGOUT_REQUEST,
} from '../constants/ActionTypes';

export default (state = {
  user: null,
  isFetching: false,
  error: null,
}, {
  type,
  payload,
  response,
  error,
}) => {
  switch (type) {
    case USER_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case USER_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        user: response,
      };
    case USER_FETCH_ERROR:
      return {
        ...state,
        isFetching: false,
        error,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};