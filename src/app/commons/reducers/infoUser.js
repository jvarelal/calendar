import { INFO_USER_TYPES } from '../actions/infoUserTypes'

const initialState = {
    location: {
        ip: '',
        ipType: '',
        latitude: '',
        longitude: '',
        country: '',
        city: '',
        flag: '',
        weather: {
            temp: '',
            humidity: '',
            precipitation: '',
            wind_speed: ''
        }
    }
}

const infoUser = (state = { ...initialState }, action) => {
    switch (action.type) {
        case INFO_USER_TYPES.GET_LOCATION:
            return {
                ...state,
                location: { ...action.payload }
            }
        case INFO_USER_TYPES.GET_WEATHER:
            return {
                ...state,
                location: { ...state.location, weather: action.payload }
            }
        default:
            return state;
    }
}


export default infoUser