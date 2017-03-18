import React, { Component, PropTypes } from 'react';

class InboxApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      inbox: null
    };
  }  

  itemClassName(index){
    let class_name = 'item'
    if (index == this.state.selected) class_name += " selected"

    return class_name
  }

  onSelectContacts(){
    this.setState({ selected: 0 })
  }

  onSelectInbox(inbox, index){
    this.setState({ selected: index, inbox: inbox.id })
  }

  onNewInbox(){
    this.setState({ selected: this.props.inboxes.length + 2 })
  }

  renderSidebar(inboxes){
    return (
      <div className="sidebar">
        <div onClick={(e) => this.onSelectContacts()} className={this.itemClassName(0)}>Contacts</div>
        { inboxes.map( (inbox, index) => <div key={index} onClick={(e) => this.onSelectInbox(inbox, index + 1)} className={this.itemClassName(index + 1)}>{ inbox.name }</div> ) }
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
          { this.state.selected == 0 && <span>Contacts</span> }
          { this.state.selected > 0 && this.state.selected < inboxes.length + 2 && <span>Inbox {this.state.inbox}</span> }
          { this.state.selected == inboxes.length + 2 && <span>New Inbox</span> }
        </div>
      </div>
    );
  }
}

export default InboxApp;
