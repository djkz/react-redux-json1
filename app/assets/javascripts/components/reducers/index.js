import { combineReducers } from 'redux';
import api from './api';
import form from './form';

const rootReducer = combineReducers({
  api,
  form
});

export default rootReducer;
