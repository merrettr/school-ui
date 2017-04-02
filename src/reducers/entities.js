import merge from 'lodash/merge';
import omit from 'lodash/omit';

import {
  BEHAVIOUR_DELETE_SUCCESS ,
} from '../constants/ActionTypes';

const initialState = {
  students: {},
  behaviourCategories: {},
  behaviour: {},
  observations: {},
  invites: {},
};

export default (state = initialState, { type, response, payload }) => {
  if (response && response.entities) {
    return merge({}, state, response.entities);
  }

  switch (type) {
    case BEHAVIOUR_DELETE_SUCCESS:
      return {
        ...state,
        behaviour: omit(state.behaviour, payload),
      };
    default: return state;
  }
};