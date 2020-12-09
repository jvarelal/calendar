import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import YearMonthControl from './YearMonthControl'
import TaskCard from '../TaskCard'
import TaskForm from '../TaskForm'
import { getDaysInPanel } from '../../util/funcCalendar'
import { fragmentDate, evalueDate, onDragOver } from '../../../commons/util/func'
import { processTask, setDate } from '../../actions/taskActions'
import { getModalMessage, getModalContent } from '../../../commons/actions/modalActions'
import { DATE_PROP_SHAPE, DAYS_SP, PAST } from '../../../commons/util/const'
import { MonthBackForward } from '../TaskElements'

const TaskDatePanel = ({ date, dashboards, tasksByMonth, processTask, getModalMessage, setDate, getModalContent }) => {
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
        let newDate = { ...date, day: d.day }
        let task = dragTask.current
        if (task.done && (evalueDate(newDate) === PAST || evalueDate(task.date) === PAST)) {
            return getModalMessage('Editar nota', 'No se pueden asignar o afectar notas de fechas anteriores')
        }
        if (task.date.day !== newDate.day) {
            let nTask = { ...task, date: newDate }
            return processTask(dashboards, nTask);
        }
    }
    const onDivClick = (e, d) => {
        if (d.able) {
            setDate({ ...date, day: d.day });
            getModalContent(<TaskForm />)
        }
    }
    const monthBack = () => setDate(fragmentDate(new Date(date.year, Number(date.month) - 1, date.day)))
    const monthFordward = () => setDate(fragmentDate(new Date(date.year, Number(date.month) + 1, date.day)))
    return <div className="container">
        <YearMonthControl />
        <div className="ptb-7 container">
            <MonthBackForward back={monthBack} forward={monthFordward} />
            {days.map((d, index) => <div className="row" key={index} style={{ margin: '0px' }}>
                <div className={'col col8 ptb-2 panel-cell ' + (d.able ? 'panel-active' : 'disable')}
                    onClick={(e) => onDivClick(e, d)}>
                    <h1 className="m-1">
                        {d.day} {d.saint.holiday ? <i style={{ fontSize: '1.25rem' }}
                            className={d.saint.holiday.icon + ' m-2'} title={d.saint.holiday.title} /> : ''}
                    </h1>
                    <p className="m-1"> {DAYS_SP[d.dayOfWeek]} </p>
                    <p className="m-1" style={{ fontSize: '0.75rem' }}> {d.saint.name} </p>
                </div>
                <div className="col p-4 panel-cell"
                    onDrop={dragging ? e => onDrop(e, d) : null}
                    onDragOver={onDragOver}>
                    <div className="row">
                        {d.tasks.map((task, index) => <TaskCard
                            task={task}
                            key={index}
                            expanded={true}
                            onDragStart={e => onDragStart(e, task)} />)}
                    </div>
                </div>
            </div>
            )}
            <MonthBackForward back={monthBack} forward={monthFordward} />
        </div>
    </div>
}

TaskDatePanel.propTypes = {
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
    tasksByMonth: state.task.tasksByMonth
})

export default connect(
    mapStateToProps,
    { processTask, getModalMessage, setDate, getModalContent }
)(TaskDatePanel)