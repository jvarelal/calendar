const Task = ({ showModal = false }) => {
    const [show, setShow] = useState(showModal);
    const handleClose = () => setShow(false);
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Tareas</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Nueva tarea
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}