import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DATE_PROP_SHAPE, DAYS_SP } from '../../../commons/util/const'
import { getCalendarTableByMonth, keyBoardMove } from '../../util/funcCalendar'
import { setDate } from '../../actions/taskActions'
import TaskForm from '../TaskForm'
import CalendarCell from './CalendarCell'
import MonthBackForward from './MonthBackForward'
import Table from '../../../commons/components/Table'
import { getModalContent, getModalConfirmation } from '../../../layout/actions/modalActions'

const alertBase = { show: false, msg: '' };

const CalendarGrid = ({ date, tasksByMonth, setDate, getModalContent }) => {
    const tableDays = getCalendarTableByMonth(date, tasksByMonth);
    const [alert, setAlert] = React.useState(alertBase)
    const tableEl = React.useRef(null)
    const keyboardOperation = {
        date: date,
        tasks: tasksByMonth,
        arrowsKey: setDate,
        enterKey: () => getModalContent(<TaskForm />),
        errorBoard: setAlert
    }
    React.useEffect(() => tableEl.current.focus(), [])
    React.useEffect(() => setAlert(alertBase), [date])
    return <Table className="text-center" headers={DAYS_SP.map(D => ({ text: D, responsiveText: D[0] }))}>
        <tbody tabIndex="0" ref={tableEl}
            onKeyDown={e => keyBoardMove({ ...keyboardOperation, keyCode: e.keyCode })}>
            {tableDays.map((row, index) => <tr key={index}>
                {row.map((d, i) => <td key={i} className={d.className} onClick={() => setDate(d.fullDate)}>
                    <CalendarCell day={d} />
                </td>)}
            </tr>)}
            <tr>
                <td colSpan={DAYS_SP.length} style={{ padding: '0px' }}>
                    <MonthBackForward />
                </td>
            </tr>
        </tbody>
        <Table.AlertFooter colSpan={DAYS_SP.length} alert={alert} onClose={() => setAlert(alertBase)} />
    </Table>
}

CalendarGrid.propTypes = {
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
)(CalendarGrid)
