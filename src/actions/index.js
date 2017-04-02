import { createAction } from 'redux-actions';
import {
  STUDENTS_FETCH,
  STUDENTS_FILE_UPLOAD,
  BEHAVIOUR_CATEGORY_FETCH,
  BEHAVIOUR_CATEGORY_CREATE,
  BEHAVIOUR_CATEGORY_UPDATE,
  BEHAVIOUR_CATEGORY_DELETE,
  BEHAVIOUR_FETCH,
  BEHAVIOUR_CREATE,
  BEHAVIOUR_UPDATE,
  BEHAVIOUR_DELETE,
  OBSERVATION_CREATE,
  OBSERVATION_FETCH,
  REPORT_FETCH,
  INVITES_FETCH,
  INVITE_CREATE,
  TOKEN_FETCH,
  LOGIN_CREATE,
  LOGOUT_REQUEST,
  USER_FETCH,
} from '../constants/ActionTypes';
import { getToken, removeToken } from '../util/token';

export const fetchToken = createAction(TOKEN_FETCH, () => getToken());
export const login = createAction(LOGIN_CREATE);
export const logout = createAction(LOGOUT_REQUEST, () => removeToken());

export const fetchUser = createAction(USER_FETCH);

export const fetchBehaviourCategories = createAction(BEHAVIOUR_CATEGORY_FETCH);
export const createBehaviourCategory = createAction(BEHAVIOUR_CATEGORY_CREATE);
export const updateBehaviourCategory = createAction(BEHAVIOUR_CATEGORY_UPDATE);
export const deleteBehaviourCategory = createAction(BEHAVIOUR_CATEGORY_DELETE);

export const fetchBehaviour = createAction(BEHAVIOUR_FETCH);
export const createBehaviour = createAction(BEHAVIOUR_CREATE);
export const updateBehaviour = createAction(BEHAVIOUR_UPDATE);
export const deleteBehaviour = createAction(BEHAVIOUR_DELETE);

export const fetchObservations = createAction(OBSERVATION_FETCH);
export const createObservation = createAction(OBSERVATION_CREATE);

export const fetchInvites = createAction(INVITES_FETCH);
export const createInvite = createAction(INVITE_CREATE);

export const fetchStudents = createAction(STUDENTS_FETCH);
export const uploadStudentsFile = createAction(STUDENTS_FILE_UPLOAD);

export const fetchReport = createAction(REPORT_FETCH);
