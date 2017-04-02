import { takeLatest } from 'redux-saga'
import callApi from '../util/api';
import {
  OBSERVATIONS_SCHEMA,
} from '../constants/Schemas';
import {
  OBSERVATION_CREATE,
  OBSERVATION_CREATE_REQUEST,
  OBSERVATION_CREATE_SUCCESS,
  OBSERVATION_CREATE_ERROR,
  OBSERVATION_FETCH,
  OBSERVATION_FETCH_REQUEST,
  OBSERVATION_FETCH_SUCCESS,
  OBSERVATION_FETCH_ERROR,
} from '../constants/ActionTypes';

/**
 * Create a new observation
 *
 * @param payload Observation data
 */
function* createObservation({ payload }) {
  yield* callApi(
    [ OBSERVATION_CREATE_REQUEST, OBSERVATION_CREATE_SUCCESS, OBSERVATION_CREATE_ERROR ],
    {
      endpoint: `/students/${payload.studentId}/observations`,
      method: 'POST',
      body: {
        ...payload,
        ...location,
      },
    }
  );
}

/**
 * Fetch all observations
 *
 * @param payload Query params to limit observations
 */
function* fetchObservations({ payload }) {
  yield* callApi(
    [ OBSERVATION_FETCH_REQUEST, OBSERVATION_FETCH_SUCCESS, OBSERVATION_FETCH_ERROR ],
    {
      endpoint: '/observations',
      schema: OBSERVATIONS_SCHEMA,
      params: payload
    },
  );
}

/**
 * Export listeners
 */
export default [
  takeLatest(OBSERVATION_CREATE, createObservation),
  takeLatest(OBSERVATION_FETCH, fetchObservations),
];