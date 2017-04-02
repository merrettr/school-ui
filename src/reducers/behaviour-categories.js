import { combineReducers } from 'redux';
import { generateFetchReducer, generateDeleteReducer } from './util';
import pull from 'lodash/pull';
import {
  BEHAVIOUR_CATEGORY_FETCH_REQUEST,
  BEHAVIOUR_CATEGORY_FETCH_SUCCESS,
  BEHAVIOUR_CATEGORY_FETCH_ERROR,
  BEHAVIOUR_CATEGORY_CREATE_REQUEST,
  BEHAVIOUR_CATEGORY_CREATE_SUCCESS,
  BEHAVIOUR_CATEGORY_CREATE_ERROR,
  BEHAVIOUR_CATEGORY_UPDATE_REQUEST,
  BEHAVIOUR_CATEGORY_UPDATE_SUCCESS,
  BEHAVIOUR_CATEGORY_UPDATE_ERROR,
  BEHAVIOUR_CATEGORY_DELETE_REQUEST,
  BEHAVIOUR_CATEGORY_DELETE_SUCCESS,
  BEHAVIOUR_CATEGORY_DELETE_ERROR,
  LOGOUT_REQUEST,
} from '../constants/ActionTypes';

export default combineReducers({
  fetch: generateFetchReducer([
    BEHAVIOUR_CATEGORY_FETCH_REQUEST,
    BEHAVIOUR_CATEGORY_FETCH_SUCCESS,
    BEHAVIOUR_CATEGORY_FETCH_ERROR,
    LOGOUT_REQUEST,
  ], {}, {
    [BEHAVIOUR_CATEGORY_CREATE_SUCCESS]: (state, { response }) => ({
      ...state,
      ids: [
        ...state.ids,
        response.result,
      ],
    }),
    [BEHAVIOUR_CATEGORY_DELETE_SUCCESS]: (state, { payload }) => ({
      ...state,
      ids: pull(state.ids, payload),
    }),
  }),
  create: generateFetchReducer([
    BEHAVIOUR_CATEGORY_CREATE_REQUEST,
    BEHAVIOUR_CATEGORY_CREATE_SUCCESS,
    BEHAVIOUR_CATEGORY_CREATE_ERROR,
  ]),
  update: generateFetchReducer([
    BEHAVIOUR_CATEGORY_UPDATE_REQUEST,
    BEHAVIOUR_CATEGORY_UPDATE_SUCCESS,
    BEHAVIOUR_CATEGORY_UPDATE_ERROR,
  ]),
  deletes: generateDeleteReducer([
    BEHAVIOUR_CATEGORY_DELETE_REQUEST,
    BEHAVIOUR_CATEGORY_DELETE_SUCCESS,
    BEHAVIOUR_CATEGORY_DELETE_ERROR,
  ]),
});