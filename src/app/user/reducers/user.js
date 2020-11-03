import { USER_TYPES } from '../actions/userTypes'

const initialState = {
    id: '',
    name: '',
    email: '',
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

const user = (state = { ...initialState }, action) => {
    switch (action.type) {
        case USER_TYPES.GET_REGISTER:
        case USER_TYPES.GET_LOGIN:
            return {
                ...state,
                id: action.payload.user.uid,
                email: action.payload.user.email
            }
        case USER_TYPES.GET_LOCATION:
            return {
                ...state,
                location: { ...action.payload }
            }
        case USER_TYPES.GET_WEATHER:
            return {
                ...state,
                location: { ...state.location, weather: action.payload }
            }
        default:
            return state;
    }
}


export default user