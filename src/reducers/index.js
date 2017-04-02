import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import entities from './entities';
import auth from './auth';
import user from './user';
import behaviourCategories from './behaviour-categories';
import behaviour from './behaviour';
import invites from './invites';
import students from './students';
import observations from './observations';
import reports from './reports';
import form from './form';

export default combineReducers({
  routing,
  entities,
  auth,
  user,
  behaviourCategories,
  behaviour,
  invites,
  students,
  observations,
  reports,
  form,
});