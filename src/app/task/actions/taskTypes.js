const CALENDAR_TYPES = {
    SET_YEAR_MONTH: 'SET_YEAR_MONTH',
    SET_DATE: 'DATE',
    TODAY_TASKS: 'TODAY_TASKS',
    LIST_TASKS: 'LIST_TASKS',
    CREATE_TASK: 'CREATE_TASK',
    EDIT_TASK: 'EDIT_TASK',
    DELETE: {
        BY_DATE: 'DELETE_TASK_BY_DATE',
        BY_ID: 'DELETE_TASK_BY_ID'
    }
}

const DASHBOARD_TYPES = {
    LIST_DASHBOARDS: 'LIST_DASHBOARDS',
    CREATE_DASHBOARD: 'CREATE_DASHBOARD',
    EDIT_DASHBOARD: 'EDIT_DASHBOARD',
    DELETE_DASHBOARD: 'DELETE_DASHBOARD',
    SET_IDX_DASHBOARD: 'SET_IDX_DASHBOARD'
}

export { CALENDAR_TYPES, DASHBOARD_TYPES };