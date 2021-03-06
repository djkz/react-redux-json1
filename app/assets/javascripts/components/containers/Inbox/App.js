import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InboxApp from '../../components/Inbox/InboxApp'
import * as FormActions from '../../actions/form';

function mapStateToProps(state) {
  return {
    inboxes: state.api.inboxes
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FormActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InboxApp);
