export const NEW = 'NEW'
export const EDIT = 'EDIT'
export const DESTROY = 'DESTROY'
export const UPDATE = 'UPDATE'
export const UPDATE_MODEL = 'UPDATE_MODEL'
export const ADD_ERRORS = 'ADD_ERRORS'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'
import * as ApiAction from './api';

export function form_new(controller, model_name, model){
  return {type: NEW, controller, model_name, model}
}

export function update_model(name, value){
  return {type: UPDATE_MODEL, name, value}
}

function add_errors(errors){
  return {type: ADD_ERRORS, errors}
}

function clear_errors(){
  return {type: CLEAR_ERRORS}
}

// if you use routing here you can make it change route to the new resource
export function form_create(e, form, onSuccess = null){
  return dispatch => {
    e.preventDefault();
    dispatch( clear_errors() );

    let data = {
      _method: 'create'
    }
    data[form.model_name] = form.model

    $.post( form.controller, data).
      done((result) => {
        dispatch( ApiAction.load( result ));
        if (onSuccess) onSuccess(result);
      }).
      fail((xhr, status, error) => {
        if (xhr.responseJSON){
          // set form errors here
          dispatch(add_errors(  xhr.responseJSON.errors ));
        } else {
          alert(error);
        }
      })
  }
}

export function form_show( controller, id ){
  return dispatch => {
    $.get( controller + '/' + id ).
      done((result) => {
        dispatch( ApiAction.load( result ));
      }).
      fail((xhr, status, error) => {
        alert(error);
      })
  }
}
