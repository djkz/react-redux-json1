import { INITIALIZE_API, LOAD_JSON, REMOVE_JSON, REMOVE_JSON, RESET_JSON, API_UPDATE_ALL, API_DELETE_ALL } from '../actions/api';

function load_item(state , item){
  index = _.findIndex(state, s => s.id == item.id)
  if (index < 0 ) return state;

  return [ ...state.slice(0,index), item, ...state.slice(index + 1) ] 
}

function load_attributes(state, id, attributes){
  if (!state) return;

  obj = _.extend({}, attributes, {id:id})
  index = _.findIndex(state, s => s.id == obj.id)

  if ( index < 0) return [...state, obj ];

  return [ ...state.slice(0,index), obj, ...state.slice(index + 1) ] 
}

function remove_attributes(state, id){
  index = _.findIndex(state, s => s.id == id)

  if ( index < 0) return state;
  return [ ...state.slice(0,index), ...state.slice(index + 1) ] 
}

function load_data(state, data){
  if (!data) return state;
  new_state = _.extend({}, state)

  if ( _.isArray( data ) ){
    _.forEach( data, data_item => {
      new_state = api_reducers.load_data( new_state, data_item )
    });

    return new_state;
  }

  model =  api_reducers.load_attributes( state[data.type], data.id , data.attributes )
  new_state[data.type] = model
  return new_state;
}

function remove_data(state, data){
  new_state = _.extend({}, state)
  model =  api_reducers.remove_attributes( state[data.type], data.id)
  new_state[data.type] = model
  return new_state;
}

function load_included(state, included){
  if (typeof included === "undefined" ) return state;

  new_state = _.extend({}, state)
  _.forEach(included, function(item){
    if (typeof new_state[item.type] === "undefined") {
      new_state[item.type] = []
    }
    new_state[item.type] = api_reducers.load_attributes(new_state[item.type], item.id, item.attributes); 
  })
    
  return new_state;
}

function update_all(state, model, condition, replace ){
  if (typeof state[model] === "undefined") return state;
  new_state = _.extend({}, state)

  _.forEach( new_state[model], function(item) {
    if( condition(item) ){
      replace(item);
    }
  })
  return new_state

}

function delete_all(state, model, condition){
  if (typeof state[model] === "undefined") return state;
  let new_state = _.extend({}, state)

  _.forEach( new_state[model], function(item) {
    if( condition(item) ){
      item = null
    }
  })
  new_state[model] = _.compact(new_state[model])

  return new_state

}

export default function api(state = {}, action){
  switch (action.type) {
    case INITIALIZE_API:
      return action.data
    case RESET_JSON:
      new_state= _.extend(state,{})
      new_state[action.section] = []
      return new_state;
    case LOAD_JSON:
      if (!action.result) return state;
      with_included = api_reducers.load_included( state, action.result.included )
      with_data = api_reducers.load_data(with_included, action.result.data)
      return with_data
    case RELOAD_JSON:
      new_state= _.extend(state,{})
      _.keys(action.data).map( k => new_state[k] = action.data[k] )
      return new_state
    case REMOVE_JSON:
      if (!action.result) return state;
      removed =  api_reducers.remove_data(state, action.result.data)
      with_included = api_reducers.load_included( removed, action.result.included )
      return with_included
    case API_UPDATE_ALL:
      return api_reducers.update_all(state, action.model, action.condition, action.replacement)
    case API_DELETE_ALL:
      return api_reducers.delete_all(state, action.model, action.condition)
    default:
      return state
  }
}
