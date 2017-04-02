import { takeLatest } from 'redux-saga'
import callApi from '../util/api';
import {
  INVITE_SCHEMA,
  INVITES_SCHEMA,
} from '../constants/Schemas';
import {
  INVITES_FETCH,
  INVITES_FETCH_REQUEST,
  INVITES_FETCH_SUCCESS,
  INVITES_FETCH_ERROR,
  INVITE_CREATE,
  INVITE_CREATE_REQUEST,
  INVITE_CREATE_SUCCESS,
  INVITE_CREATE_ERROR,
} from '../constants/ActionTypes';

/**
 * Fetch the unaccepted invites
 */
function* fetchInvites() {
  yield* callApi(
    [ INVITES_FETCH_REQUEST, INVITES_FETCH_SUCCESS, INVITES_FETCH_ERROR ],
    {
      endpoint: '/invites-unaccepted',
      schema: INVITES_SCHEMA,
    },
  );
}

function* createInvite({ payload }) {
  yield* callApi(
    [ INVITE_CREATE_REQUEST, INVITE_CREATE_SUCCESS, INVITE_CREATE_ERROR ],
    {
      endpoint: '/invites',
      method: 'POST',
      schema: INVITE_SCHEMA,
      body: payload,
    },
  );
}

/**
 * Export listeners
 */
export default [
  takeLatest(INVITES_FETCH, fetchInvites),
  takeLatest(INVITE_CREATE, createInvite),
];