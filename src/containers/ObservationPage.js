import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createObservation } from '../actions';
import ObservationForm from '../components/ObservationForm';
import Error from '../components/Error';

class ObservationPage extends Component {

  componentWillReceiveProps(next) {
    const { isSuccess, onNavigate } = this.props;

    if (!isSuccess && next.isSuccess) {
      onNavigate('/');
    }
  }

  render() {
    const { isCreating, error, studentId, behaviourId, onCreateObservation } = this.props;

    return <div>
      <ObservationForm
        onSubmit={onCreateObservation}
        isSubmitting={isCreating}
        initialValues={{ studentId, behaviourId }}
      />
      <Error message={error}/>
    </div>
  }
};

const mapStateToProps = ({
  observations: { create }
}, {
  params: { studentId, behaviourId }
}) => ({
  isCreating: create.isFetching,
  studentId,
  behaviourId,
  isSuccess: create.isSuccess,
  error: create.error,
});

export default connect(mapStateToProps, {
  onCreateObservation: createObservation,
  onNavigate: push,
})(ObservationPage);