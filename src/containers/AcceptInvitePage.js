import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { camelizeKeys } from 'humps';
import { logout } from '../actions'
import Spinner from '../components/Spinner';
import Input from '../components/Input';
import Error from '../components/Error';
import InviteTable from '../components/InviteTable';

const BASE_URL = process.env.REACT_APP_API_URL;

/**
 * Uses fetch locally to avoid the redux state
 */
class AdminStudentPage extends Component {
  state = {
    invite: null,
    isFetching: false,
    fetchError: null,
    acceptError: null,
  };

  async componentWillMount() {
    const { token, onClear } = this.props;

    onClear();

    this.setState({ isFetching: true });
    let fetchError = null,
      invite = null;

    try {
      const response = await fetch(`${BASE_URL}/invites/${token}`);
      const text = await response.text();

      if (!response.ok) {
        fetchError = camelizeKeys(JSON.parse(text));
      } else {
        invite = camelizeKeys(JSON.parse(text));
      }
    } catch (e) {
      fetchError = e.error || 'An unknown error occurred';
    }

    this.setState({
      invite,
      isFetching: false,
      fetchError,
    });
  }

  onAccept = async password => {
    const { token, push } = this.props;

    this.setState({ isFetching: true });
    let acceptError = null;

    try {
      const response = await fetch(
        `${BASE_URL}/invites/${token}`,
        {
          method: 'POST',
          body: JSON.stringify({ password }),
          headers: {
            'Content-Type': 'application/json',
          }
        },
      );
      const text = await response.text();

      if (!response.ok) {
        acceptError = text;
      } else {
        push('/login');
      }
    } catch (e) {
      acceptError = e.error || 'An unknown error occurred';
    }

    this.setState({
      isFetching: false,
      acceptError,
    });
  };

  render() {
    const {
      invite,
      isFetching,
      fetchError,
      acceptError,
    } = this.state;

    if (isFetching) {
      return <Spinner />
    }
    if (fetchError) {
      return <div>
        <Error message={fetchError && fetchError.message} />
        <Error message="If you believe you have received this in error, please contact your administrator" />
      </div>;
    }

    return <div>
      <InviteTable invites={[ invite ]}/>
      <Input
        type="password"
        onConfirm={this.onAccept}
        placeholder="Create a password"
        confirmation="Register"
        isLoading={isFetching}
      />
      <Error message={acceptError} />
    </div>;
  }
}

const mapStateToProps = (state, {
  location: { query: { token } }
}) => ({
  token,
});

export default connect(mapStateToProps, {
  push,
  onClear: logout,
})(AdminStudentPage);