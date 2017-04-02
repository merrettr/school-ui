import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { logout, fetchUser, fetchBehaviourCategories, fetchBehaviour } from '../actions';
import App from '../components/App';
import Navigation from '../components/Navigation';
import Spinner from '../components/Spinner';

class AppContainer extends Component {
  async componentWillReceiveProps(next) {
    const {
      isLoggedIn,
      onFetchUser,
      onFetchBehaviourCategories,
      onFetchBehaviour
    } = this.props;

    if (!isLoggedIn && next.isLoggedIn) {
      await onFetchUser();

      // pre fetch common data
      onFetchBehaviourCategories();
      onFetchBehaviour();
    }
  }

  render() {
    const { isFetching, children } = this.props;

    if (isFetching) {
      return <div style={{ marginTop: '1em' }}>
        <Spinner />
      </div>;
    }

    return <Navigation {...this.props} >
      <App children={children} />
    </Navigation>;
  }
}

const mapStateToProps = ({ auth, user }, { children, location }) => ({
  children,
  user: user.user,
  route: location,
  isFetching: auth.isFetching || user.isFetching,
  isLoggedIn: !!auth.token,
});

export default connect(mapStateToProps, {
  onNavigate: push,
  onLogout: logout,
  onFetchUser: fetchUser,
  onFetchBehaviourCategories: fetchBehaviourCategories,
  onFetchBehaviour: fetchBehaviour,
})(AppContainer);