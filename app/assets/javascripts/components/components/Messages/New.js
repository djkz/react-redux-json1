import React, { Component, PropTypes } from 'react';

class NewMessage extends Component {

  render() {
    const {form, update_model, form_create, onMessageCreated } = this.props;
    return <form onSubmit={(e) => form_create(e, form, onMessageCreated)}>
      <label>
        Compose New Message
        <span className="error">{ form.errors.body && form.errors.body[0] }</span>
      </label>
      <textarea value={form.model.body} onChange={(e) => update_model('body', e.target.value)} autoFocus />
      <input type="submit" value="Send Message" />
      </form>
  }
}

export default NewMessage;
