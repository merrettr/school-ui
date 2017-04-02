import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchBehaviourCategories } from '../actions';
import List from '../components/List';
import ListItem from '../components/ListItem';
import Spinner from '../components/Spinner';
import Heading from '../components/Heading';

class BehaviourCategoryPage extends Component {
  componentWillMount() {
    const { categories, onFetchCategories, isFetching } = this.props;

    if (categories.length === 0 && !isFetching) {
      onFetchCategories();
    }
  }

  render() {
    const { isFetching, categories, onNavigate, studentId } = this.props;

    if (isFetching) {
      return <Spinner />
    }

    if (categories.length === 0) {
      return <Heading>There are no active categories yet</Heading>;
    }

    return <div>
      <Heading>Select a category</Heading>
      <List
        items={categories}
        columns={1}
        onRender={({ id, description }) =>
          <ListItem
            onClick={i => onNavigate(`/student/${studentId}/category/${id}/behaviour`)}
          >
            {description}
          </ListItem>
        }
      />
    </div>;
  }
}

const mapStateToProps = ({
  entities: { behaviourCategories },
  behaviourCategories: { fetch: { ids, isFetching } }
}, {
  params: { studentId }
}) => ({
  categories: ids
    .map(id => behaviourCategories[id])
    .filter(c => c.isEnabled),
  isFetching,
  studentId,
});

export default connect(mapStateToProps, {
  onFetchCategories: fetchBehaviourCategories,
  onNavigate: push,
})(BehaviourCategoryPage);