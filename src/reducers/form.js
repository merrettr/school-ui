import { reducer as formReducer } from 'redux-form';
import { INVITE_CREATE_SUCCESS } from '../constants/ActionTypes';

export default formReducer.plugin({
  InviteForm: (state, { type }) => {
    switch (type) {
      case INVITE_CREATE_SUCCESS:
        return undefined;
      default:
        return state;
    }
  }
});