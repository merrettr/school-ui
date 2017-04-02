import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchToken } from '../actions';
import { getToken } from '../util/token';

class AuthContainer extends Component {
  async componentWillMount() {
    const { onFetchToken, onNavigate } = this.props;

    await onFetchToken();

    if (!getToken()) {
      onNavigate('/login');
    }
  }

  componentWillReceiveProps(next) {
    if (!next.isLoggedIn) {
      next.push('/login');
    }
  }

  render() {
    return <div style={{ height: '100%' }}>
      {this.props.children}
    </div>;
  }
}

AuthContainer.propTypes = {
  children: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onFetchToken: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth}, { children }) => ({
  children,
  isLoggedIn: !!auth.token
});

export default connect(mapStateToProps, {
  onFetchToken: fetchToken,
  onNavigate: push,
})(AuthContainer);