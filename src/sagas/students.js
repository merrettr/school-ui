import { takeLatest } from 'redux-saga'
import { put } from 'redux-saga/effects'
import { camelizeKeys } from 'humps';
import callApi from '../util/api';
import { getToken } from '../util/token';
import {
  STUDENTS_SCHEMA,
} from '../constants/Schemas';
import {
  STUDENTS_FETCH,
  STUDENTS_FETCH_REQUEST,
  STUDENTS_FETCH_SUCCESS,
  STUDENTS_FETCH_ERROR,
  STUDENTS_FILE_UPLOAD,
  STUDENTS_FILE_UPLOAD_REQUEST,
  STUDENTS_FILE_UPLOAD_SUCCESS,
  STUDENTS_FILE_UPLOAD_ERROR,
} from '../constants/ActionTypes';

/**
 * Fetch students
 *
 * @param payload Query params to search students
 */
function* fetchStudents({ payload }) {
  yield* callApi(
    [ STUDENTS_FETCH_REQUEST, STUDENTS_FETCH_SUCCESS, STUDENTS_FETCH_ERROR ],
    {
      endpoint: '/students',
      schema: STUDENTS_SCHEMA,
      params: {
        search: payload || '',
      }
    },
  );
}

/**
 * Upload a file of students
 *
 * @param payload The File object
 */
function* uploadStudentsFile({ payload }) {
  var body = new FormData();
  body.append('students', payload);

  try {
    yield put({ type: STUDENTS_FILE_UPLOAD_REQUEST });

    const result = yield fetch(
      `${process.env.REACT_APP_API_URL}/students/reconcile`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getToken().accessToken}`
        },
        body,
      });

    const text = yield result.text();

    if (!result.ok) {
      throw text
        ? camelizeKeys(JSON.parse(text))
        : { status: result.status, message: result.statusText };
    }

    const response = camelizeKeys(JSON.parse(text));

    yield put({
      type: STUDENTS_FILE_UPLOAD_SUCCESS,
      response,
    });
  } catch (e) {
    yield put({
      type: STUDENTS_FILE_UPLOAD_ERROR,
      error: e.error || 'An unknown error occurred',
    });
  }
}

/**
 * Export listeners
 */
export default [
  takeLatest(STUDENTS_FETCH, fetchStudents),
  takeLatest(STUDENTS_FILE_UPLOAD, uploadStudentsFile),
];