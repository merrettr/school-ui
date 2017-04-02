import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppContainer from './containers/AppContainer';
import LoginPage from './containers/LoginPage';
import AcceptInvitePage from './containers/AcceptInvitePage';
import StudentPage from './containers/StudentPage';
import BehaviourCategoryPage from './containers/BehaviourCategoryPage';
import BehaviourPage from './containers/BehaviourPage';
import ObservationPage from './containers/ObservationPage';
import StatsPage from './containers/StatsPage';
import ReportPage from './containers/ReportPage';
import AuthContainer from './containers/AuthContainer';
import AdminBehaviourCategoryPage from './containers/AdminBehaviourCategoryPage';
import AdminCreateBehaviourCategoryPage from './containers/AdminCreateBehaviourCategoryPage';
import AdminUpdateBehaviourCategoryPage from './containers/AdminUpdateBehaviourCategoryPage';
import AdminBehaviourPage from './containers/AdminBehaviourPage';
import AdminCreateBehaviourPage from './containers/AdminCreateBehaviourPage';
import AdminUpdateBehaviourPage from './containers/AdminUpdateBehaviourPage';
import AdminStudentPage from './containers/AdminStudentPage';
import AdminUserPage from './containers/AdminUserPage';
import NotFound from './components/NotFound';

export default (
  <Route path="/" component={AppContainer} >
    <Route path="/login" component={LoginPage} />
    <Route path="/invite" component={AcceptInvitePage} />

    <Route component={AuthContainer}>
      <IndexRoute component={StudentPage} />
      <Route path="/student/:studentId/category" component={BehaviourCategoryPage} />
      <Route path="/student/:studentId/category/:categoryId/behaviour" component={BehaviourPage} />
      <Route path="/student/:studentId/category/:categoryId/behaviour/:behaviourId/observation" component={ObservationPage} />
      <Route path="/reports/stats" component={StatsPage} />
      <Route path="/reports/stats/:type" component={ReportPage} />
      <Route path="/admin/behaviour-categories" component={AdminBehaviourCategoryPage} />
      <Route path="/admin/behaviour-categories/create" component={AdminCreateBehaviourCategoryPage} />
      <Route path="/admin/behaviour-categories/:id" component={AdminUpdateBehaviourCategoryPage} />
      <Route path="/admin/behaviour" component={AdminBehaviourPage} />
      <Route path="/admin/behaviour/create" component={AdminCreateBehaviourPage} />
      <Route path="/admin/behaviour/:id" component={AdminUpdateBehaviourPage} />
      <Route path="/admin/students" component={AdminStudentPage} />
      <Route path="/admin/users" component={AdminUserPage} />
    </Route>

    <Route path="*" component={NotFound} />
  </Route>
);