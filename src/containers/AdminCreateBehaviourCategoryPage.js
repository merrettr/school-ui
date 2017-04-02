import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createBehaviourCategory } from '../actions';
import BehaviourCategoryForm from '../components/BehaviourCategoryForm';
import Error from '../components/Error';

class AdminCreateBehaviourCategoryPage extends Component {

  componentWillReceiveProps(next) {
    const { onNavigate, isSuccess } = this.props;
    
    if (!isSuccess && next.isSuccess) {
      onNavigate('/editor/behaviour-categories');
    }
  }

  render() {
    const {isFetching, error, onCreateCategory} = this.props;

    return <div>
      <BehaviourCategoryForm
        onSubmit={onCreateCategory}
        isSubmitting={isFetching}
      />
      <Error message={error}/>
    </div>
  }
}

const mapStateToProps = ({
  behaviourCategories: { create },
}) => ({
  isFetching: create.isFetching,
  isSuccess: create.isSuccess,
  error: create.error,
});

export default connect(mapStateToProps, {
  onCreateCategory: createBehaviourCategory,
  onNavigate: push,
})(AdminCreateBehaviourCategoryPage);