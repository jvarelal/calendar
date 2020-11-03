import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DATE_PROP_SHAPE, DAYS_SP } from '../../commons/util/const'
import { stringJsonDate } from '../../commons/util/func'
import { getCalendarTableByMonth, keyBoardMove } from '../util/funcCalendar'
import { setDate, deleteTaskById } from '../actions/calendarActions'
import TaskForm from './TaskForm'
import { TableHead, FlagPriorityTask, AlertTableFooter } from './AppElements'
import { getModalContent, getModalConfirmation } from '../../commons/actions/modalActions'

const alertBase = { show: false, msg: '' };

const CalendarTable = ({ date, tasksByMonth, setDate, getModalContent, getModalConfirmation, deleteTaskById }) => {
    const tableDays = getCalendarTableByMonth(date, tasksByMonth);
    const [alert, setAlert] = React.useState(alertBase)
    const messageOnDelete = `¿Desea eliminar todas las notas del ${stringJsonDate(date)}?`;
    const keyboardOperation = {
        date: date,
        tasks: tasksByMonth,
        arrowsKey: setDate,
        enterKey: () => getModalContent(<TaskForm title="+ Nueva Nota" />),
        suprKey: (tasksByDate) => getModalConfirmation(`Eliminar notas`, messageOnDelete, () => deleteTaskById(tasksByDate)),
        errorBoard: setAlert
    }
    const updateByClick = (newDay) => newDay.able ? setDate({ ...date, day: newDay.day }) : null;
    React.useEffect(() => setAlert(alertBase), [date])
    return <TableHead className="dayGrid" headers={DAYS_SP}>
        <tbody tabIndex="0"
            className="dayGrid"
            onKeyDown={e => keyBoardMove({ ...keyboardOperation, keyCode: e.keyCode })}>
            {tableDays.map((row, index) => <tr key={index}>
                {row.map((d, i) => <td key={i}
                    className={d.className + ' p-0'}
                    onClick={e => updateByClick(d)}>
                    <div style={{ marginBottom: '0.8rem', marginTop: '0.8rem' }}>
                        <FlagPriorityTask tasks={d.tasks} />
                        <h6 style={{ display: 'inline-block' }}>{d.day}</h6>
                    </div>
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
    deleteTaskById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    date: state.calendar.date,
    tasksByMonth: state.calendar.tasksByMonth
})

export default connect(
    mapStateToProps,
    { setDate, getModalContent, getModalConfirmation, deleteTaskById }
)(CalendarTable)
