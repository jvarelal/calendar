import { CALENDAR_TYPES } from '../actions/types'
import { fillNumberList, fragmentDate } from '../util/utilFunc'
import { SYSDATE } from '../util/utilConts'

const CURRENT_YEAR = SYSDATE.getFullYear();

const initialState = {
    date: fragmentDate(SYSDATE),
    years: fillNumberList(CURRENT_YEAR - 3, CURRENT_YEAR + 3),
    tasksByMonth: [],
    todayTasks: []
}

const calendar = (state = initialState, action) => {
    let date = state.date;
    switch (action.type) {
        case CALENDAR_TYPES.SET_YEAR_MONTH:
            let newDate = { ...state.date, ...action.payload }
            return { ...state, date: newDate }
        case CALENDAR_TYPES.SET_DATE:
            let years = [...state.years]
            date = action.payload;
            if (date.year < years[0]) {
                years = [date.year, ...years]
            }
            if (date.year > years[years.length - 1]) {
                years = [...years, date.year]
            }
            return {
                ...state,
                date: date,
                years: years
            }
        case CALENDAR_TYPES.LIST_TASKS:
            let tasksByMonth = action.payload;
            let todayTasks = state.todayTasks;
            if (date.year === SYSDATE.getFullYear()
                && date.month === SYSDATE.getMonth()) {
                todayTasks = tasksByMonth.filter(task => task.date.day === SYSDATE.getDate())
            }
            return {
                ...state,
                tasksByMonth: tasksByMonth,
                todayTasks: todayTasks
            }
        default:
            return state
    }
}

export default calendar