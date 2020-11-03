import { USER_TYPES } from './userTypes'
import { userClient } from '../../commons/service/clientService'

const register = user => userClient(USER_TYPES.GET_REGISTER, user);

const login = user => userClient(USER_TYPES.GET_LOGIN, user);

const getLocation = cb => {
    let body = { cb: cb }
    return userClient(USER_TYPES.GET_LOCATION, body)
}

const getWeather = location => userClient(USER_TYPES.GET_WEATHER, location);


export {
    register,
    login,
    getLocation,
    getWeather
}