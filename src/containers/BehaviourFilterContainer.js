import { connect } from 'react-redux';
import BehaviourFilterForm from './BehaviourFilterForm';
import { fetchObservations } from '../actions';

export default connect(null, {
  onSubmit: fetchObservations,
})(BehaviourFilterForm);