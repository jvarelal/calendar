import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import task from './task/reducers/task'
import modal from './layout/reducers/modal'
import user from './user/reducers/user'

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    task, modal, user
})

const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store;
