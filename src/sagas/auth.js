import { takeLatest } from 'redux-saga'
import callApi from '../util/api';
import {
  LOGIN_CREATE,
  LOGIN_CREATE_REQUEST,
  LOGIN_CREATE_SUCCESS,
  LOGIN_CREATE_ERROR,
} from '../constants/ActionTypes';


/**
 * Get a new auth token
 *
 * @param payload User credentials
 */
function* login({ payload }) {
  yield* callApi(
    [ LOGIN_CREATE_REQUEST, LOGIN_CREATE_SUCCESS, LOGIN_CREATE_ERROR ],
    {
      endpoint: '/token',
      method: 'POST',
      body: payload,
    },
  );
}

/**
 * Export listeners
 */
export default [
  takeLatest(LOGIN_CREATE, login),
];