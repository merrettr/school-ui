import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createBehaviour, fetchBehaviourCategories } from '../actions';
import BehaviourForm from '../components/BehaviourForm';
import Error from '../components/Error';
import Spinner from '../components/Spinner';

class AdminCreateBehaviourPage extends Component {

  componentWillMount() {
    const { categories, onFetchCategories, isFetchingCategories } = this.props;

    if (categories.length === 0 && !isFetchingCategories) {
      onFetchCategories();
    }
  }

  componentWillReceiveProps(next) {
    const { onNavigate, isSuccess } = this.props;
    
    if (!isSuccess && next.isSuccess) {
      onNavigate('/editor/behaviour');
    }
  }

  render() {
    const {isFetching, error, onCreateBehaviour, categories, isFetchingCategories } = this.props;

    if (isFetchingCategories) {
      return <Spinner />;
    }

    return <div>
      <BehaviourForm
        onSubmit={onCreateBehaviour}
        isSubmitting={isFetching}
        categories={categories}
      />
      <Error message={error}/>
    </div>
  }
}

const mapStateToProps = ({
  entities,
  behaviour: { create },
  behaviourCategories: { fetch }
}) => ({
  categories: fetch.ids
    .map(id => entities.behaviourCategories[id])
    .filter(c => c.isEnabled),
  isFetching: create.isFetching,
  isSuccess: create.isSuccess,
  error: create.error,
  isFetchingCategories: fetch.isFetching,
});

export default connect(mapStateToProps, {
  onFetchCategories: fetchBehaviourCategories,
  onCreateBehaviour: createBehaviour,
  onNavigate: push,
})(AdminCreateBehaviourPage);