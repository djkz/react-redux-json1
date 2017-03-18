import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NewInbox from '../../components/Inbox/New'
import * as FormActions from '../../actions/form';

function mapStateToProps(state, props) {
  return {
    form: state.form,
    onCreate: props.onCreate
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FormActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewInbox);
