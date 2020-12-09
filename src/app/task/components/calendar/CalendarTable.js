import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DATE_PROP_SHAPE, DAYS_SP } from '../../../commons/util/const'
import { fragmentDate } from '../../../commons/util/func'
import { getCalendarTableByMonth, keyBoardMove } from '../../util/funcCalendar'
import { setDate } from '../../actions/taskActions'
import TaskForm from '../TaskForm'
import { TableWithHeader, AlertFooter, MonthBackForward } from '../TaskElements'
import { getModalContent, getModalConfirmation } from '../../../commons/actions/modalActions'

const alertBase = { show: false, msg: '' };

const DAYS_CALENDAR_HEAD = DAYS_SP.map((DAY, i) => <React.Fragment key={i}>
    <span className="normal-th">{DAY}</span><span className="sm-th">{DAY[0]}</span>
</React.Fragment>)

const CalendarTable = ({ date, tasksByMonth, setDate, getModalContent }) => {
    const tableDays = getCalendarTableByMonth(date, tasksByMonth);
    const [alert, setAlert] = React.useState(alertBase)
    const keyboardOperation = {
        date: date,
        tasks: tasksByMonth,
        arrowsKey: setDate,
        enterKey: () => getModalContent(<TaskForm />),
        errorBoard: setAlert
    }
    const monthBack = () => setDate(fragmentDate(new Date(date.year, Number(date.month) - 1, date.day)))
    const monthFordward = () => setDate(fragmentDate(new Date(date.year, Number(date.month) + 1, date.day)))
    React.useEffect(() => setAlert(alertBase), [date])
    return <TableWithHeader className="dayGrid" headers={DAYS_CALENDAR_HEAD}>
        <tbody tabIndex="0" onKeyDown={e => keyBoardMove({ ...keyboardOperation, keyCode: e.keyCode })}>
            {tableDays.map((row, index) => <tr key={index}>
                {row.map((d, i) => <td key={i} className={d.className} onClick={e => setDate(d.fullDate)}>
                    {d.tasks && d.tasks.length > 0 ? <div className="flag"></div> : null}
                    <div className="space">
                        <h2 className="lighter m-auto">
                            {d.fullDate.day} {d.saint.holiday ? <i style={{ fontSize: '1.25rem' }}
                                className={d.saint.holiday.icon + ' m-2'} title={d.saint.holiday.title} /> : ''}
                        </h2>
                        {d.week ? <div className="week">{d.week}</div> : null}
                        <p className="m-auto ptb-4 text-sm">{d.saint.name}</p>
                    </div>
                </td>)}
            </tr>)}
            <tr>
                <td colSpan={DAYS_SP.length} style={{ padding: '0px' }}>
                    <MonthBackForward back={monthBack} forward={monthFordward} />
                </td>
            </tr>
        </tbody>
        <AlertFooter colSpan={DAYS_SP.length} alert={alert} onClose={() => setAlert(alertBase)} />
    </TableWithHeader>

}

CalendarTable.propTypes = {
    date: DATE_PROP_SHAPE.isRequired,
    tasksByMonth: PropTypes.array.isRequired,
    setDate: PropTypes.func.isRequired,
    getModalContent: PropTypes.func.isRequired,
    getModalConfirmation: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    date: state.task.date,
    dahsboards: state.task.dashboards,
    tasksByMonth: state.task.tasksByMonth
})

export default connect(
    mapStateToProps,
    { setDate, getModalContent, getModalConfirmation }
)(CalendarTable)
