import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchStudents, invalidateStudents  } from '../actions';
import List from '../components/List';
import Student from '../components/Student';
import Spinner from '../components/Spinner';
import Input from '../components/Input';

class StudentPage extends Component {
  render() {
    const {
      isFetching,
      students,
      onNavigate,
      onFetchStudents,
    } = this.props;

    return <div>
      <Input
        onConfirm={onFetchStudents}
        placeholder="Search"
        confirmation="Search"
      />
      <Spinner visible={isFetching} />
      <List
        items={students}
        columns={1}
        onRender={student =>
          <Student {...student} onClick={id => onNavigate(`/student/${id}/category`)}/>}
      />
    </div>;
  }
}

const mapStateToProps = ({
  entities: { students },
  students: { fetch: { ids, isFetching } }
}) => ({
  students: ids.map(id => students[id]),
  isFetching,
});

export default connect(mapStateToProps, {
  onFetchStudents: fetchStudents,
  onNavigate: push,
  onInvalidateStudents: invalidateStudents,
})(StudentPage);