import { combineReducers } from 'redux';
import { generateFetchReducer } from './util';
import {
  STUDENTS_FETCH_REQUEST,
  STUDENTS_FETCH_SUCCESS,
  STUDENTS_FETCH_ERROR,
  STUDENTS_FILE_UPLOAD_REQUEST,
  STUDENTS_FILE_UPLOAD_SUCCESS,
  STUDENTS_FILE_UPLOAD_ERROR,
  LOGOUT_REQUEST,
  OBSERVATION_CREATE_SUCCESS,
} from '../constants/ActionTypes';

export default combineReducers({
  fetch: generateFetchReducer([
    STUDENTS_FETCH_REQUEST,
    STUDENTS_FETCH_SUCCESS,
    STUDENTS_FETCH_ERROR,
    LOGOUT_REQUEST,
  ], {}, {
    [OBSERVATION_CREATE_SUCCESS]: state => ({
      ...state,
      ids: [],
    })
  }),
  upload: (state = {
    isUploading: false,
    response: {},
    error: null
  }, {
    type,
    response,
    error,
  }) => {
    switch (type) {
      case STUDENTS_FILE_UPLOAD_REQUEST:
        return {
          ...state,
          isUploading: true,
          error: null,
        };
      case STUDENTS_FILE_UPLOAD_SUCCESS:
        return {
          ...state,
          isUploading: false,
          response,
        };
      case STUDENTS_FILE_UPLOAD_ERROR:
        return {
          ...state,
          isUploading: false,
          error,
        };
      default:
        return state;
    }
  }
});