import { handleActions } from "redux-actions";
import { SET_LOADING, SET_LOGIN_DIALOG, SET_CONTRIBUTION_DIALOG, SET_EDIT_CONTRIBUTION } from "./constants";

const initialState = {
  loading: false,
  loginDialog: false,
  contributionDialog: false,
  editContribution: {}
};

export default handleActions(
  {
    [SET_LOADING]: (state = initialState, action) => {
      return {
        ...state,
        loading: action.payload
      };
    },
    [SET_LOGIN_DIALOG]: (state = initialState) => {
      return {
        ...state,
        loginDialog: !state.loginDialog
      };
    },
    [SET_CONTRIBUTION_DIALOG]: (state = initialState) => {
      return {
        ...state,
        contributionDialog: !state.contributionDialog
      };
    },
    [SET_EDIT_CONTRIBUTION]: (state = initialState, action) => {
      return {
        ...state,
        editContribution: action.payload
      };
    }
  },
  initialState
);
