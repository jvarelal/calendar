import React from 'react'
import { connect } from 'react-redux'
import Modal from './styled/Modal'
import { handleClose } from '../actions/modalActions'

const ModalManager = ({ modal, handleClose }) => {
    const modalContent = () => {
        switch (true) {
            case modal.showConfirmation:
                return <Modal.Confirmation title={modal.title}
                    message={modal.message}
                    handleClose={handleClose}
                    confirm={modal.commit} />
            case modal.showContent:
                return modal.content
            case modal.showMessage:
                return <Modal.Message title={modal.title}
                    message={modal.message}
                    handleClose={handleClose} />
            case modal.showLoader:
                return <Modal.Loader />
            default:
                return null;
        }
    }
    const show = modal.showContent || modal.showConfirmation ||
        modal.showMessage || modal.showLoader
    return <Modal show={show} onHide={handleClose}>
        {show ? modalContent() : ''}
    </Modal>
}

const mapStateToProps = state => ({
    modal: state.modal
})

export default connect(mapStateToProps, { handleClose })(ModalManager)
