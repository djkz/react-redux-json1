import React, { Component, PropTypes } from 'react';

class InboxApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
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
    this.setState({ selected: index })
  }

  render() {
    const {inboxes} = this.props;

    return (
      <div className="container">
        <div className="sidebar">
          <div onClick={(e) => this.onSelectContacts()} className={this.itemClassName(0)}>Contacts</div>
          { inboxes.map( (inbox, index) => <div key={index} onClick={(e) => this.onSelectInbox(inbox, index + 1)} className={this.itemClassName(index + 1)}>{ inbox.name }</div> ) }
        </div>
        <div className="main">
        </div>
      </div>
    );
  }
}

export default InboxApp;
