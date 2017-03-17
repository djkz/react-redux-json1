import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Inbox from '../components/Inbox';
import * as ApiActions from '../actions/api';

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ApiActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
