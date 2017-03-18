import { INITIALIZE_API, LOAD_JSON, RELOAD_JSON, REMOVE_JSON, RESET_JSON, API_UPDATE_ALL, API_DELETE_ALL } from '../actions/api';

function load_item(state , item){
  let index = state.findIndex( s => s.id == item.id)
  if (index < 0 ) return state;

  return [ ...state.slice(0,index), item, ...state.slice(index + 1) ] 
}

function load_attributes(state, id, attributes){
  if (!state) return;

  let obj = Object.assign({}, attributes, {id:id})
  let index = state.findIndex( s => s.id == obj.id)

  if ( index < 0) return [...state, obj ];

  return [ ...state.slice(0,index), obj, ...state.slice(index + 1) ] 
}

function remove_attributes(state, id){
  let index = state.findIndex( s => s.id == id)

  if ( index < 0) return state;
  return [ ...state.slice(0,index), ...state.slice(index + 1) ] 
}

function load_data(state, data){
  if (!data) return state;
  let new_state = Object.assign({}, state)

  if ( Array.isArray( data ) ){
    data.forEach( data_item => {
      new_state = load_data( new_state, data_item )
    });

    return new_state;
  }

  let model =  load_attributes( state[data.type], data.id , data.attributes )
  new_state[data.type] = model
  return new_state;
}

function remove_data(state, data){
  let new_state = Object.assign({}, state)
  let model =  remove_attributes( state[data.type], data.id)
  new_state[data.type] = model
  return new_state;
}

function load_included(state, included){
  if (typeof included === "undefined" ) return state;

  let new_state = Object.assign({}, state)
  included.forEach( function(item){
    if (typeof new_state[item.type] === "undefined") {
      new_state[item.type] = []
    }
    new_state[item.type] = load_attributes(new_state[item.type], item.id, item.attributes); 
  })
    
  return new_state;
}

function update_all(state, model, condition, replace ){
  if (typeof state[model] === "undefined") return state;
  let new_state = Object.assign({}, state)

  new_state[model].forEach(function(item) {
    if( condition(item) ){
      replace(item);
    }
  })
  return new_state

}

function delete_all(state, model, condition){
  if (typeof state[model] === "undefined") return state;
  let new_state = Object.assign({}, state)

  new_state[model] = new_state[model].filter( function(item) {
    return condition(item)
  })

  return new_state

}

export default function api(state = {}, action){
  let new_state = null
  let with_included = null
  let with_data = null

  switch (action.type) {
    case INITIALIZE_API:
      return action.data
    case RESET_JSON:
      new_state = Object.assign({}, state)
      new_state[action.section] = []
      return new_state;
    case LOAD_JSON:
      if (!action.result) return state;
      with_included = load_included( state, action.result.included )
      with_data = load_data(with_included, action.result.data)
      return with_data
    case RELOAD_JSON:
      new_state = Object.assign({}, state)
      _.keys(action.data).map( k => new_state[k] = action.data[k] )
      return new_state
    case REMOVE_JSON:
      if (!action.result) return state;
      let removed =  remove_data(state, action.result.data)
      with_included = load_included( removed, action.result.included )
      return with_included
    case API_UPDATE_ALL:
      return update_all(state, action.model, action.condition, action.replacement)
    case API_DELETE_ALL:
      return delete_all(state, action.model, action.condition)
    default:
      return state
  }
}
