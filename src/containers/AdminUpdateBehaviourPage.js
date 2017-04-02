import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchBehaviourCategories, fetchBehaviour, updateBehaviour } from '../actions';
import BehaviourForm from '../components/BehaviourForm';
import Error from '../components/Error';
import Spinner from '../components/Spinner';

class AdminCreateBehaviourPage extends Component {

  componentWillMount() {
    const {
      categories,
      behaviour,
      onFetchCategories,
      onFetchBehaviour,
      isFetchingCategories,
      isFetchingBehaviour
    } = this.props;

    if (categories.length === 0 && !isFetchingCategories) {
      onFetchCategories();
    }

    if (!behaviour && !isFetchingBehaviour) {
      onFetchBehaviour();
    }
  }

  componentWillReceiveProps(next) {
    const { onNavigate, isSuccess } = this.props;
    
    if (!isSuccess && next.isSuccess) {
      onNavigate('/admin/behaviour');
    }
  }

  render() {
    const {
      isFetchingCategories,
      isFetchingBehaviour,
      isUpdating,
      error,
      onUpdateBehaviour,
      categories,
      behaviour
    } = this.props;

    if (isFetchingCategories || isFetchingBehaviour) {
      return <Spinner />;
    }

    return <div>
      <BehaviourForm
        onSubmit={onUpdateBehaviour}
        isSubmitting={isUpdating}
        categories={categories}
        initialValues={behaviour}
      />
      <Error message={error}/>
    </div>
  }
}

const mapStateToProps = ({
  entities,
  behaviour,
  behaviourCategories,
}, {
  params: {id}
}) => ({
  categories: behaviourCategories.fetch.ids
    .map(i => entities.behaviourCategories[i])
    .filter(c => c.isEnabled),
  behaviour: entities.behaviour[id],
  isFetchingCategories:  behaviourCategories.fetch.isFetching,
  isFetchingBehaviour: behaviour.fetch.isFetching,
  isUpdating: behaviour.update.isFetching,
  isSuccess: behaviour.update.isSuccess,
  error: behaviour.update.error || behaviourCategories.fetch.error || behaviour.fetch.error,
});

export default connect(mapStateToProps, {
  onFetchCategories: fetchBehaviourCategories,
  onFetchBehaviour: fetchBehaviour,
  onUpdateBehaviour: updateBehaviour,
  onNavigate: push,
})(AdminCreateBehaviourPage);