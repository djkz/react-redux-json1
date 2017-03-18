import React, { Component, PropTypes } from 'react';
import NewInbox from '../../containers/Inbox/New'

class InboxApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'contacts',
      inbox_id: null
    };
  }  

  itemClassName(selected, id = null){
    if (selected == this.state.selected && selected != "inbox" ) return "item selected"
    if (selected == 'inbox' && id == this.state.inbox_id) return "item selected"

    return 'item'
  }

  onSelectContacts(){
    this.setState({ selected: 'contacts' })
  }

  onSelectInbox(inbox){
    this.setState({ selected: 'inbox', inbox_id: inbox.id })
  }

  onCreateInbox(result){
    this.setState({ selected: 'inbox', inbox_id: result.data.id })
  }

  onNewInbox(){
    const {form_new} = this.props;
    form_new( 'inboxes', 'inbox', { name: '' })

    this.setState({ selected: 'new_inbox' })
  }

  renderSidebar(inboxes){
    return (
      <div className="sidebar">
        <div onClick={(e) => this.onSelectContacts()} className={this.itemClassName('contacts')}>Contacts</div>
        { inboxes.map( (inbox, index) => <div key={index} onClick={(e) => this.onSelectInbox(inbox)} className={this.itemClassName('inbox', inbox.id)}>{ inbox.name }</div> ) }
        <div onClick={(e) => this.onNewInbox()} className={this.itemClassName(inboxes.length + 2)}>+ Add Inbox</div>
      </div>
    )
  }

  render() {
    const {inboxes} = this.props;

    return (
      <div className="container">
        { this.renderSidebar(inboxes) }
        <div className="main">
          { this.state.selected == 'contacts' && <span>Contacts</span> }
          { this.state.selected == 'inbox' && <span>Inbox {this.state.inbox_id}</span> }
          { this.state.selected == 'new_inbox' && <NewInbox onCreate={this.onCreateInbox.bind(this)} /> }
        </div>
      </div>
    );
  }
}

export default InboxApp;
