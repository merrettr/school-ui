import { takeLatest } from 'redux-saga'
import callApi from '../util/api';
import {
  BEHAVIOUR_SCHEMA,
  BEHAVIOURS_SCHEMA,
} from '../constants/Schemas';
import {
  BEHAVIOUR_FETCH,
  BEHAVIOUR_FETCH_REQUEST,
  BEHAVIOUR_FETCH_SUCCESS,
  BEHAVIOUR_FETCH_ERROR,
  BEHAVIOUR_CREATE,
  BEHAVIOUR_CREATE_REQUEST,
  BEHAVIOUR_CREATE_SUCCESS,
  BEHAVIOUR_CREATE_ERROR,
  BEHAVIOUR_UPDATE,
  BEHAVIOUR_UPDATE_REQUEST,
  BEHAVIOUR_UPDATE_SUCCESS,
  BEHAVIOUR_UPDATE_ERROR,
  BEHAVIOUR_DELETE,
  BEHAVIOUR_DELETE_REQUEST,
  BEHAVIOUR_DELETE_SUCCESS,
  BEHAVIOUR_DELETE_ERROR,
} from '../constants/ActionTypes';

/**
 * Fetch all behaviour
 */
function* fetchBehaviour() {
  yield* callApi(
    [ BEHAVIOUR_FETCH_REQUEST, BEHAVIOUR_FETCH_SUCCESS, BEHAVIOUR_FETCH_ERROR ],
    {
      endpoint: '/behaviour',
      schema: BEHAVIOURS_SCHEMA,
    },
  );
}

/**
 * Create a new behaviour
 *
 * @param payload Behaviour data
 */
function* createBehaviour({ payload }) {
  yield* callApi(
    [ BEHAVIOUR_CREATE_REQUEST, BEHAVIOUR_CREATE_SUCCESS, BEHAVIOUR_CREATE_ERROR ],
    {
      endpoint: '/behaviour',
      method: 'POST',
      schema: BEHAVIOUR_SCHEMA,
      body: payload,
    }
  )
}

/**
 * Update a behaviour
 *
 * @param payload Behaviour data
 */
function* updateBehaviour({ payload }) {
  yield* callApi(
    [ BEHAVIOUR_UPDATE_REQUEST, BEHAVIOUR_UPDATE_SUCCESS, BEHAVIOUR_UPDATE_ERROR ],
    {
      endpoint: `/behaviour/${payload.id}`,
      method: 'PUT',
      schema: BEHAVIOUR_SCHEMA,
      body: payload,
    }
  )
}

/**
 * Delete a behaviour
 *
 * @param payload Id of the behaviour to delete
 */
function* deleteBehaviour({ payload }) {
  yield* callApi(
    [ BEHAVIOUR_DELETE_REQUEST, BEHAVIOUR_DELETE_SUCCESS, BEHAVIOUR_DELETE_ERROR ],
    {
      endpoint: `/behaviour/${payload}`,
      method: 'DELETE',
    },
    payload,
  );
}

/**
 * Export listeners
 */
export default [
  takeLatest(BEHAVIOUR_FETCH, fetchBehaviour),
  takeLatest(BEHAVIOUR_CREATE, createBehaviour),
  takeLatest(BEHAVIOUR_UPDATE, updateBehaviour),
  takeLatest(BEHAVIOUR_DELETE, deleteBehaviour),
];