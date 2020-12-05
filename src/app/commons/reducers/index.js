import { combineReducers } from 'redux'
import task from '../../task/reducers/task'
import modal from './modal'
import user from '../../user/reducers/user'

export default combineReducers({
    task, modal, user
})