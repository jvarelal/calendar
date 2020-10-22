import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DATE_PROP_SHAPE, DAYS_SP } from '../util/utilConts'
import { getCalendarTableByMonth, keyBoardMove } from '../util/utilFuncCalendar'
import { TableHead, FlagPriorityTask, AlertTableFooter } from './AppElements'
import { getModalContent, getModalConfirmation } from '../actions/modalActions'
import { setDate, readTasks, deleteTasksByDate } from '../actions/calendarActions'
import TaskForm from './TaskForm'

const alertBase = { show: false, msg: '' };

const CalendarTable = ({ date, readTasks, tasksByMonth, setDate, getModalContent, getModalConfirmation, deleteTasksByDate }) => {
    const tableDays = getCalendarTableByMonth(date, tasksByMonth);
    const [alert, setAlert] = React.useState(alertBase)
    const messageOnDelete = `¿Desea eliminar todas las tareas del ${date.day}/${date.month}/${date.year}?`;
    const confirmDelete = () => deleteTasksByDate({ ...date, cb: () => readTasks(date) });
    const keyboardOperation = {
        date: date,
        tasks: tasksByMonth,
        arrowsKey: setDate,
        enterKey: () => getModalContent('+ Nueva Tarea', <TaskForm />),
        suprKey: () => getModalConfirmation(`Eliminar tareas`, messageOnDelete, confirmDelete),
        errorBoard: setAlert
    }
    const updateByClick = (newDay) => newDay.able ? setDate({ ...date, day: newDay.day }) : null;
    React.useEffect(() => setAlert(alertBase), [date])
    React.useEffect(() => readTasks(date), [date.month, date.year]) // eslint-disable-line react-hooks/exhaustive-deps
    return <TableHead className="dayGrid" headers={DAYS_SP}>
        <tbody tabIndex="0"
            className="dayGrid"
            onKeyDown={e => keyBoardMove({ ...keyboardOperation, keyCode: e.keyCode })}>
            {tableDays.map((row, index) => <tr key={index}>
                {row.map((d, i) => <td key={i} className={d.className} onClick={e => updateByClick(d)}>
                    <FlagPriorityTask tasks={d.tasks} /> {d.day}
                </td>)}
            </tr>)}
        </tbody>
        <AlertTableFooter colSpan={DAYS_SP.length} alert={alert} onClose={() => setAlert(alertBase)} />
    </TableHead>
}

CalendarTable.propTypes = {
    date: DATE_PROP_SHAPE.isRequired,
    tasksByMonth: PropTypes.array.isRequired,
    setDate: PropTypes.func.isRequired,
    getModalContent: PropTypes.func.isRequired,
    getModalConfirmation: PropTypes.func.isRequired,
    deleteTasksByDate: PropTypes.func.isRequired,
    readTasks: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    date: state.calendar.date,
    tasksByMonth: state.calendar.tasksByMonth
})

export default connect(
    mapStateToProps,
    { readTasks, setDate, getModalContent, getModalConfirmation, deleteTasksByDate }
)(CalendarTable)
