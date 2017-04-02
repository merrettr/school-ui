import { takeLatest } from 'redux-saga'
import callApi from '../util/api';
import {
  USER_FETCH,
  USER_FETCH_REQUEST,
  USER_FETCH_SUCCESS,
  USER_FETCH_ERROR,
} from '../constants/ActionTypes';


/**
 * Get the currently logged in user
 *
 */
function* fetchUser() {
  yield* callApi(
    [ USER_FETCH_REQUEST, USER_FETCH_SUCCESS, USER_FETCH_ERROR ],
    {
      endpoint: '/users/me',
      method: 'GET',
    },
  );
}

/**
 * Export listeners
 */
export default [
  takeLatest(USER_FETCH, fetchUser),
];