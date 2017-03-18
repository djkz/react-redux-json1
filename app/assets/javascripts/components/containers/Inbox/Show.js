import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ShowInbox from '../../components/Inbox/Show'
import * as FormActions from '../../actions/form';

function mapStateToProps(state, props) {
  let inbox = state.api.inboxes.find( i => i.id == props.id )
  let messages = []
  if (inbox && inbox.loaded) messages = state.api.messages.filter(m => m.inbox_id == inbox.id)
  return {
    inbox,
    messages
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FormActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowInbox);
