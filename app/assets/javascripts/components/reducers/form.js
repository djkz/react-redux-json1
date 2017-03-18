import { NEW, UPDATE_MODEL, ADD_ERRORS, CLEAR_ERRORS } from '../actions/form';

export default function form(state = { id: null, controller: '', model_name: '', model: {}, errors: {}}, action){
  let new_state = null
  switch (action.type) {
    case NEW:
      return { id: null, controller: action.controller, model_name: action.model_name, model: action.model, errors: {} }
    case UPDATE_MODEL:
      new_state = Object.assign({}, state)
      new_state.model[action.name] = action.value;
      return new_state
    case ADD_ERRORS:
      new_state = Object.assign({}, state)
      new_state.errors = action.errors
      return new_state
    case CLEAR_ERRORS:
      new_state = Object.assign({}, state)
      new_state.errors = {}
      return new_state
    default:
      return state
  }
}
