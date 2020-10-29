import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal, Form, Container, Row, Col, Button } from 'react-bootstrap'
import { fillNumberList, fragmentDate } from '../util/utilFunc'
import { SYSDATE, DATE_PROP_SHAPE, TASK_PROP_SHAPE, PRIORITIES, TASK } from '../util/utilConts'
import { createTask, updateTask } from '../actions/calendarActions'
import { SelectForm, SelectAlone, InputForm, TextAreaForm, ModalHeader } from '../../commons/components/AppElements'
import { handleClose } from '../../commons/actions/modalActions'
import DateSelect from './DateSelect'

const TaskForm = ({ title, date, taskSelected, handleClose, createTask, updateTask }) => {
    const initialTask = taskSelected || { ...TASK, date: { ...date, hour: '00', minute: '00' } }
    const maxDate = { year: SYSDATE.getFullYear() + 4, month: 11, day: 31 }
    const [task, setTask] = React.useState(initialTask);
    const onChange = (target) => setTask({ ...task, [target.name]: target.value })
    const onCheck = (event) => setTask({ ...task, [event.target.name]: !task[event.target.name] })
    const onChangeTime = (target) => {
        let newDateTime = { ...task.date, [target.name]: Number(target.value) }
        setTask({ ...task, date: newDateTime })
    }
    const onSubmit = (event) => {
        event.preventDefault();
        let nTask = { ...task, priority: Number(task.priority), dismiss: false }
        console.log(nTask)
        task.id ? updateTask(nTask) : createTask(nTask);
    }
    React.useEffect(() => setTask(initialTask), [taskSelected]) // eslint-disable-line react-hooks/exhaustive-deps
    return <Form onSubmit={onSubmit}>
        <ModalHeader title={title} />
        <Modal.Body>
            <DateSelect label="Fecha: "
                controlId="date"
                startDate={task.date}
                minDate={fragmentDate(SYSDATE)}
                maxDate={maxDate}
                handleChange={onChangeTime} />
            <InputForm name="name" required={true} label="Nombre de la tarea:"
                value={task.name} onChange={onChange} />
            <SelectForm name="priority" value={task.priority} label="Prioridad:"
                options={PRIORITIES} onChange={onChange} />
            <TextAreaForm name="detail" value={task.detail} label="Descripción:"
                rows="3" onChange={onChange} />
            <Form.Group controlId="alarm">
                <Form.Check type="checkbox" label="Crear recordatorio" name="alarm"
                    checked={task.alarm} onChange={onCheck} />
            </Form.Group>
            {task.alarm ?
                <Form.Group controlId="taskTime">
                    <Container>
                        <Row>
                            <Col>
                                <SelectAlone name="hour" value={task.date.hour}
                                    options={fillNumberList(0, 23)} onChange={onChangeTime} />
                            </Col>
                            <Col>
                                <SelectAlone name="minute" value={task.date.minute}
                                    options={fillNumberList(0, 59)} onChange={onChangeTime} />
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


TaskForm.propTypes = {
    title: PropTypes.string.isRequired,
    date: DATE_PROP_SHAPE.isRequired,
    task: TASK_PROP_SHAPE,
    createTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    date: state.calendar.date
})

export default connect(
    mapStateToProps,
    { handleClose, createTask, updateTask }
)(TaskForm);