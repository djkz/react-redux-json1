import React, { Component } from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import App from './Inbox/App';
import configureStore from '../store/configureStore';
import {initialize} from '../actions/api';

const store = configureStore();

export default class Root extends Component {
  componentWillMount() {
    store.dispatch(initialize({
      inboxes: this.props.inboxes,
      messages: []
    }))
  }

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
