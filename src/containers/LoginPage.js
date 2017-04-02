import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchToken, login } from '../actions';
import Login from '../components/Login';

class LoginPage extends Component {
  async componentWillMount() {
    await this.props.onFetchToken();
    
    if (this.props.isLoggedIn) {
      this.props.onNavigate('/');
    }
  }

  componentWillReceiveProps(next) {
    if (next.isLoggedIn) {
      this.props.onNavigate('/');
    }
  }

  render() {
    return <Login
      isFetching={this.props.isFetching}
      error={this.props.error}
      login={this.props.onLogin}
    />;
  }
}

const mapStateToProps = ({ auth }) => ({
  isFetching: auth.isFetching,
  error: auth.error,
  isLoggedIn: !!auth.token,
});

export default connect(mapStateToProps, {
  onFetchToken: fetchToken,
  onLogin: login,
  onNavigate: push,
})(LoginPage);