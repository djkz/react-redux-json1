import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NewMessage from '../../components/Messages/New'
import * as FormActions from '../../actions/form';

function mapStateToProps(state, props) {
  return {
    form: state.form,
    onMessageCreated: props.onMessageCreated
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FormActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);
