import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { evalueDate } from '../util/utilFunc'
import { DATE_PROP_SHAPE, PAST } from '../util/utilConts'
import TaskCard from './TaskCard'
import { getModalContent } from '../actions/modalActions'
import TaskForm from './TaskForm'

const TaskList = ({ date, tasksByMonth, getModalContent }) => {
    const style = {
        paddingBottom: '15px',
        textAlign: 'center',
        marginBottom: '10px',
        borderBottom: '1px solid #888'
    };
    const legend = `Día: ${date.day}/${Number(date.month) + 1}/${date.year}`
    const taskByDate = tasksByMonth.filter(task => task.date.day === date.day);
    const formTitle = '+ Nueva Tarea';
    return <Container>
        <div style={style}>
            <header>
                <h4>{legend}</h4>
            </header>
            {evalueDate(date) !== PAST ?
                <Button variant="secondary" onClick={() => getModalContent(formTitle, <TaskForm />)}>
                    {formTitle}
                </Button> :
                null}
        </div>
        {taskByDate.length > 0 ?
            taskByDate.map((task, index) => <TaskCard key={index} task={task} />) :
            <h4 style={{ color: '#888' }}>Sin tareas registradas</h4>}
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