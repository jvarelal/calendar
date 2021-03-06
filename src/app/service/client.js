import { MODAL_TYPES } from '../layout/actions/modalTypes'
import service from './service'
import { getModalLoader } from '../layout/actions/modalActions'

const client = (nameService, tipoRequest, body = {}, loader = true) => dispatch => {
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
                if (body.cb) {
                    body.cb(resp.data)
                }
                if (loader) {
                    dispatch(getModalLoader(false))
                }
            } else {
                if (!resp.ignore) {
                    dispatch({
                        type: MODAL_TYPES.SHOW_MESSAGE,
                        payload: { ...resp, title: tipoRequest }
                    })
                } else {
                    if (loader) {
                        return dispatch(getModalLoader(false))
                    }
                }
            }
        },
        error: err => {
            if (err.ignore) {
                return dispatch(getModalLoader(false))
            }
            let msj = typeof err == 'string' ? err : err.message || 'Fallo en la operación'
            const errores = { message: msj, status: 500, title: tipoRequest }
            console.log(errores)
            dispatch({ type: MODAL_TYPES.SHOW_MESSAGE, payload: errores })
        }
    };
    if (loader) {
        dispatch(getModalLoader(true))
    }
    service(serviceRequest);
}

const userClient = (tipoRequest, body, loader) => client('user', tipoRequest, body, loader)

const dashboardClient = (tipoRequest, body) => client('dashboard', tipoRequest, body)

export {
    userClient,
    dashboardClient
}