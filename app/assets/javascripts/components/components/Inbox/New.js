import React, { Component, PropTypes } from 'react';

class NewInbox extends Component {

  render() {
    const {form, update_model, form_create, onCreate} = this.props;
    return <form onSubmit={(e) => form_create(e, form, onCreate)}>
      <h1>New Inbox</h1>
      <label>
        Inbox Name
        <span className="error">{ form.errors.name && form.errors.name[0] }</span>
      </label>
      <input type="text" value={form.model.name} onChange={(e) => update_model('name', e.target.value)} autoFocus />
      <input type="submit" value="Create Inbox" />
      </form>
  }
}

export default NewInbox;
