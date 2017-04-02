import { setToken, removeToken } from '../util/token';
import {
  TOKEN_FETCH,
  LOGIN_CREATE_REQUEST,
  LOGIN_CREATE_SUCCESS,
  LOGIN_CREATE_ERROR,
  LOGOUT_REQUEST,
  USER_FETCH_ERROR,
} from '../constants/ActionTypes';

export default (state = {
  token: null,
  isFetching: false,
  error: null,
}, {
  type,
  payload,
  response,
  error,
}) => {
  switch (type) {
    case TOKEN_FETCH:
      return {
        ...state,
        token: payload,
      };
    case LOGIN_CREATE_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case LOGIN_CREATE_SUCCESS:
      setToken(response);

      return {
        ...state,
        isFetching: false,
        error: null,
        token: response,
      };
    case LOGIN_CREATE_ERROR:
      return {
        ...state,
        isFetching: false,
        error,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        token: null,
      };
    case USER_FETCH_ERROR:
      removeToken();

      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};