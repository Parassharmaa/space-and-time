import { handleActions } from "redux-actions";
import {
  SET_LOADING, SET_LOGIN_DIALOG
} from "./constants";

const initialState = {
  loading: false,
  loginDialog: false
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
      }
  },
  initialState
);
