import React, { useState } from 'react'
import { Container, Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap'
import { fillNumberList } from '../util/utilFunc'
import { modifyTasks } from '../actions/actions'
import { PRIORITIES } from '../util/utilConts'

const Task = ({ fragmentDay = {}, showModal = false, handleClose = () => null, prevTask }) => {
    const initialTask = prevTask || {
        name: '',
        priority: '',
        detail: '',
        alarm: false,
        hour: '01',
        minute: '00',
        ampm: 'am'
    };
    const [task, setTask] = useState(initialTask);
    const [alert, setAlert] = useState('')
    const onChange = (event) => setTask({ ...task, [event.target.name]: event.target.value })
    const onCheck = (event) => setTask({ ...task, [event.target.name]: !task[event.target.name] })
    const onSubmit = (event) => {
        event.preventDefault();
        let newTask = {
            ...task,
            ...fragmentDay,
            hour: task.ampm === 'pm' ? Number(task.hour) + 12 : task.hour
        };
        let cb = () => handleClose();
        let cbError = (error) => setAlert(error);
        modifyTasks(newTask, cb, cbError);
    }
    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agendar tarea</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group controlId="taskName">
                        <Form.Label>Nombre de la tarea:</Form.Label>
                        <Form.Control name="name" type="text" placeholder="Nombre"
                            value={task.name} onChange={onChange} required />
                    </Form.Group>
                    <Form.Group controlId="taskPriority">
                        <Form.Label>Prioridad:</Form.Label>
                        <Form.Control as="select" name="priority" value={task.priority} onChange={onChange}>
                            {PRIORITIES.map((option, index) => <option key={index} value={index}>{option}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="taskDetail">
                        <Form.Label>Descripción:</Form.Label>
                        <Form.Control as="textarea" rows="3" name="detail"
                            value={task.detail} onChange={onChange} />
                    </Form.Group>
                    <Form.Group controlId="taskAlarm">
                        <Form.Check type="checkbox" label="Crear recordatorio" name="alarm"
                            checked={task.alarm} onChange={onCheck} />
                    </Form.Group>
                    {task.alarm ?
                        <Form.Group controlId="taskTime">
                            <Container>
                                <Row>
                                    <Col>
                                        <Form.Control as="select" name="hour" value={task.hour} onChange={onChange}>
                                            {fillNumberList(1, 12).map((option, index) =>
                                                <option key={index} value={option}>{option < 10 ? '0' + option : option}</option>)}
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                        <Form.Control as="select" name="minute" value={task.minute} onChange={onChange}>
                                            {fillNumberList(0, 59).map((option, index) =>
                                                <option key={index} value={option}>{option < 10 ? '0' + option : option}</option>)}
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                        <Form.Control as="select" name="ampm" value={task.ampm} onChange={onChange}>
                                            <option value="am">AM</option>
                                            <option value="pm">PM</option>
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </Container>
                        </Form.Group> : null}
                    {alert ? <Alert variant="danger">{alert}</Alert> : null}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit">
                        Guardar
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default Task;