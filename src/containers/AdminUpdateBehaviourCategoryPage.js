import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchBehaviourCategories, updateBehaviourCategory } from '../actions';
import BehaviourCategoryForm from '../components/BehaviourCategoryForm';
import Error from '../components/Error';
import Spinner from '../components/Spinner';

class AdminUpdateBehaviourCategoryPage extends Component {

  componentWillMount() {
    const { category, onFetchCategories, isFetching } = this.props;

    if (!category && !isFetching) {
      onFetchCategories();
    }
  }

  componentWillReceiveProps(next) {
    const { onNavigate, isSuccess } = this.props;
    
    if (!isSuccess && next.isSuccess) {
      onNavigate('/admin/behaviour-categories');
    }
  }

  render() {
    const {isFetching, isUpdating, error, category, onUpdateCategory} = this.props;

    if (isFetching) {
      return <Spinner />;
    }

    return <div>
      <BehaviourCategoryForm
        onSubmit={onUpdateCategory}
        isSubmitting={isUpdating}
        initialValues={category}
      />
      <Error message={error}/>
    </div>
  }
}

const mapStateToProps = ({
  entities: { behaviourCategories },
  behaviourCategories: { fetch, update },
}, {
  params: {id}
}) => ({
  category: behaviourCategories[id],
  isFetching: fetch.isFetching,
  isUpdating: update.isFetching,
  isSuccess: update.isSuccess,
  error: update.error,
});

export default connect(mapStateToProps, {
  onFetchCategories: fetchBehaviourCategories,
  onUpdateCategory: updateBehaviourCategory,
  onNavigate: push,
})(AdminUpdateBehaviourCategoryPage);