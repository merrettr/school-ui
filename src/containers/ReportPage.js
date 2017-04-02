import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchReport } from '../actions';
import Spinner from '../components/Spinner';
import Error from '../components/Error';
import Report from '../components/Report';

class ReportPage extends Component {

  componentWillMount() {
    const { reportType, onFetchReport } = this.props;
    onFetchReport(reportType);
  }

  render() {
    const { isFetching, error, data } = this.props;

    if (isFetching) {
      return <Spinner />;
    }
    if (error) {
      return <Error message={error} />;
    }

    return <Report data={data} />;
  }
}

const mapStateToProps = ({
  reports: { entities, isFetching, error }
}, {
  params: { type }
}) => ({
  data: entities,
  isFetching: isFetching,
  reportType: type,
});

export default connect(mapStateToProps, {
  onFetchReport: fetchReport,
})(ReportPage);