import { CALENDAR_TYPES, DASHBOARD_TYPES } from './taskTypes'
import { dashboardClient } from '../../commons/service/clientService'
import { insertArrayWithId, replaceById } from '../../commons/util/func'

const setYearMonth = target => ({
    type: CALENDAR_TYPES.SET_YEAR_MONTH,
    payload: { [target.name]: Number(target.value) }
})

const setDate = date => ({
    type: CALENDAR_TYPES.SET_DATE,
    payload: date
})

const processTask = (dashboards, task, dismiss) => {
    const dashboard = dashboards.find(d => d.id === task.dashboard.id)
    const idGroup = task.dashboard.idGroup
    for (let i = 0; i < dashboard.groups.length; i++) {
        if (dashboard.groups[i].id === idGroup) {
            task.dismiss = dismiss ? true : false
            delete task.dashboard
            if (!task.id) {
                task.creation = new Date().toLocaleDateString()
                task.edition = [new Date().toLocaleDateString()]
                dashboard.groups[i].tasks = insertArrayWithId(dashboard.groups[i].tasks, task)
            } else {
                task.editions.push(new Date().toLocaleDateString())
                dashboard.groups[i].tasks = replaceById(dashboard.groups[i].tasks, task)
            }
            break;
        }
    }
    return dashboardClient(DASHBOARD_TYPES.EDIT_GROUP, dashboard)
}

const deleteTask = (dashboards, task) => {
    const dashboard = dashboards.find(d => d.id === task.dashboard.id)
    const idGroup = task.dashboard.idGroup
    for (let i = 0; i < dashboard.groups.length; i++) {
        if (dashboard.groups[i].id === idGroup) {
            dashboard.groups[i].tasks = dashboard.groups[i].tasks.filter(t => t.id !== task.id)
            break;
        }
    }
    return dashboardClient(DASHBOARD_TYPES.EDIT_GROUP, dashboard)
}

const deleteGroup = (dashboard, group) => {
    dashboard.groups = dashboard.groups.filter(g => g.id !== group.id)
    return dashboardClient(DASHBOARD_TYPES.EDIT_GROUP, dashboard)
}

const processGroup = (dashboard) => dashboardClient(DASHBOARD_TYPES.EDIT_GROUP, dashboard)

const updateTaskPosition = (dashboard, newIdGroup, idxTask, task) => {
    const idGroup = task.dashboard.idGroup
    for (let i = 0; i < dashboard.groups.length; i++) {
        if (dashboard.groups[i].id === idGroup) {
            dashboard.groups[i].tasks = dashboard.groups[i].tasks.filter(t => t.id !== task.id)
        }
        if (dashboard.groups[i].id === newIdGroup) {
            dashboard.groups[i].tasks.splice(idxTask, 0, task);
        }
    }
    return dashboardClient(DASHBOARD_TYPES.EDIT_GROUP, dashboard)
}

const createDashboard = dashboard => dashboardClient(DASHBOARD_TYPES.CREATE_DASHBOARD, {
    ...dashboard,
    creation: new Date().toLocaleDateString()
})

const readDashboards = user => dashboardClient(DASHBOARD_TYPES.LIST_DASHBOARDS, user)

const updateDashboard = dashboard => dashboardClient(DASHBOARD_TYPES.EDIT_DASHBOARD, dashboard)

const deleteDashboard = dashboard => dashboardClient(DASHBOARD_TYPES.DELETE_DASHBOARD, dashboard)

const setIdxDashboard = idx => ({ type: DASHBOARD_TYPES.SET_IDX_DASHBOARD, payload: idx })

const resetDashboard = () => ({ type: DASHBOARD_TYPES.LIST_DASHBOARDS, payload: [] })

export { createDashboard, readDashboards, updateDashboard, deleteDashboard, setIdxDashboard }

export {
    setDate,
    setYearMonth,
    deleteTask,
    processTask,
    deleteGroup,
    processGroup,
    resetDashboard,
    updateTaskPosition
}
