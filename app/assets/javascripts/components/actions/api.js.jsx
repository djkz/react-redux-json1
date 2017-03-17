export const INITIALIZE_API = 'INITIALIZE_API'
export const LOAD_JSON = 'LOAD_JSON'
export const RELOAD_JSON = 'RELOAD_JSON'
export const REMOVE_JSON = 'REMOVE_JSON'
export const RESET_JSON = 'RESET_JSON'
export const API_UPDATE_ALL = 'API_UPDATE_ALL'
export const API_DELETE_ALL = 'API_DELETE_ALL'

export function initialize(data){
  return {type:"INITIALIZE_API", data}
}

export function load(result){
  return {type:"LOAD_JSON", result}
}

export function reload(result){
  return {type:"RELOAD_JSON", data: result.data}
}

export function remove(result){
  return {type:"REMOVE_JSON", result}
}

export function reset(section){
  return {type:"RESET_JSON", section}
}

export function update_all(model, condition, replacement){
  return {type:"API_UPDATE_ALL", model, condition, replacement}
}

export function delete_all(model, condition){
  return {type:"API_DELETE_ALL", model, condition}
}


