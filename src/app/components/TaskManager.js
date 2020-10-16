import React, { useState, useEffect } from 'react'
import { Container, Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap'
import { fillNumberList } from '../util/utilFunc'
import { modifyTasks, readTasks, deleteTasks } from '../actions/actions'
import { PRIORITIES, TASK_MANAGER } from '../util/utilConts'
import { SelectForm, SelectAlone, InputForm, TextAreaForm } from './FormElement'

const TaskManager = ({ date = {}, showManager, handleClose = () => null, taskSelected, updateTasks = () => null }) => {
    const title = showManager === TASK_MANAGER.ERASER ? 'Eliminar tarea' : (taskSelected ? 'Editar tarea' : 'Agendar tarea');
    const operationCb = () => {
        readTasks(date, updateTasks)
        handleClose()
    }
    const operationErrorCb = (error) => alert(error);
    const submitEditor = (newTask) => modifyTasks({ ...newTask, ...date }, operationCb, operationErrorCb);
    const confirmDelete = () => deleteTasks(taskSelected, date, operationCb, operationErrorCb)
    return <Modal show={showManager != null && showManager != undefined} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{title} - {date.day}/{Number(date.month) + 1}/{date.year}</Modal.Title>
        </Modal.Header>
        {showManager === TASK_MANAGER.EDITOR ?
            <TaskEditor handleClose={handleClose} taskSelected={taskSelected} handleSubmit={submitEditor} /> :
            <TaskEraser date={date} handleClose={handleClose} taskSelected={taskSelected} confirm={confirmDelete} />}
    </Modal>
}

const taskBase = {
    name: '',
    priority: '',
    detail: '',
    alarm: false,
    hour: '01',
    minute: '00',
    ampm: 'am'
}

const TaskEditor = ({ handleClose = () => null, taskSelected, handleSubmit = () => null }) => {
    const initialTask = taskSelected || taskBase;
    const [task, setTask] = useState({ ...initialTask });
    const onChange = (target) => setTask({ ...task, [target.name]: target.value })
    const onCheck = (event) => setTask({ ...task, [event.target.name]: !task[event.target.name] })
    const onSubmit = (event) => {
        event.preventDefault();
        let newTask = { ...task, hour: task.ampm === 'pm' ? Number(task.hour) + 12 : task.hour };
        handleSubmit(newTask);
    }
    useEffect(() => setTask(taskSelected || taskBase), [taskSelected])
    return <Form onSubmit={onSubmit}>
        <Modal.Body>
            <InputForm name="name" required={true} label="Nombre de la tarea:"
                value={task.name} onChange={onChange} />
            <SelectForm name="priority" value={task.priority} label="Prioridad:"
                options={PRIORITIES} onChange={onChange} />
            <TextAreaForm name="detail" value={task.detail} label="Descripción:"
                rows="3" onChange={onChange} />
            <Form.Group controlId="taskAlarm">
                <Form.Check type="checkbox" label="Crear recordatorio" name="alarm"
                    checked={task.alarm} onChange={onCheck} />
            </Form.Group>
            {task.alarm ?
                <Form.Group controlId="taskTime">
                    <Container>
                        <Row>
                            <Col>
                                <SelectAlone name="hour" value={task.hour}
                                    options={fillNumberList(1, 12)} onChange={onChange} />
                            </Col>
                            <Col>
                                <SelectAlone name="minute" value={task.minute}
                                    options={fillNumberList(0, 59)} onChange={onChange} />
                            </Col>
                            <Col>
                                <SelectAlone name="minute" value={task.minute}
                                    options={[{ id: 'am', text: 'AM' }, { id: 'pm', text: 'PM' }]} onChange={onChange} />
                            </Col>
                        </Row>
                    </Container>
                </Form.Group> : null}
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
}

const TaskEraser = ({ date = {}, taskSelected, handleClose = () => null, confirm = () => null }) => {
    const msg = taskSelected ? `¿Desea eliminar la tarea ${taskSelected.name}?` :
        `¿Desea eliminar todas las tareas del ${date.day}/${date.month}/${date.year}?`;
    return <>
        <Modal.Body>{msg}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancelar
            </Button>
            <Button variant="warning" onClick={confirm}>
                Aceptar
            </Button>
        </Modal.Footer>
    </>
}

export default TaskManager;