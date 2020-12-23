import { CALENDAR_TYPES, DASHBOARD_TYPES } from './taskTypes'
import { dashboardClient } from '../../service/client'

const setYearMonth = target => ({
    type: CALENDAR_TYPES.SET_YEAR_MONTH,
    payload: { [target.name]: Number(target.value) }
})

const setDate = date => ({
    type: CALENDAR_TYPES.SET_DATE,
    payload: date
})

const createDashboard = dashboard => dashboardClient(DASHBOARD_TYPES.CREATE_DASHBOARD, dashboard)

const readDashboards = user => dashboardClient(DASHBOARD_TYPES.LIST_DASHBOARDS, user)

const updateDashboard = dashboard => dashboardClient(DASHBOARD_TYPES.EDIT_DASHBOARD, dashboard)

const deleteDashboard = dashboard => dashboardClient(DASHBOARD_TYPES.DELETE_DASHBOARD, dashboard)

const setIdxDashboard = idx => ({ type: DASHBOARD_TYPES.SET_IDX_DASHBOARD, payload: idx })

const resetDashboard = () => ({ type: DASHBOARD_TYPES.LIST_DASHBOARDS, payload: [] })

const processGroup = dashboard => dashboardClient(DASHBOARD_TYPES.EDIT_GROUP, dashboard)

const deleteGroup = (dashboard, group) => dashboardClient(DASHBOARD_TYPES.DELETE_GROUP, { dashboard, group })

const processTask = (dashboard, task, dismiss = false) => dashboardClient(DASHBOARD_TYPES.EDIT_TASK, {
    dashboard,
    task: { ...task, dismiss: dismiss }
})

const deleteTask = (dashboard, task) => dashboardClient(DASHBOARD_TYPES.DELETE_TASK, { dashboard, task })

const updateTaskPosition = (dashboard, newIdGroup, idxTask, task) => dashboardClient(DASHBOARD_TYPES.MOVE_TASK, {
    dashboard,
    newIdGroup,
    idxTask,
    task
})

export {
    setDate,
    setYearMonth,
    deleteTask,
    processTask,
    deleteGroup,
    processGroup,
    createDashboard, readDashboards, updateDashboard, deleteDashboard, setIdxDashboard,
    resetDashboard,
    updateTaskPosition
}
