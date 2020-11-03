import { CALENDAR_TYPES } from '../../calendar/actions/calendarTypes'
import { USER_TYPES } from '../../user/actions/userTypes'
import './firebase'
import { db, auth } from './firebase'
import axios from 'axios'

export default function service({ nameService = '', type = '', body = {}, cb = () => null, error = () => null }) {
    const operations = {
        calendar: [
            {
                type: CALENDAR_TYPES.CREATE_TASK,
                execute: calendarService.createTaskFb
            },
            {
                type: CALENDAR_TYPES.LIST_TASKS,
                execute: calendarService.readTaskFb
            },
            {
                type: CALENDAR_TYPES.EDIT_TASK,
                execute: calendarService.updateTaskFb
            },
            {
                type: CALENDAR_TYPES.DELETE.BY_ID,
                execute: calendarService.deleteTaskByIdFb
            }
        ],
        user: [
            {
                type: USER_TYPES.GET_REGISTER,
                execute: userService.register
            },
            {
                type: USER_TYPES.GET_LOGIN,
                execute: userService.login
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
        ]
    }
    let operation = operations[nameService].find(o => o.type === type);
    operation.url ? httpClient(operation, body, cb, error) : operation.execute(body, cb, error);
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
                postJSONService(operation, body, cb, error);
                break;
            default:
                break;
        }
    } catch (e) {
        console.error(e)
    }
}

const response = { status: 200, message: '' }

const userService = {
    register: (body, cb, cbError) => {
        try {
            auth.createUserWithEmailAndPassword(body.email, body.password)
                .then(userCredential => cb({ ...response, data: userCredential }))
                .catch(cbError)
        } catch (e) {
            console.log(e)
            cbError({ status: 500, message: e.message })
        }
    },
    login: (body, cb, cbError) => {
        try {
            auth.signInWithEmailAndPassword(body.email, body.password)
                .then(userCredential => cb({ ...response, data: userCredential }));
        } catch (e) {
            cbError({ status: 500, message: e.message })
        }
    }
}

const calendarService = {
    createTaskFb: async (body, cb, cbError) => {
        try {
            await db.collection('tasks').doc().set(body)
            cb({ ...response, message: 'Nota agregada' });
        } catch (e) {
            cbError({ status: 500, message: e.message })
        }
    },
    readTaskFb: (body, cb, cbError) => {
        try {
            console.log(body)
            db.collection('tasks').where("userId", "==", body).onSnapshot(querySnap => {
                let data = [];
                querySnap.forEach(doc => data.push({ ...doc.data(), id: doc.id }))
                cb({ ...response, message: 'Notas listadas', data: data });
            })
        } catch (e) {
            cbError({ status: 500, message: e.message })
        }
    },
    updateTaskFb: async (body, cb, cbError) => {
        try {
            await db.collection('tasks').doc(body.id).update(body)
            cb({ ...response, message: 'Nota actualizada' });
        } catch (e) {
            cbError({ status: 500, message: e.message })
        }
    },
    deleteTaskByIdFb: (body, cb, cbError) => {
        try {
            body.forEach(async task => await db.collection('tasks').doc(task.id).delete());
            cb({ ...response, message: 'Nota eliminada' });
        } catch (e) {
            cbError({ status: 500, message: e.message })
        }
    }
}

const getJSONService = (operation, cb, cbError) => {
    let config = operation.config || {}
    axios.get(operation.url, config).then((res) => {
        if (!res.status || !res.data) {
            res = { data: res, status: response.status }
        }
        cb(res)
    }, (error) => isNetworkError(error, cbError));
}

const getTextService = (operation, cb, cbError) => {
    var config = {
        headers: {
            'Content-Type': 'text/plain'
        },
        responseType: 'text'
    };
    axios.get(operation.url, config).then((res) => {
        if (!res.status || !res.data) {
            res = { data: res, status: response.status }
        }
        cb(res)
    }, (error) => isNetworkError(error, cbError));
}

const postJSONService = (operation, params, cb, cbError) => {
    axios.post(operation.url, params).then((res) => {
        if (!res.status || !res.data) {
            res = { data: res, status: response.status }
        }
        cb(res)
    }, (error) => isNetworkError(error, cbError));
}

const isNetworkError = (error, cbError) => {
    let msg = '';
    try {
        if (error.response) {
            msg = error.response
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