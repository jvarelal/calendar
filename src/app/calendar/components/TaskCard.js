import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, Row, Col, Button } from 'react-bootstrap'
import TaskForm from './TaskForm'
import { evalueDate, colorPriority } from '../../commons/util/func'
import { TASK_PROP_SHAPE, PAST, PRIORITIES } from '../../commons/util/const'
import { deleteTaskById, updateTask } from '../actions/calendarActions'
import { getModalContent, getModalConfirmation } from '../../commons/actions/modalActions'
import { DropCard } from '../../commons/components/FormElements'

const TaskCard = ({ expanded = false, task, onDragStart, getModalContent, getModalConfirmation, deleteTaskById, updateTask }) => {
    const titleOnDelete = `Eliminar nota`;
    const messageOnDelete = `¿Desea eliminar la nota ${task.name}?`;
    const confirmDelete = () => deleteTaskById([task])
    const doneUndone = () => updateTask({ ...task, done: !task.done })
    return <DropCard title={task.name}
        variant={colorPriority(task.priority)}
        onDragStart={onDragStart}
        expanded={expanded}>
        <Card.Body>
            <Card.Text>
                {task.detail}
            </Card.Text>
            <hr />
            <small className="text-muted">
                Prioridad: {PRIORITIES[task.priority]} <br />
                    Fecha de creación: {task.creation}<br />
                    Ultima edición: {task.lastEdition}<br />
            </small>
        </Card.Body>
        <Card.Footer>
            <Row className="text-center">
                <Col>
                    <Button variant={task.done ? 'dark' : 'success'}
                        size="sm"
                        title={task.done ? 'Nuevamente pendiente :(' : 'Hecho!'}
                        onClick={doneUndone}>
                        <i className="material-icons inline-icon">
                            {task.done ? 'settings_backup_restore' : 'check_box'}
                        </i>
                    </Button>
                </Col>
                {evalueDate(task.date) !== PAST ? <>
                    <Col>
                        <Button variant="info"
                            size="sm"
                            onClick={() => getModalContent(<TaskForm title="Editar nota" taskSelected={task} />)}
                            title="Editar">
                            <i className="material-icons inline-icon">edit</i>
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="danger"
                            size="sm"
                            onClick={() => getModalConfirmation(titleOnDelete, messageOnDelete, confirmDelete)}
                            title="Eliminar">
                            <i className="material-icons inline-icon">delete_forever</i>
                        </Button>
                    </Col>
                </> : null}
            </Row>
        </Card.Footer>
    </DropCard>
}

TaskCard.propTypes = {
    task: TASK_PROP_SHAPE.isRequired,
    deleteTaskById: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    onDragStart: PropTypes.func,
    getModalContent: PropTypes.func.isRequired,
    getModalConfirmation: PropTypes.func.isRequired
}

export default connect(
    null,
    { getModalContent, getModalConfirmation, deleteTaskById, updateTask }
)(TaskCard)
