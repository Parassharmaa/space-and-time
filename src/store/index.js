import {
  createStore as _createStore,
  applyMiddleware,
  combineReducers
} from 'redux'
import thunk from 'redux-thunk'
import { reducers, actions } from './modules'


const middleware = applyMiddleware(thunk)

const createStore = (data = {}) => {
  return _createStore(combineReducers(reducers), data, middleware)
}

export { createStore, actions }