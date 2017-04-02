import { takeLatest } from 'redux-saga'
import callApi from '../util/api';
import {
  REPORT_FETCH,
  REPORT_FETCH_REQUEST,
  REPORT_FETCH_SUCCESS,
  REPORT_FETCH_ERROR,
} from '../constants/ActionTypes';


/**
 * Fetch data for a report
 *
 * @param payload Name of the report to callApi
 */
function* fetchReport({ payload }) {
  yield* callApi(
    [ REPORT_FETCH_REQUEST, REPORT_FETCH_SUCCESS, REPORT_FETCH_ERROR ],
    {
      endpoint: `/reports/${payload}`,
    },
  );
}

/**
 * Export listeners
 */
export default [
  takeLatest(REPORT_FETCH, fetchReport),
];