import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import { ButtonNewTask } from './AppElements'
import { evalueDate, stringJsonDate } from '../../commons/util/func'
import { DATE_PROP_SHAPE, PAST } from '../../commons/util/const'
import TaskCard from './TaskCard'
import { getModalContent } from '../../commons/actions/modalActions'
import TaskForm from './TaskForm'

const TaskList = ({ date, tasksByMonth, getModalContent }) => {
    const taskByDate = tasksByMonth.filter(task => task.date.day === date.day);
    const formTitle = '+ Nueva Nota';
    const thereAreTasks = taskByDate.length > 0
    const newTask = () => getModalContent(<TaskForm title={formTitle} />)
    return <Container>
        <Row className="text-center p-2">
            <Col>
                <h5>
                    <i className="material-icons inline-icon">event_available</i>
                    {stringJsonDate(date)}
                </h5>
            </Col>
            {evalueDate(date) !== PAST && thereAreTasks ? <ButtonNewTask title={formTitle} onClick={newTask} /> :
                null}
        </Row>
        {thereAreTasks ? taskByDate.map((task, index) => <TaskCard key={index} task={task} />) :
            <Row className="text-center p-3">
                <Col>
                    <h5 className="text-center p-2">Sin notas registradas</h5>
                    {evalueDate(date) !== PAST ? <ButtonNewTask title={formTitle} onClick={newTask} /> :
                        null}
                </Col>
            </Row>}
    </Container>
}

TaskList.propTypes = {
    date: DATE_PROP_SHAPE.isRequired,
    tasksByMonth: PropTypes.array.isRequired,
    getModalContent: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    date: state.calendar.date,
    tasksByMonth: state.calendar.tasksByMonth
})

export default connect(mapStateToProps, { getModalContent })(TaskList);