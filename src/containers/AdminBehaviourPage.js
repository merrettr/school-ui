import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchBehaviour } from '../actions';
import Spinner from '../components/Spinner';
import List from '../components/List';
import ListItem from '../components/ListItem';
import Separator from '../components/Separator';
import Error from '../components/Error';

class AdminBehaviourPage extends Component {
  componentWillMount() {
    const { behaviour, onFetchBehaviour, isFetching } = this.props;

    if (behaviour.length === 0 && !isFetching) {
      onFetchBehaviour();
    }
  }

  render() {
    const { behaviour,  isFetching, error, onNavigate } = this.props;

    if (isFetching) {
      return <Spinner />;
    }

    if (error) {
      return <Error message={error} />
    }

    const enabled = behaviour.filter(b => b.isEnabled);
    const disabled = behaviour.filter(b => !b.isEnabled);

    return <div>
      <List
        items={enabled}
        columns={2}
        firstItem={
          <ListItem
            key="0"
            onClick={() => onNavigate('/admin/behaviour/create')}
            style={{
              backgroundColor: '#337ab7',
              borderColor: '#2e6da4',
              color: '#fff',
            }}
          >
            Create Behaviour
          </ListItem>
        }
        onRender={({ id, description }) =>
          <ListItem
            key={id}
            onClick={() => onNavigate(`/admin/behaviour/${id}`)}
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
            onClick={() => onNavigate(`/admin/behaviour/${id}`)}
          >
            {description}
          </ListItem>}
      />
    </div>;
  }
}

const mapStateToProps = ({
  entities: { behaviour },
  behaviour: { fetch },
}) => ({
  behaviour: fetch.ids.map(id => behaviour[id]),
  isFetching: fetch.isFetching,
  error: fetch.error,
});

export default connect(mapStateToProps, {
  onFetchBehaviour: fetchBehaviour,
  onNavigate: push,
})(AdminBehaviourPage);