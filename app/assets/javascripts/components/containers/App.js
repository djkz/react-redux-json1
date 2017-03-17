import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InboxApp from '../components/InboxApp'
import * as ApiActions from '../actions/api';

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ApiActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InboxApp);
