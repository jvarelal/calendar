import React from 'react'
import { Modal, Button, Spinner } from 'react-bootstrap'

const ModalHeader = ({ title }) => <Modal.Header closeButton>
    <Modal.Title>{title}</Modal.Title>
</Modal.Header>

const ModalConfirmation = ({ title, message, handleClose, confirm }) => <>
    <ModalHeader title={title} />
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Cancelar
            </Button>
        <Button variant="warning" onClick={() => {
            confirm();
            handleClose();
        }}>
            Aceptar
            </Button>
    </Modal.Footer>
</>

const ModalMessage = ({ title, message, handleClose }) => <>
    <ModalHeader title={title} />
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
            Aceptar
        </Button>
    </Modal.Footer>
</>

const ModalLoader = () => <Modal.Body>
    <div style={{ textAlign: 'center' }}>
        <Spinner animation="border" /> <br />
        Espere un momento...
    </div>
</Modal.Body>

export {
    ModalConfirmation,
    ModalHeader,
    ModalMessage,
    ModalLoader
}