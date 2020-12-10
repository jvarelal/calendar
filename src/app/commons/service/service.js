import { DASHBOARD_TYPES } from '../../task/actions/taskTypes'
import { USER_TYPES } from '../../user/actions/userTypes'
import { provider, db, auth } from './firebase'
import axios from 'axios'

export default function service({ nameService = '', type = '', body = {}, cb = () => null, error = () => null }) {
    const operations = {
        dashboard: [
            {
                type: DASHBOARD_TYPES.CREATE_DASHBOARD,
                execute: dashboardService.createDashboard
            },
            {
                type: DASHBOARD_TYPES.LIST_DASHBOARDS,
                execute: dashboardService.readDashboards
            },
            {
                type: DASHBOARD_TYPES.EDIT_DASHBOARD,
                execute: dashboardService.updateDashboards
            },
            {
                type: DASHBOARD_TYPES.EDIT_GROUP,
                execute: dashboardService.updateGroup
            }
        ],
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
                .then(credentials => {
                    if (credentials) {
                        credentials.updateProfile({ displayName: body.name })
                            .then(s => cb({ ...response, data: credentials }))
                    }
                }).catch(cbError)
        } catch (e) {
            console.log(e)
            cbError({ status: 500, message: e.message })
        }
    },
    login: (body, cb, cbError) => {
        try {
            auth.signInWithEmailAndPassword(body.email, body.password)
                .then(credentials => cb({ ...response, data: credentials })).catch(cbError);
        } catch (e) {
            cbError({ status: 500, message: e.message })
        }
    },
    logout: (body, cb, cbError) => {
        try {
            auth.signOut().then(() => cb({ ...response })).catch(cbError);
        } catch (e) {
            cbError({ status: 500, message: e.message })
        }
    },
    googleAuth: (body, cb, cbError) => {
        try {
            const googleProvider = new provider.GoogleAuthProvider();
            auth.signInWithPopup(googleProvider)
                .then(credentials => {
                    cb({ ...response, data: credentials })
                }).catch(cbError);
        } catch (e) {
            console.log(e)
            cbError({ status: 500, message: e.message })
        }
    },
    facebookAuth: (body, cb, cbError) => {
        try {
            const facebookProvider = new provider.FacebookAuthProvider();
            auth.signInWithPopup(facebookProvider)
                .then(credentials => {
                    cb({ ...response, data: credentials })
                }).catch(cbError);
        } catch (e) {
            console.log(e)
            cbError({ status: 500, message: e.message })
        }
    },
    checkSession: (body, cb, cbError) => {
        try {
            auth.onAuthStateChanged(user => cb({ ...response, data: { user: user || {} } }))
        } catch (e) {
            cbError({ status: 500, message: e.message })
        }
    }
}

const dashboardService = {
    createDashboard: async (body, cb, cbError) => {
        try {
            await db.collection('dashboards').add({ ...body, cb: null })
                .then(refDoc => cb({ ...response, message: 'Tablero creado', data: refDoc }))
        } catch (e) {
            console.log(e)
            cbError({ status: 500, message: e.message })
        }
    },
    readDashboards: (body, cb, cbError) => {
        try {
            db.collection('dashboards').where("userId", "==", body.id).onSnapshot(querySnap => {
                let data = [];
                querySnap.forEach(doc => data.push({ ...doc.data(), id: doc.id }))
                cb({ ...response, message: 'Tableros listados', data: data });
            })
        } catch (e) {
            cbError({ status: 500, message: e.message })
        }
    },
    updateDashboards: async (body, cb, cbError) => {
        try {
            await db.collection('dashboards').doc(body.id).update(body)
            cb({ ...response, message: 'Dashboard actualizado' });
        } catch (e) {
            cbError({ status: 500, message: e.message })
        }
    },
    updateGroup: async (body, cb, cbError) => {
        try {
            db.collection('dashboards').doc(body.id).update({ groups: body.groups })
            cb({ ...response, message: 'Dashboard actualizado' });
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
