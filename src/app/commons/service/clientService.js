import { MODAL_TYPES } from '../actions/modalTypes'
import service from './service'
import { getModalLoader } from '../actions/modalActions'

const client = (nameService, tipoRequest, body) => dispatch => {
    let serviceRequest = {
        nameService: nameService,
        type: tipoRequest,
        body: body,
        cb: resp => {
            if (resp.status === 200) {
                dispatch({
                    type: tipoRequest,
                    payload: resp.data
                })
                if (body && body.cb) {
                    body.cb(resp.data)
                }
                dispatch(getModalLoader(false))
            } else {
                dispatch({
                    type: MODAL_TYPES.SHOW_MESSAGE,
                    payload: { ...resp, title: tipoRequest }
                })
            }
        },
        error: err => {
            let msj = typeof err == 'string' ? err : err.message || 'Fallo en la operación'
            const errores = { message: msj, status: 500, title: tipoRequest }
            dispatch({ type: MODAL_TYPES.SHOW_MESSAGE, payload: errores })
        }
    };
    dispatch(getModalLoader(true))
    service(serviceRequest);
}

const calendarClient = (tipoRequest, body) => client('calendar', tipoRequest, body)

const userClient = (tipoRequest, body) => client('user', tipoRequest, body)

export {
    calendarClient,
    userClient
}