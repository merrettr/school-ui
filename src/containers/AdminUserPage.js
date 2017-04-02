import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchInvites, createInvite } from '../actions';
import Spinner from '../components/Spinner';
import Error from '../components/Error';
import Separator from '../components/Separator';
import InviteTable from '../components/InviteTable';
import InviteForm from '../components/InviteForm';

class AdminStudentPage extends Component {
  componentWillMount() {
    const { invites, onFetchInvites } = this.props;

    if (invites.length === 0) {
      onFetchInvites();
    }
  }
  
  render() {
    const {
      invites,
      onCreateInvite,
      isFetching,
      isCreating,
      error,
    } = this.props;

    if (isFetching) {
      return <Spinner />;
    }

    return <div>
      <InviteForm
        onSubmit={onCreateInvite}
        isSubmitting={isCreating}
      />

      <Error message={error} />
      <Separator />

      {invites && invites.length > 0 && <InviteTable invites={invites} />}
    </div>;
  }
}

const mapStateToProps = ({
  entities: { invites },
  invites: { fetch, create },
}) => ({
  invites: fetch.ids.map(id => invites[id]),
  isFetching: fetch.isFetching,
  isCreating: create.isFetching,
  error: fetch.error || create.error,
});

export default connect(mapStateToProps, {
  onFetchInvites: fetchInvites,
  onCreateInvite: createInvite,
})(AdminStudentPage);