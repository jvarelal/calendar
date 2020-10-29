import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, Row, Col, Button } from 'react-bootstrap'
import TaskForm from './TaskForm'
import { evalueDate, colorPriority } from '../util/utilFunc'
import { TASK_PROP_SHAPE, PAST } from '../util/utilConts'
import { deleteTaskById } from '../actions/calendarActions'
import { getModalContent, getModalConfirmation } from '../../commons/actions/modalActions'
import DropCard from './DropCard'

const TaskCard = ({ task, onDragStart, getModalContent, getModalConfirmation, deleteTaskById }) => {
    const titleOnDelete = `Eliminar tarea`;
    const messageOnDelete = `¿Desea eliminar la tarea ${task.name}?`;
    const confirmDelete = () => deleteTaskById([task])
    return <DropCard title={task.name} variant={colorPriority(task.priority)} onDragStart={onDragStart}>
        <Card.Body>
            <Card.Text>{task.detail}</Card.Text>
        </Card.Body>
        <Card.Footer>
            {evalueDate(task.date) !== PAST ?
                <Row className="text-center">
                    <Col>
                        <Button variant="primary" size="sm"
                            onClick={() => getModalContent(<TaskForm title="Editar tarea" taskSelected={task} />)}>
                            <i className="material-icons inline-icon">edit</i> Editar
                            </Button>
                    </Col>
                    <Col>
                        <Button variant="dark" size="sm"
                            onClick={() => getModalConfirmation(titleOnDelete, messageOnDelete, confirmDelete)}>
                            <i className="material-icons inline-icon">delete_forever</i> Eliminar
                            </Button>
                    </Col>
                </Row> : null}
        </Card.Footer>
    </DropCard>
}

TaskCard.propTypes = {
    task: TASK_PROP_SHAPE.isRequired,
    deleteTaskById: PropTypes.func.isRequired,
    onDragStart: PropTypes.func,
    getModalContent: PropTypes.func.isRequired,
    getModalConfirmation: PropTypes.func.isRequired
}

export default connect(
    null,
    { getModalContent, getModalConfirmation, deleteTaskById }
)(TaskCard)
