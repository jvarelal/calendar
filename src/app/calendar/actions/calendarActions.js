import { CALENDAR_TYPES } from './calendarTypes'
import { calendarClient } from '../../commons/service/clientService'

const setYearMonth = target => ({
    type: CALENDAR_TYPES.SET_YEAR_MONTH,
    payload: { [target.name]: Number(target.value) }
})

const setDate = date => ({
    type: CALENDAR_TYPES.SET_DATE,
    payload: date
})

const createTask = task => calendarClient(CALENDAR_TYPES.CREATE_TASK, task)

const readTasks = date => calendarClient(CALENDAR_TYPES.LIST_TASKS, date)

const updateTask = task => calendarClient(CALENDAR_TYPES.EDIT_TASK, task)

const deleteTasksByDate = (date, tasksByMonth) => {
    let taskByDay = tasksByMonth.filter(task => task.date.day === date.day)
    return calendarClient(CALENDAR_TYPES.DELETE.BY_DATE, taskByDay)
}

const deleteTaskById = task => calendarClient(CALENDAR_TYPES.DELETE.BY_ID, task)

export {
    setDate,
    setYearMonth,
    createTask,
    readTasks,
    updateTask,
    deleteTasksByDate,
    deleteTaskById
}