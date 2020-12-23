import { USER_TYPES } from './userTypes'
import { userClient } from '../../service/client'
import { setPrefence } from '../../util/func'

const register = user => userClient(USER_TYPES.GET_REGISTER, user);

const login = user => userClient(USER_TYPES.GET_LOGIN.BY_EMAIL, user);

const loginGoogle = user => userClient(USER_TYPES.GET_LOGIN.BY_GOOGLE, user);

const loginFacebook = user => userClient(USER_TYPES.GET_LOGIN.BY_FACEBOOK, user);

const logout = body => userClient(USER_TYPES.GET_LOGOUT, body);

const checkSession = body => userClient(USER_TYPES.CHECK_SESSION, body);

const getLocation = cb => userClient(USER_TYPES.GET_LOCATION, { cb }, false)

const getWeather = location => userClient(USER_TYPES.GET_WEATHER, location, false);

const setUserPreference = preference => {
    let data = { [preference.name]: preference.value }
    setPrefence(data)
    return {
        type: USER_TYPES.SET_PREFERENCE,
        payload: data
    }
}

export {
    register,
    login,
    loginGoogle,
    loginFacebook,
    checkSession,
    getLocation,
    getWeather,
    setUserPreference,
    logout
}