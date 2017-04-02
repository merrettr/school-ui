import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchBehaviourCategories } from '../actions';
import Spinner from '../components/Spinner';
import List from '../components/List';
import ListItem from '../components/ListItem';
import Error from '../components/Error';
import Separator from '../components/Separator';

class AdminBehaviourCategoryPage extends Component {
  componentWillMount() {
    const { categories, onFetchCategories, isFetching } = this.props;

    if (categories.length === 0 && !isFetching) {
      onFetchCategories();
    }
  }

  render() {
    const { categories, isFetching, error, onNavigate } = this.props;

    if (isFetching) {
      return <Spinner />;
    }

    if (error) {
      return <Error message={error} />
    }

    const enabled = categories.filter(c => c.isEnabled);
    const disabled = categories.filter(c => !c.isEnabled);

    return <div>
      <List
        items={enabled}
        columns={2}
        firstItem={
          <ListItem
            key="0"
            onClick={() => onNavigate('/editor/behaviour-categories/create')}
            style={{
              backgroundColor: '#337ab7',
              borderColor: '#2e6da4',
              color: '#fff',
            }}
          >
            Create Category
          </ListItem>
        }
        onRender={({ id, description }) =>
          <ListItem
            key={id}
            onClick={() => onNavigate(`/editor/behaviour-categories/${id}`)}
          >
            {description}
          </ListItem>}
      />

      {disabled.length > 0 && <Separator title="Disabled" />}

      <List
        items={disabled}
        columns={2}
        onRender={({ id, description }) =>
          <ListItem
            key={id}
            onClick={() => onNavigate(`/editor/behaviour-categories/${id}`)}
          >
            {description}
          </ListItem>}
      />
    </div>;
  }
}

const mapStateToProps = ({
  entities: { behaviourCategories },
  behaviourCategories: { fetch },
}) => ({
  categories: fetch.ids.map(id => behaviourCategories[id]),
  isFetching: fetch.isFetching,
  error: fetch.error,
});

export default connect(mapStateToProps, {
  onFetchCategories: fetchBehaviourCategories,
  onNavigate: push,
})(AdminBehaviourCategoryPage);