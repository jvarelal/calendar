import { MODAL_TYPES } from '../actions/modalTypes'

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
                ...initialState,
                showContent: true,
                title: '',
                content: action.payload,
                message: ''
            }
        case MODAL_TYPES.SHOW_CONFIRMATION:
            return { 
                ...initialState,
                showConfirmation: true,
                title: action.payload.title,
                message: action.payload.message,
                commit: action.payload.commit 
            }
        case MODAL_TYPES.SHOW_MESSAGE:
            return { 
                ...initialState,
                showMessage: true,
                title: action.payload.title,
                message: action.payload.message 
            }
        case MODAL_TYPES.SHOW_LOADER:
            return { 
                ...initialState,
                showLoader: action.payload,
                title: '',
                message: ''
            }
        case MODAL_TYPES.CLOSE:
            return { ...initialState }
        default:
            return state;
    }
}


export default modal