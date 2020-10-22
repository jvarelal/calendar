import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import { ModalConfirmation } from './AppElements'
import { handleClose } from '../actions/modalActions'

const ModalManager = ({ modal, handleClose }) => {
    let modalContent;
    switch (true) {
        case modal.showConfirmation:
            modalContent = <ModalConfirmation title={modal.title} message={modal.message}
                handleClose={handleClose} confirm={modal.commit} />
            break;
        case modal.showContent:
            modalContent = <>
                <Modal.Header closeButton>
                    <Modal.Title>{modal.title}</Modal.Title>
                </Modal.Header>
                {modal.content}
            </>
            break;
        default:
            modalContent = null;
            break;
    }
    return <Modal show={modal.showContent || modal.showConfirmation} onHide={handleClose}>
        {modalContent}
    </Modal>
}

const mapStateToProps = state => ({
    modal: state.modal
})

export default connect(mapStateToProps, { handleClose })(ModalManager)
