import * as types from './constants'


export const set_email = (payload) => {
  return {
    type: types.SET_EMAIL,
    payload: payload
  }
}

export const set_login = (payload) => {
  return {
    type: types.SET_LOGGED_IN,
    payload: payload
  }
}

export const set_auth_token = (payload) => {
  return {
    type: types.SET_AUTH_TOKEN,
    payload: payload
  }
}

export const set_pic = (payload) => {
  return {
    type: types.SET_PIC,
    payload: payload
  }
}

export const set_name = (payload) => {
  return {
    type: types.SET_NAME,
    payload: payload
  }
}
