import { CALENDAR_TYPES } from './types'
import service from '../service/service'

const setYearMonth = target => ({
    type: CALENDAR_TYPES.SET_YEAR_MONTH,
    payload: { [target.name]: Number(target.value) }
})

const setDate = date => ({
    type: CALENDAR_TYPES.SET_DATE,
    payload: date
})

const operation = (tipoRequest, body) => dispatch => {
    console.log(tipoRequest)
    let serviceRequest = {
        type: tipoRequest,
        body: body,
        cb: resp => {
            if (resp.status === 200) {
                //dispatch(getLoader(false))
                dispatch({
                    type: tipoRequest,
                    payload: resp.data
                })
                if (body && body.cb) {
                    console.log(resp.data)
                    body.cb(resp.data)
                }
            } else {
                dispatch({
                    type: CALENDAR_TYPES.SHOW_MESSAGE,
                    payload: { ...resp, titulo: tipoRequest }
                })
            }
        },
        error: err => {
            let msj = typeof err == 'string' ? err : 'Fallo en la operación'
            const errores = { message: msj, status: 500, titulo: tipoRequest }
            dispatch({ type: CALENDAR_TYPES.SHOW_MESSAGE, payload: errores })
        }
    };
    //dispatch(getLoader(true))
    service(serviceRequest);
}

const createTask = task => operation(CALENDAR_TYPES.CREATE_TASK, task)

const readTasks = date => operation(CALENDAR_TYPES.LIST_TASKS, date)

const updateTask = task => operation(CALENDAR_TYPES.EDIT_TASK, task)

const deleteTasksByDate = date => operation(CALENDAR_TYPES.DELETE.BY_DATE, date)

const deleteTaskById = task => operation(CALENDAR_TYPES.DELETE.BY_ID, task)

export {
    setDate,
    setYearMonth,
    createTask,
    readTasks,
    updateTask,
    deleteTasksByDate,
    deleteTaskById    
}