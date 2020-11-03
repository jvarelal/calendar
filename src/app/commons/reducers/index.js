import { combineReducers } from 'redux'
import calendar from '../../calendar/reducers/calendar'
import modal from './modal'
import user from '../../user/reducers/user'

export default combineReducers({
    calendar, modal, user
})