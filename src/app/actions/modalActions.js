import { MODAL_TYPES } from './types'

const getModalContent = (title, content) => ({
    type: MODAL_TYPES.SHOW_CONTENT,
    payload: {
        title: title,
        content: content
    }
})

const getModalConfirmation = (title, message, commit) => ({
    type: MODAL_TYPES.SHOW_CONFIRMATION,
    payload: {
        title: title,
        message: message,
        commit: commit
    }
})

const getModalMessage = (title, message) => ({
    type: MODAL_TYPES.SHOW_MESSAGE,
    payload: {
        title: title,
        message: message
    }
})

const getModalLoader = () => ({ type: MODAL_TYPES.SHOW_LOADER })

const handleClose = () => ({ type: MODAL_TYPES.CLOSE })

export {
    getModalContent,
    getModalConfirmation,
    getModalMessage,
    getModalLoader,
    handleClose
}