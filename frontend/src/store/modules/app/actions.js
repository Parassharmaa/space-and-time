import * as types from "./constants";

export const set_loading = payload => {
  return {
    type: types.SET_LOADING,
    payload: payload
  };
};

export const toggle_login_dialog = () => {
  return {
    type: types.SET_LOGIN_DIALOG
  };
};
