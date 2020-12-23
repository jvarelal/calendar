import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TaskCard from '../TaskCard'
import CalendarCell from './CalendarCell'
import MonthBackForward from './MonthBackForward'
import TaskForm from '../TaskForm'
import { getDaysInPanel } from '../../../util/funcCalendar'
import { evalueDate, onDragOver } from '../../../util/func'
import { processTask, setDate } from '../../actions/taskActions'
import { getModalMessage, getModalContent } from '../../../layout/actions/modalActions'
import { DATE_PROP_SHAPE, PAST } from '../../../util/const'

const CalendarList = ({ user, date, dashboards, tasksByMonth, processTask, getModalMessage, setDate, getModalContent }) => {
    const days = getDaysInPanel(date, tasksByMonth);
    const [dragging, setDragging] = React.useState(false)
    const dragTask = React.useRef();
    const dragCard = React.useRef();
    const onDragStart = (e, task) => {
        dragTask.current = task;
        dragCard.current = e.target;
        dragCard.current.addEventListener('dragend', onDragEnd)
        setDragging(true)
    }
    const onDragEnd = () => {
        dragCard.current.removeEventListener('dragend', onDragEnd)
        dragTask.current = null;
        dragCard.current = null;
        setDragging(false)
    }
    const onDrop = (e, d) => {
        let newDate = d.fullDate
        let task = dragTask.current
        if (task.done && (evalueDate(newDate) === PAST || evalueDate(task.date) === PAST)) {
            return getModalMessage('Editar nota', 'No se pueden asignar o afectar notas de fechas anteriores')
        }
        if (task.date.day !== newDate.day) {
            let nTask = { ...task, date: newDate, user }
            return processTask(dashboards.find(d => d.id === nTask.dashboard.id), nTask);
        }
    }
    const onDivClick = (e, d) => {
        if (d.able) {
            setDate(d.fullDate);
            getModalContent(<TaskForm />)
        }
    }
    return <div className="row">
        <div className="col">
            <div className="glass">
                <MonthBackForward />
                {days.map((d, index) => <div className="row m-0" key={index}>
                    <div className={'col col8 p-0 ptb-2 panel-cell ' + (d.able ? 'panel-active' : 'disable')}
                        onClick={(e) => onDivClick(e, d)}>
                        <CalendarCell day={d} flag={false} />
                    </div>
                    <div className="col p-4 panel-cell"
                        onDrop={dragging ? e => onDrop(e, d) : null}
                        onDragOver={onDragOver}>
                        <div className="row">
                            {d.tasks.map((task, index) => <TaskCard
                                task={task}
                                key={index}
                                expanded={false}
                                onDragStart={e => onDragStart(e, task)} />)}
                        </div>
                    </div>
                </div>
                )}
                <MonthBackForward />
            </div>
        </div>
    </div>
}

CalendarList.propTypes = {
    user: PropTypes.object,
    date: DATE_PROP_SHAPE.isRequired,
    tasksByMonth: PropTypes.array.isRequired,
    dashboards: PropTypes.array.isRequired,
    processTask: PropTypes.func.isRequired,
    setDate: PropTypes.func.isRequired,
    getModalMessage: PropTypes.func.isRequired,
    getModalContent: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    date: state.task.date,
    dashboards: state.task.dashboards,
    tasksByMonth: state.task.tasksByMonth,
    user: state.user
})

export default connect(
    mapStateToProps,
    { processTask, getModalMessage, setDate, getModalContent }
)(CalendarList)