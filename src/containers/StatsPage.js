import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import List from '../components/List';
import ListItem from '../components/ListItem';

const StatsPage = ({ onNavigate }) =>
  <List 
    items={[
      {name: 'By Student', route: '/reports/stats/student'},
      {name: 'By Behaviour', route: '/reports/stats/behaviour'},
      {name: 'By Teacher', route: '/reports/stats/teacher'},
    ]}
    onRender={({ name, route }) =>
      <ListItem onClick={() => onNavigate(route)} >{name}</ListItem>}
  />;

export default connect(null, {
  onNavigate: push,
})(StatsPage);
