import { handleActions } from 'redux-actions'
import { SET_LOADING, SET_APPLICATION_MODAL, SET_COMPLAINT_MODAL } from './constants'


const initialState = {
  loading: false,
  applicationModal: false,
  complaintModal: false
}

export default handleActions(
  {
    [SET_LOADING]: (state = initialState, action) => {
      return {
        ...state,
        loading: action.payload
      }
    },
    [SET_APPLICATION_MODAL]: (state = initialState, action) => {
      return {
        ...state,
        applicationModal: action.payload
      }
    },
    [SET_COMPLAINT_MODAL]: (state = initialState, action) => {
      return {
        ...state,
        complaintModal: action.payload
      }
    }
  },
  initialState
)