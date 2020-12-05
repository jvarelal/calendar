import { CALENDAR_TYPES, DASHBOARD_TYPES } from './taskTypes'
import { calendarClient, dashboardClient } from '../../commons/service/clientService'

const setYearMonth = target => ({
    type: CALENDAR_TYPES.SET_YEAR_MONTH,
    payload: { [target.name]: Number(target.value) }
})

const setDate = date => ({
    type: CALENDAR_TYPES.SET_DATE,
    payload: date
})

const createTask = task => calendarClient(CALENDAR_TYPES.CREATE_TASK, {
    ...task,
    creation: new Date().toLocaleDateString(),
    editions: [new Date().toLocaleDateString()]
})

const readTasks = user => calendarClient(CALENDAR_TYPES.LIST_TASKS, user)

const updateTask = task => {
    task.editions.push(new Date().toLocaleDateString())
    return calendarClient(CALENDAR_TYPES.EDIT_TASK, task)
}

const deleteTasksByDate = (date, tasksByMonth) => {
    let taskByDay = tasksByMonth.filter(task => task.date.day === date.day)
    return calendarClient(CALENDAR_TYPES.DELETE.BY_DATE, taskByDay)
}

const deleteTaskById = task => calendarClient(CALENDAR_TYPES.DELETE.BY_ID, task)

const createDashboard = dashboard => dashboardClient(DASHBOARD_TYPES.CREATE_DASHBOARD, {
    ...dashboard,
    creation: new Date().toLocaleDateString(),
    editions: [new Date().toLocaleDateString()]
})

const readDashboards = user => dashboardClient(DASHBOARD_TYPES.LIST_DASHBOARDS, user)

const updateDashboard = dashboard => {
    dashboard.editions.push(new Date().toLocaleDateString())
    return dashboardClient(DASHBOARD_TYPES.EDIT_DASHBOARD, dashboard)
}

const deleteDashboard = dashboard => dashboardClient(DASHBOARD_TYPES.DELETE_DASHBOARD, dashboard)

const setIdxDashboard = idx => ({ type: DASHBOARD_TYPES.SET_IDX_DASHBOARD, payload: idx })

export { createDashboard, readDashboards, updateDashboard, deleteDashboard, setIdxDashboard }

export {
    setDate,
    setYearMonth,
    createTask,
    readTasks,
    updateTask,
    deleteTasksByDate,
    deleteTaskById
}