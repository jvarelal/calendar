import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Button, Row, Col } from 'react-bootstrap'
import { evalueDate } from '../util/utilFunc'
import { DATE_PROP_SHAPE, PAST } from '../util/utilConts'
import TaskCard from './TaskCard'
import { getModalContent } from '../../commons/actions/modalActions'
import TaskForm from './TaskForm'
import DesertMoon from '../../../assets/img/desertMoon.png'

const TaskList = ({ date, tasksByMonth, getModalContent }) => {
    const taskByDate = tasksByMonth.filter(task => task.date.day === date.day);
    const formTitle = '+ Nueva Tarea';
    return <Container>
        <Row className="text-center p-2">
            <Col>
                <h5>
                    <i className="material-icons inline-icon">event_available</i>
                    {` ${date.day}/${Number(date.month) + 1}/${date.year}`}
                </h5>
            </Col>
            {evalueDate(date) !== PAST ? <Col>
                <Button block size="sm"
                    variant="primary"
                    onClick={() => getModalContent(<TaskForm title={formTitle} />)}>
                    {formTitle}
                </Button>
            </Col> : null}
        </Row>
        {taskByDate.length > 0 ?
            taskByDate.map((task, index) => <TaskCard key={index} task={task} />) :
            <Row className="text-center p-3">
                <Col>
                    <h5 className="text-center p-2">Sin tareas registradas</h5>
                    <img src={DesertMoon} alt="background" style={{ width: '100%' }} />
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