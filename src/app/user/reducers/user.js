import { USER_TYPES } from '../actions/userTypes'
import { getUserLocalData } from '../../util/func'

const localUser = getUserLocalData()
const initialState = {
    id: '',
    name: '',
    email: '',
    preferences: { ...localUser },
    displayName: '',
    photoURL: '',
    idToken: '',
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
        case USER_TYPES.GET_LOGIN.BY_EMAIL:
        case USER_TYPES.GET_LOGIN.BY_GOOGLE:
        case USER_TYPES.GET_LOGIN.BY_FACEBOOK:
        case USER_TYPES.CHECK_SESSION:
            return {
                ...state,
                id: action.payload.uid,
                email: action.payload.email,
                displayName: action.payload.displayName,
                photoURL: action.payload.photoURL,
                idToken: action.payload.idToken
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
        case USER_TYPES.SET_PREFERENCE:
            return {
                ...state,
                preferences: { ...state.preferences, ...action.payload }
            }
        case USER_TYPES.GET_LOGOUT:
            return {
                ...state,
                id: null
            }
        default:
            return state;
    }
}


export default user