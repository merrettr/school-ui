import { takeLatest } from 'redux-saga'
import callApi from '../util/api';
import {
  BEHAVIOUR_CATEGORY_SCHEMA,
  BEHAVIOUR_CATEGORIES_SCHEMA,
} from '../constants/Schemas';
import {
  BEHAVIOUR_CATEGORY_FETCH,
  BEHAVIOUR_CATEGORY_FETCH_REQUEST,
  BEHAVIOUR_CATEGORY_FETCH_SUCCESS,
  BEHAVIOUR_CATEGORY_FETCH_ERROR,
  BEHAVIOUR_CATEGORY_CREATE,
  BEHAVIOUR_CATEGORY_CREATE_REQUEST,
  BEHAVIOUR_CATEGORY_CREATE_SUCCESS,
  BEHAVIOUR_CATEGORY_CREATE_ERROR,
  BEHAVIOUR_CATEGORY_UPDATE,
  BEHAVIOUR_CATEGORY_UPDATE_REQUEST,
  BEHAVIOUR_CATEGORY_UPDATE_SUCCESS,
  BEHAVIOUR_CATEGORY_UPDATE_ERROR,
} from '../constants/ActionTypes';


/**
 * Fetch all behaviour categories
 */
function* fetchBehaviourCategories() {
  yield* callApi(
    [ BEHAVIOUR_CATEGORY_FETCH_REQUEST, BEHAVIOUR_CATEGORY_FETCH_SUCCESS, BEHAVIOUR_CATEGORY_FETCH_ERROR ],
    {
      endpoint: '/behaviour-categories',
      schema: BEHAVIOUR_CATEGORIES_SCHEMA,
    },
  );
}

/**
 * Create a new behaviour category
 *
 * @param payload Behaviour category data
 */
function* createBehaviourCategory({ payload }) {
  yield* callApi(
    [ BEHAVIOUR_CATEGORY_CREATE_REQUEST, BEHAVIOUR_CATEGORY_CREATE_SUCCESS, BEHAVIOUR_CATEGORY_CREATE_ERROR ],
    {
      endpoint: '/behaviour-categories',
      method: 'POST',
      schema: BEHAVIOUR_CATEGORY_SCHEMA,
      body: payload,
    }
  )
}

/**
 * Update a behaviour category
 *
 * @param payload Behaviour category data
 */
function* updateBehaviourCategory({ payload }) {
  yield* callApi(
    [ BEHAVIOUR_CATEGORY_UPDATE_REQUEST, BEHAVIOUR_CATEGORY_UPDATE_SUCCESS, BEHAVIOUR_CATEGORY_UPDATE_ERROR ],
    {
      endpoint: `/behaviour-categories/${payload.id}`,
      method: 'PUT',
      schema: BEHAVIOUR_CATEGORY_SCHEMA,
      body: payload,
    }
  )
}

/**
 * Export listeners
 */
export default [
  takeLatest(BEHAVIOUR_CATEGORY_FETCH, fetchBehaviourCategories),
  takeLatest(BEHAVIOUR_CATEGORY_CREATE, createBehaviourCategory),
  takeLatest(BEHAVIOUR_CATEGORY_UPDATE, updateBehaviourCategory),
];