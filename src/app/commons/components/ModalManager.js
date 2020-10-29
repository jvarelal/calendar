import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import { ModalConfirmation, ModalMessage, ModalLoader } from './AppElements'
import { handleClose } from '../actions/modalActions'

const ModalManager = ({ modal, handleClose }) => {
    let modalContent = () => {
        switch (true) {
            case modal.showConfirmation:
                return <ModalConfirmation title={modal.title}
                    message={modal.message}
                    handleClose={handleClose}
                    confirm={modal.commit} />
            case modal.showContent:
                return <>
                    {modal.content}
                </>
            case modal.showMessage:
                return <ModalMessage title={modal.title}
                    message={modal.message}
                    handleClose={handleClose} />
            case modal.showLoader:
                return <ModalLoader />
            default:
                return null;
        }
    }
    return <Modal show={modal.showContent ||
        modal.showConfirmation ||
        modal.showMessage ||
        modal.showLoader}
        onHide={handleClose}>
        {modalContent()}
    </Modal>
}

const mapStateToProps = state => ({
    modal: state.modal
})

export default connect(mapStateToProps, { handleClose })(ModalManager)
