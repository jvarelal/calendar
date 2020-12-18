import { MODAL_TYPES } from './modalTypes'

const getModalContent = (content) => ({
    type: MODAL_TYPES.SHOW_CONTENT,
    payload: content
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

const getModalLoader = show => ({
    type: MODAL_TYPES.SHOW_LOADER,
    payload: show
})

const handleClose = () => ({ type: MODAL_TYPES.CLOSE })

export {
    getModalContent,
    getModalConfirmation,
    getModalMessage,
    getModalLoader,
    handleClose
}