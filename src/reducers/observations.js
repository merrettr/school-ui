import { combineReducers } from 'redux';
import { generateFetchReducer } from './util';
import {
  OBSERVATION_CREATE_REQUEST,
  OBSERVATION_CREATE_SUCCESS,
  OBSERVATION_CREATE_ERROR,
  OBSERVATION_FETCH_REQUEST,
  OBSERVATION_FETCH_SUCCESS,
  OBSERVATION_FETCH_ERROR,
  LOGOUT_REQUEST,
} from '../constants/ActionTypes';

export default combineReducers({
  create: generateFetchReducer([
    OBSERVATION_CREATE_REQUEST,
    OBSERVATION_CREATE_SUCCESS,
    OBSERVATION_CREATE_ERROR,
    LOGOUT_REQUEST,
  ]),
  fetch: generateFetchReducer([
    OBSERVATION_FETCH_REQUEST,
    OBSERVATION_FETCH_SUCCESS,
    OBSERVATION_FETCH_ERROR,
    LOGOUT_REQUEST,
  ])
});