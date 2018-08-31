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

export const toggle_contribution_dialog = () => {
  return {
    type: types.SET_CONTRIBUTION_DIALOG
  };
};

export const set_edit_contribution = (payload) => {
  return {
    type: types.SET_EDIT_CONTRIBUTION,
    payload: payload
  };
};

