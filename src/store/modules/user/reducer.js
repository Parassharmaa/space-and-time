import { handleActions } from 'redux-actions'
import { SET_EMAIL, SET_LOGGED_IN, SET_NAME, SET_AUTH_TOKEN, SET_PIC } from './constants'

const initialState = {
	email: '',
	name: '',
	loggedIn: false,
	pic: '',
	auth_token: ''
}

export default handleActions({
    [SET_EMAIL]: (state = initialState, action) => {
      return {
        ...state,
        email: action.payload
      }
    },
    [SET_LOGGED_IN]: (state = initialState, action) => {
      return {
        ...state,
        loggedIn: action.payload
      }
    },
    [SET_NAME]: (state = initialState, action) => {
      return {
        ...state,
        name: action.payload
			}
		},
		[SET_AUTH_TOKEN]: (state = initialState, action) => {
      return {
        ...state,
        auth_token: action.payload
			}
		},
		[SET_PIC]: (state = initialState, action) => {
      return {
        ...state,
        pic: action.payload
			}
		}
  },
  initialState
)