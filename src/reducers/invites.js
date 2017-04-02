import { combineReducers } from 'redux';
import { generateFetchReducer } from './util';
import {
  INVITES_FETCH_REQUEST,
  INVITES_FETCH_SUCCESS,
  INVITES_FETCH_ERROR,
  INVITE_CREATE_REQUEST,
  INVITE_CREATE_SUCCESS,
  INVITE_CREATE_ERROR,
} from '../constants/ActionTypes';

export default combineReducers({
  fetch: generateFetchReducer([
    INVITES_FETCH_REQUEST,
    INVITES_FETCH_SUCCESS,
    INVITES_FETCH_ERROR
  ], {}, {
    [INVITE_CREATE_SUCCESS]:
      (state, { response }) => ({
        ...state,
        ids: [
          ...state.ids,
          response.result,
        ],
      }),
  }),
  create: generateFetchReducer([
    INVITE_CREATE_REQUEST,
    INVITE_CREATE_SUCCESS,
    INVITE_CREATE_ERROR,
  ]),
});