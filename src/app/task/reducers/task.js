import { CALENDAR_TYPES, DASHBOARD_TYPES } from '../actions/taskTypes'
import {
    addNewYearToList,
    getTaskByMonth,
    getTdByMonth,
    isDifferentYYMM
} from '../util/funcCalendar'
import { SYSDATE } from '../../commons/util/const'
import { fillNumberList, fragmentDate } from '../../commons/util/func'

const CURRENT_YEAR = SYSDATE.getFullYear();

const initialState = {
    date: fragmentDate(SYSDATE),
    years: fillNumberList(CURRENT_YEAR - 3, CURRENT_YEAR + 3),
    tasks: [],
    tasksByMonth: [],
    todayTasks: [],
    dashboards: [],
    idxDashboard: 0
}

const task = (state = initialState, action) => {
    let date = state.date;
    let newDate = {};
    let tasksByMonth = state.tasksByMonth;
    let years = [...state.years]
    switch (action.type) {
        case CALENDAR_TYPES.SET_YEAR_MONTH:
            newDate = { ...state.date, ...action.payload }
            tasksByMonth = isDifferentYYMM(date, newDate) ? getTaskByMonth(state.tasks, newDate) : tasksByMonth
            return {
                ...state,
                date: newDate,
                tasksByMonth: tasksByMonth,
                todayTasks: isDifferentYYMM(date, newDate) ? getTdByMonth(state.todayTasks, date, tasksByMonth) :
                    state.todayTasks
            }
        case CALENDAR_TYPES.SET_DATE:
            newDate = action.payload;
            years = addNewYearToList(newDate, years);
            tasksByMonth = isDifferentYYMM(date, newDate) ? getTaskByMonth(state.tasks, newDate) : tasksByMonth
            return {
                ...state,
                years: years,
                date: newDate,
                tasksByMonth: tasksByMonth,
                todayTasks: isDifferentYYMM(date, newDate) ? getTdByMonth(state.todayTasks, date, tasksByMonth) :
                    state.todayTasks
            }
        case CALENDAR_TYPES.LIST_TASKS:
            let tasks = action.payload;
            tasksByMonth = getTaskByMonth(tasks, date)
            return {
                ...state,
                tasks: tasks,
                tasksByMonth: tasksByMonth,
                todayTasks: getTdByMonth(state.todayTasks, state.date, tasksByMonth)
            }
        case DASHBOARD_TYPES.LIST_DASHBOARDS:
            return {
                ...state,
                dashboards: action.payload
            }
        case DASHBOARD_TYPES.SET_IDX_DASHBOARD:
            return {
                ...state,
                idxDashboard: action.payload
            }
        default:
            return state
    }
}

export default task