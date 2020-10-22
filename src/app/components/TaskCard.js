import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getModalContent, getModalConfirmation } from '../actions/modalActions'
import TaskForm from './TaskForm'
import { evalueDate, colorPriority } from '../util/utilFunc'
import { TASK_PROP_SHAPE, DATE_PROP_SHAPE, PAST } from '../util/utilConts'
import { readTasks, deleteTaskById } from '../actions/calendarActions'
import { Card, Row, Col, Button } from 'react-bootstrap'

const TaskCard = ({ date, task, getModalContent, getModalConfirmation, readTasks, deleteTaskById }) => {
    const [showDetail, setShowDetail] = React.useState(false)
    const color = colorPriority(task.priority);
    const editable = evalueDate(date) !== PAST
    const titleOnDelete = `Eliminar tarea`;
    const messageOnDelete = `¿Desea eliminar la tarea ${task.name}?`;
    const confirmDelete = () => deleteTaskById({ ...task, cb: () => readTasks(date) })
    const titleOnEdit = `Editar tarea`;
    return <>
        <Card border={color}>
            <Card.Header>
                <Row>
                    <Col><strong>{task.name}</strong></Col>
                    <Col>
                        <Button variant={color} size="sm"
                            onClick={() => setShowDetail(!showDetail)}>
                            {showDetail ? 'Ocultar detalle' : 'Mostrar detalle'}
                        </Button>
                    </Col>
                </Row>
            </Card.Header>
            {showDetail ? <Card.Body>
                <Card.Text>{task.detail}</Card.Text>
                {editable ?
                    <Row>
                        <Col>
                            <Button variant="primary" size="sm" block
                                onClick={() => getModalContent(titleOnEdit, <TaskForm taskSelected={task} />)}>
                                Editar
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="dark" size="sm" block
                                onClick={() => getModalConfirmation(titleOnDelete, messageOnDelete, confirmDelete)}>
                                Eliminar
                            </Button>
                        </Col>
                    </Row> : null}
            </Card.Body> : null}
        </Card>
        <br />
    </>
}

TaskCard.propTypes = {
    task: TASK_PROP_SHAPE.isRequired,
    date: DATE_PROP_SHAPE.isRequired,
    readTasks: PropTypes.func.isRequired,
    deleteTaskById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    date: state.calendar.date
})

export default connect(
    mapStateToProps,
    { getModalContent, getModalConfirmation, readTasks, deleteTaskById }
)(TaskCard)
