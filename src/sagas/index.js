import auth from './auth';
import user from './user';
import behaviourCategories from './behaviour-categories';
import behaviour from './behaviour';
import invites from './invites';
import students from './students';
import observations from './observations';
import reports from './reports';

/**
 * Listen for actions
 */
export default function* () {
  yield [
    ...auth,
    ...user,
    ...behaviour,
    ...behaviourCategories,
    ...students,
    ...observations,
    ...reports,
    ...invites,
  ];
};