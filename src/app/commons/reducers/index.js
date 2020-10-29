import { combineReducers } from 'redux'
import calendar from '../../calendar/reducers/calendar'
import modal from './modal'
import infoUser from './infoUser'

export default combineReducers({
    calendar, modal, infoUser
})