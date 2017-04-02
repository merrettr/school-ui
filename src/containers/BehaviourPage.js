import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchBehaviour } from '../actions';
import List from '../components/List';
import ListItem from '../components/ListItem';
import Spinner from '../components/Spinner';
import Heading from '../components/Heading';

class BehaviourPage extends Component {
  componentWillMount() {
    const { behaviour, onFetchBehaviour, isFetching } = this.props;

    if (behaviour.length === 0 && !isFetching) {
      onFetchBehaviour();
    }
  }

  render() {
    const { isFetching, behaviour, onNavigate, studentId, categoryId } = this.props;

    if (isFetching) {
      return <Spinner />
    }

    if (behaviour.length === 0) {
      return <Heading>There are no behaviours for this category yet</Heading>;
    }

    return <div>
      <Heading>Select a behaviour</Heading>
      <List
        items={behaviour}
        columns={1}
        onRender={({ id, description }) =>
          <ListItem
            onClick={i => onNavigate(`/student/${studentId}/category/${categoryId}/behaviour/${id}/observation`)}
          >
            {description}
          </ListItem>
        }
      />
    </div>
  }
}

const mapStateToProps = ({
  entities: { behaviour },
  behaviour: { fetch: { ids, isFetching } }
}, {
  params: { studentId, categoryId }
}) => ({
  behaviour: ids
    .map(id => behaviour[id])
    .filter(b => b.isEnabled && String(b.behaviourCategoryId) === categoryId),
  isFetching,
  studentId,
  categoryId,
});

export default connect(mapStateToProps, {
  onFetchBehaviour: fetchBehaviour,
  onNavigate: push,
})(BehaviourPage);