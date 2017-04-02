import { generateFetchReducer } from './util';
import {
  REPORT_FETCH_REQUEST,
  REPORT_FETCH_SUCCESS,
  REPORT_FETCH_ERROR,
  LOGOUT_REQUEST,
} from '../constants/ActionTypes';

export default generateFetchReducer([
  REPORT_FETCH_REQUEST,
  REPORT_FETCH_SUCCESS,
  REPORT_FETCH_ERROR,
  LOGOUT_REQUEST,
], {
  entities: [],
}, {
  [REPORT_FETCH_SUCCESS]: (state, { response }) => ({
    ...state,
    isFetching: false,
    isSuccess: true,
    entities: response,
  })
});