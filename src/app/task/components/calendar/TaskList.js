import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ButtonNewTask } from '../TaskElements'
import { evalueDate, stringJsonDate } from '../../../commons/util/func'
import { DATE_PROP_SHAPE, PAST } from '../../../commons/util/const'
import TaskCard from '../TaskCard'
import { getModalContent } from '../../../commons/actions/modalActions'
import TaskForm from '../TaskForm'
import SAINTS from '../../util/saints'

const TaskList = ({ date, tasksByMonth, getModalContent }) => {
    const taskByDate = tasksByMonth.filter(task => task.date.day === date.day);
    const formTitle = '+ Nueva Nota';
    const thereAreTasks = taskByDate.length > 0
    const newTask = () => getModalContent(<TaskForm />)
    const holiday = SAINTS[date.month].DAYS[date.day - 1].holiday || { title: '' }
    return <div>
        <div className="flex-center">
            <div className="col text-center">
                <h3><i className="fas fa-calendar" /> {stringJsonDate(date)} </h3>
                <h3>{holiday.title}</h3>
            </div>
            {evalueDate(date) !== PAST && thereAreTasks ?
                <ButtonNewTask title={formTitle} onClick={newTask} /> :
                null}
        </div>
        {thereAreTasks ? taskByDate.map((task, index) => <TaskCard key={index} task={task} />) :
            <div className="text-center row">
                <div className="col">
                    <h3 className="text-center">Sin notas registradas</h3>
                    <div className="empty-img"></div>
                    {evalueDate(date) !== PAST ? <ButtonNewTask title={formTitle} onClick={newTask} /> :
                        null}
                </div>
            </div>}
    </div>
}

TaskList.propTypes = {
    date: DATE_PROP_SHAPE.isRequired,
    tasksByMonth: PropTypes.array.isRequired,
    getModalContent: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    date: state.task.date,
    tasksByMonth: state.task.tasksByMonth
})

export default connect(mapStateToProps, { getModalContent })(TaskList);