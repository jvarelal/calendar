import React from 'react'
import { connect } from 'react-redux'
import Modal from '../../commons/components/Modal'
import { handleClose } from '../actions/modalActions'

const ModalManager = ({ modal, handleClose }) => {
    const modalContent = () => {
        switch (true) {
            case modal.showConfirmation:
                return <Modal.Confirmation title={modal.title}
                    message={modal.message} confirm={modal.commit} />
            case modal.showContent:
                return modal.content
            case modal.showMessage:
                return <Modal.Message title={modal.title} message={modal.message} />
            case modal.showLoader:
                return <Modal.Loader />
            default:
                return null;
        }
    }
    const show = modal.showContent || modal.showConfirmation ||
        modal.showMessage || modal.showLoader
    return <Modal show={show} handleClose={handleClose}>
        {show ? modalContent() : ''}
    </Modal>
}

const mapStateToProps = state => ({
    modal: state.modal
})

export default connect(mapStateToProps, { handleClose })(ModalManager)
