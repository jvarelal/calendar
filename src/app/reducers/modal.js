import { MODAL_TYPES } from '../actions/types'

const initialState = {
    showContent: false,
    showConfirmation: false,
    showMessage: false,
    showLoader: false,
    title: '',
    message: '',
    content: null,
    commit: null
}

const modal = (state = {...initialState}, action) => {
    switch (action.type) {
        case MODAL_TYPES.SHOW_CONTENT:
            return {
                ...state,
                showContent: true,
                title: action.payload.title,
                content: action.payload.content,
                message: ''
            }
        case MODAL_TYPES.SHOW_CONFIRMATION:
            return {
                ...state,
                showConfirmation: true,
                title: action.payload.title,
                message: action.payload.message,
                commit: action.payload.commit
            }
        case MODAL_TYPES.SHOW_MESSAGE:
            return {
                ...state,
                showMessage: true,
                title: action.payload.title,
                message: action.payload.message
            }
        case MODAL_TYPES.SHOW_LOADER:
            return {
                ...state,
                showLoader: true,
                title: '',
                message: ''
            }
        case MODAL_TYPES.CLOSE:
            console.log( MODAL_TYPES.CLOSE)
            return { ...initialState }
        default:
            return state;
    }
}


export default modal