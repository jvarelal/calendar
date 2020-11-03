import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { sortTasksByPriority } from '../util/funcCalendar'
import { VARIANTS, PRIORITIES, DATE_PROP_SHAPE } from '../../commons/util/const'
import TaskCard from './TaskCard'
import TaskForm from './TaskForm'
import { getModalContent } from '../../commons/actions/modalActions'
import { readTasks } from '../actions/calendarActions'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { SelectFormH } from '../../commons/components/FormElements'

const TaskDashBoard = ({ date, tasks, getModalContent, readTasks }) => {
    const [filter, setFilter] = React.useState('');
    const tasksNotDone = tasks.filter(task => !task.done && (filter === '' || filter === task.priority.toString()))
    const taskList = sortTasksByPriority(tasksNotDone)
    const newTaskTitle = '+ Nueva Nota'
    const newTask = () => getModalContent(<TaskForm title={newTaskTitle} />)
    const priorities = [
        { id: '', text: 'Todas' },
        ...PRIORITIES.map((p, i) => ({ id: i.toString(), text: 'Prioridad ' + p }))
    ]
    return <Container className="pt-4 calendarDiv">
        <Row>
            <Col>
                <SelectFormH name='priority' value={filter} label="En vista: "
                    options={priorities} onChange={target => setFilter(target.value)} />
            </Col>
            <Col className="text-right">
                <Button variant="info" onClick={newTask}>
                    <i className="material-icons inline-icon">add</i>
                </Button>
            </Col>
        </Row>
        <Row>
            {VARIANTS.map((variant, i) => taskList[variant].map((task, index) =>
                <Col key={index} xs={4}>
                    <TaskCard task={task} expanded={true} />
                </Col>))}
        </Row>
    </Container>
}

TaskDashBoard.propTypes = {
    tasks: PropTypes.array.isRequired,
    date: DATE_PROP_SHAPE.isRequired,
    readTasks: PropTypes.func.isRequired,
    getModalContent: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    tasks: state.calendar.tasks,
    date: state.calendar.date
})

export default connect(
    mapStateToProps,
    { getModalContent, readTasks }
)(TaskDashBoard)