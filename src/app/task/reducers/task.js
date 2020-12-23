import { CALENDAR_TYPES, DASHBOARD_TYPES } from '../actions/taskTypes'
import {
    addNewYearToList,
    getTaskByMonth,
    getTdByMonth,
    isDifferentYYMM,
    getTaskFromDashboards
} from '../../util/funcCalendar'
import { SYSDATE } from '../../util/const'
import { fillNumberList, fragmentDate } from '../../util/func'

const CURRENT_YEAR = SYSDATE.getFullYear();

const initialState = {
    date: fragmentDate(SYSDATE),
    years: fillNumberList(CURRENT_YEAR - 3, CURRENT_YEAR + 3),
    dashboards: [],
    idxDashboard: 0,
    tasks: [],
    tasksByMonth: [],
    todayTasks: []
}

const task = (state = initialState, action) => {
    let date = state.date;
    let newDate = {};
    let tasks = state.tasks
    let tasksByMonth = state.tasksByMonth;
    let years = [...state.years]
    switch (action.type) {
        case CALENDAR_TYPES.SET_YEAR_MONTH:
            newDate = { ...state.date, ...action.payload }
            tasksByMonth = isDifferentYYMM(date, newDate) ? getTaskByMonth(tasks, newDate) : tasksByMonth
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
            tasksByMonth = isDifferentYYMM(date, newDate) ? getTaskByMonth(tasks, newDate) : tasksByMonth
            return {
                ...state,
                years: years,
                date: newDate,
                tasksByMonth: tasksByMonth,
                todayTasks: isDifferentYYMM(date, newDate) ? getTdByMonth(state.todayTasks, date, tasksByMonth) :
                    state.todayTasks
            }
        case DASHBOARD_TYPES.LIST_DASHBOARDS:
            tasks = getTaskFromDashboards(action.payload)
            return {
                ...state,
                tasks: tasks,
                tasksByMonth: getTaskByMonth(tasks, date),
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