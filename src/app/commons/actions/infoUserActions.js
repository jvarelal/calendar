import { INFO_USER_TYPES } from '../actions/infoUserTypes'
import { infoUserClient } from '../service/clientService'

const getLocation = cb => {
    let body = { cb: cb }
    return infoUserClient(INFO_USER_TYPES.GET_LOCATION, body)
}

const getWeather = location => infoUserClient(INFO_USER_TYPES.GET_WEATHER, location);

export {
    getLocation,
    getWeather
}