import { combineReducers } from 'redux';
import { generateFetchReducer, generateDeleteReducer } from './util';
import pull from 'lodash/pull';
import {
  BEHAVIOUR_FETCH_REQUEST,
  BEHAVIOUR_FETCH_SUCCESS,
  BEHAVIOUR_FETCH_ERROR,
  BEHAVIOUR_CREATE_REQUEST,
  BEHAVIOUR_CREATE_SUCCESS,
  BEHAVIOUR_CREATE_ERROR,
  BEHAVIOUR_UPDATE_REQUEST,
  BEHAVIOUR_UPDATE_SUCCESS,
  BEHAVIOUR_UPDATE_ERROR,
  BEHAVIOUR_DELETE_REQUEST,
  BEHAVIOUR_DELETE_SUCCESS,
  BEHAVIOUR_DELETE_ERROR,
  LOGOUT_REQUEST,
} from '../constants/ActionTypes';

export default combineReducers({
  fetch: generateFetchReducer([
    BEHAVIOUR_FETCH_REQUEST,
    BEHAVIOUR_FETCH_SUCCESS,
    BEHAVIOUR_FETCH_ERROR,
    LOGOUT_REQUEST,
  ], {}, {
    [BEHAVIOUR_CREATE_SUCCESS]: (state, { response }) => ({
      ...state,
      ids: [
        ...state.ids,
        response.result,
      ],
    }),
    [BEHAVIOUR_DELETE_SUCCESS]: (state, { payload }) => ({
      ...state,
      ids: pull(state.ids, payload),
    }),
  }),
  create: generateFetchReducer([
    BEHAVIOUR_CREATE_REQUEST,
    BEHAVIOUR_CREATE_SUCCESS,
    BEHAVIOUR_CREATE_ERROR,
  ]),
  update: generateFetchReducer([
    BEHAVIOUR_UPDATE_REQUEST,
    BEHAVIOUR_UPDATE_SUCCESS,
    BEHAVIOUR_UPDATE_ERROR,
  ]),
  deletes: generateDeleteReducer([
    BEHAVIOUR_DELETE_REQUEST,
    BEHAVIOUR_DELETE_SUCCESS,
    BEHAVIOUR_DELETE_ERROR,
  ]),
});