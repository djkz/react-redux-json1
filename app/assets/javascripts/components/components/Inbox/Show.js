import React, { Component, PropTypes } from 'react';
import NewMessage from '../../containers/Messages/New'

class ShowInbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compose: false
    };
  }  

  onCompose(){
    const {form_new} = this.props;
    form_new( 'messages', 'message', { inbox_id: this.props.inbox.id, body: '' })

    this.setState({ compose: true})
  }

  onMessageCreated(){
    this.setState({ compose: false})
  }

  componentDidMount(){
    if (!this.props.inbox.loaded) this.props.form_show('inboxes', this.props.inbox.id )
  }

  render() {
    const {inbox, messages} = this.props;
    return (
      <div>
        <h1>{inbox.name}</h1>
        { inbox.loaded ?
          <div>
            { messages.map( m => <div className="message" key={m.id} dangerouslySetInnerHTML={{__html: m.clean_body }} /> )}
            { this.state.compose ? 
                <NewMessage onMessageCreated={this.onMessageCreated.bind(this)} />
              :
                <a onClick={(e) => this.onCompose()}>Compose New Message</a>
            }
          </div>
        :
          <div>Please wait, loading inbox...</div>
        }
      </div>
    )
  }
}

export default ShowInbox;
