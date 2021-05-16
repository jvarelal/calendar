import { DASHBOARD_TYPES } from '../task/actions/taskTypes'
import { USER_TYPES } from '../user/actions/userTypes'
import { OK_RESPONSE } from '../util/const'
import userService from './userService'
import dashboardService from './dashboardService'
import axios from 'axios'

export default function service({ nameService = '', type = '', body = {}, cb = () => null, error = () => null }) {
    const urlBase = 'http://localhost:5000/b-agenda/us-central1/api'
    const operations = {
        user: [
            {
                type: USER_TYPES.GET_REGISTER,
                execute: userService.register
            },
            {
                type: USER_TYPES.GET_LOGIN.BY_EMAIL,
                execute: userService.login
            },
            {
                type: USER_TYPES.GET_LOGIN.BY_GOOGLE,
                execute: userService.googleAuth
            },
            {
                type: USER_TYPES.GET_LOGIN.BY_FACEBOOK,
                execute: userService.facebookAuth
            },
            {
                type: USER_TYPES.GET_LOGOUT,
                execute: userService.logout
            },
            {
                type: USER_TYPES.CHECK_SESSION,
                execute: userService.checkSession
            },
            {
                type: USER_TYPES.GET_LOCATION,
                url: 'http://api.ipstack.com/check?access_key=aa8dbbb07ed7fe7245663642cf668b9b',
                method: 'GET'
            },
            {
                type: USER_TYPES.GET_WEATHER,
                url: `https://api.climacell.co/v3/weather/realtime?lat=${body.latitude}&lon=${body.longitude}&unit_system=si&fields=precipitation,wind_gust,humidity,wind_speed,temp`,
                method: 'GET',
                config: {
                    headers: {
                        'content-type': 'application/json',
                        'apikey': 'eVfHACnjmf2CBj5oBbLtXtz77USYvpfL'
                    }
                }
            }
        ],
        dashboard: [
            {
                type: DASHBOARD_TYPES.CREATE_DASHBOARD,
                url: `${urlBase}/dashboards`,
                method: 'POST',
                config: {
                    headers: {
                        'content-type': 'application/json',
                        'authorization': `bearer ${body.idToken}`
                    }
                }
            },
            {
                type: DASHBOARD_TYPES.LIST_DASHBOARDS,
                url: `${urlBase}/dashboards`,
                method: 'GET',
                config: {
                    headers: {
                        'content-type': 'application/json',
                        'authorization': `bearer ${body.idToken}`
                    }
                }
            },
            {
                type: DASHBOARD_TYPES.EDIT_DASHBOARD,
                url: `${urlBase}/dashboards/${body.id}`,
                method: 'PUT',
                config: {
                    headers: {
                        'content-type': 'application/json',
                        'authorization': `bearer ${body.idToken}`
                    }
                }
            },
            {
                type: DASHBOARD_TYPES.DELETE_DASHBOARD,
                url: `${urlBase}/dashboards/${body.id}`,
                method: 'DELETE',
                config: {
                    headers: {
                        'content-type': 'application/json',
                        'authorization': `bearer ${body.idToken}`
                    }
                }
            },
            {
                type: DASHBOARD_TYPES.EDIT_GROUP,
                execute: dashboardService.updateGroup
            },
            {
                type: DASHBOARD_TYPES.DELETE_GROUP,
                execute: dashboardService.deleteGroup
            },
            {
                type: DASHBOARD_TYPES.EDIT_TASK,
                execute: dashboardService.editTask
            },
            {
                type: DASHBOARD_TYPES.MOVE_TASK,
                execute: dashboardService.moveTask
            },
            {
                type: DASHBOARD_TYPES.DELETE_TASK,
                execute: dashboardService.deleteTask
            }
        ]
    }
    let operation = operations[nameService].find(o => o.type === type);
    let nBody = { ...body }
    delete nBody.cb
    operation.url ? httpClient(operation, body, cb, error) : operation.execute(nBody, cb, error);
}

const httpClient = (operation, body, cb, error) => {
    try {
        if (operation.dummy) {
            return cb(operation.dummy);
        }
        switch (operation.method) {
            case 'GET':
                if (operation.mime === 'text/plain') {
                    getTextService(operation, cb, error);
                } else {
                    getJSONService(operation, cb, error);
                }
                break;
            case 'POST':
            case 'PUT':
            case 'DELETE':
                postJSONService(operation, body, cb, error);
                break;
            default:
                break;
        }
    } catch (e) {
        console.error(e)
    }
}

const getJSONService = (operation, cb, cbError) => {
    let config = operation.config || {}
    axios.get(operation.url, config).then((res) => {
        if (!res.status || !res.data) {
            res = { data: res, status: OK_RESPONSE.status }
        }
        cb(res)
    }, (error) => isNetworkError(error, cbError));
}

const getTextService = (operation, cb, cbError) => {
    var config = {
        headers: { 'Content-Type': 'text/plain' },
        responseType: 'text'
    };
    axios.get(operation.url, config).then((res) => {
        if (!res.status || !res.data) {
            res = { data: res, status: OK_RESPONSE.status }
        }
        cb(res)
    }, (error) => isNetworkError(error, cbError));
}

const postJSONService = (operation, params, cb, cbError) => {
    let config = operation.config || {}
    axios[operation.method.toLowerCase()](operation.url, params, config).then((res) => {
        if (!res.status || !res.data) {
            res = { data: res, status: OK_RESPONSE.status }
        }
        cb(res)
    }, (error) => isNetworkError(error, cbError));
}

const isNetworkError = (error, cbError) => {
    let msg = '';
    console.log(error)
    try {
        if (error.OK_RESPONSE) {
            msg = error.OK_RESPONSE
        } else if (error.request) {
            msg = 'No se recibio respuesta a esta solicitud, favor de revisar su conexión de red'
        } else {
            msg = 'No se pudo generar la solicitud: ' + error.message
        }
    } catch (e) {
        msg = 'Se ha generado un fallo en la solicitud'
    }
    cbError(msg)
}