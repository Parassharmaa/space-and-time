import * as types from './constants'

export const set_loading = (yes = true) => {
  return {
    type: types.SET_LOADING,
    payload: yes
  }
}

export const set_application_modal = (payload) => {
  return {
    type: types.SET_APPLICATION_MODAL,
    payload: payload
  }
}

export const set_complaint_modal = (payload) => {
  return {
    type: types.SET_COMPLAINT_MODAL,
    payload: payload
  }
}

