import React, { useState, useEffect } from 'react'
import { Table, Alert } from 'react-bootstrap'
import { DAYS_SP, KEYCODES } from '../util/utilConts'
import { evalueTime, getLastDayMonth, fragmentDate } from '../util/utilFunc'
import { FUTURE } from '../util/utilConts'

const alertBase = { show: false, msg: '' };

const DayGrid = ({ dateSelected = {}, update = () => null, tasks = [], newTask = () => null, deleteTasks = () => null }) => {
    const daysInGrid = getDaysInGrid(dateSelected, tasks);
    const updateDay = (newDay) => newDay.able ? update({ ...dateSelected, day: newDay.day }) : null;
    const width = Math.trunc(100 / DAYS_SP.length) + '%';
    const [alert, setAlert] = useState(alertBase)
    const kbOperation = {
        date: dateSelected,
        tasks: tasks,
        arrowsKey: update,
        enterKey: newTask,
        suprKey: deleteTasks,
        errorBoard: setAlert
    }
    useEffect(() => setAlert(alertBase), [dateSelected])
    return <Table>
        <thead className="dayGrid">
            <tr>
                {DAYS_SP.map((daySp, index) => <th key={index} style={{ width: width }}>{daySp}</th>)}
            </tr>
        </thead>
        <tbody tabIndex="0" className="dayGrid" onKeyDown={e => keyBoardMove({ ...kbOperation, keyCode: e.keyCode })}>
            {daysInGrid.map((row, index) => <tr key={index}>
                {row.map((d, i) => <td key={i} className={d.className} onClick={e => updateDay(d)}>
                    <FlagPriorityTask tasks={d.tasks} /> {d.day}
                </td>)}
            </tr>)}
        </tbody>
        <tfoot>
            <tr>
                <td colSpan={DAYS_SP.length}>
                    {alert.show ? <Alert variant="warning" onClose={() => setAlert(alertBase)} dismissible>
                        {alert.msg}
                    </Alert> : null}
                </td>
            </tr>
        </tfoot>
    </Table>
}

const getDaysInGrid = (date, tasks) => {
    const daysPrevMonth = getLastDayMonth(date.year, Number(date.month) - 1);
    const lastDayMonth = getLastDayMonth(date.year, date.month).getDate();
    let days = [];
    let day = daysPrevMonth.getDate() - daysPrevMonth.getDay()
    while (day <= daysPrevMonth.getDate() && daysPrevMonth.getDay() < 6) {
        fillRowGrid(days, { day: day++, able: false, className: 'disable' });
    }
    for (day = 1; day <= lastDayMonth; day++) {
        fillRowGrid(days, {
            day: day,
            able: true,
            className: day == date.day ? 'selected' : evalueTime({ ...date, day: day }),
            tabIndex: day == date.day ? '0' : null,
            tasks: tasks.filter(t => t.day == day)
        });
    }
    day = 1;
    while (days[days.length - 1].length % 7 > 0) {
        fillRowGrid(days, { day: day++, able: false, className: 'disable' });
    }
    return days;
}

const fillRowGrid = (daysRow = [], newDay = {}) => {
    if (daysRow.length > 0 && daysRow[daysRow.length - 1].length < DAYS_SP.length)
        daysRow[daysRow.length - 1].push(newDay);
    else
        daysRow.push([newDay]);
}

const FlagPriorityTask = ({ tasks }) => {
    if (!tasks || tasks.length === 0) {
        return null;
    }
    let colorWarning = tasks.find(t => t.priority == 1)
    let colorDanger = tasks.find(t => t.priority == 2)
    let styles = {
        width: '0',
        height: '0',
        borderTop: '10px solid transparent',
        borderBottom: '10px solid transparent',
        borderLeft: '25px solid ' + (colorDanger ? '#dc3545' : (colorWarning ? '#ffc107' : '#007bff')),
        float: 'left'
    }
    return <div style={styles}> </div>
}

const keyBoardMove = (kbOperation) => {
    try {
        let date = kbOperation.date
        switch (kbOperation.keyCode) {
            case KEYCODES.LEFT:
                return kbOperation.arrowsKey(fragmentDate(new Date(date.year, date.month, Number(date.day) - 1)))
            case KEYCODES.UP:
                return kbOperation.arrowsKey(fragmentDate(new Date(date.year, date.month, Number(date.day) - 7)))
            case KEYCODES.RIGHT:
                return kbOperation.arrowsKey(fragmentDate(new Date(date.year, date.month, Number(date.day) + 1)))
            case KEYCODES.DOWN:
                return kbOperation.arrowsKey(fragmentDate(new Date(date.year, date.month, Number(date.day) + 7)))
            case KEYCODES.ENTER:
                if (evalueTime(date) != FUTURE)
                    throw new Error('* Solo se pueden asignar tareas a fechas posteriores a la actual')
                return kbOperation.enterKey();
            case KEYCODES.SUPR:
                if (evalueTime(date) != FUTURE)
                    throw new Error('* No se pueden eliminar tareas de la fecha actual o anteriores')
                if (kbOperation.tasks.find(t => t.year == date.year && t.month == date.month && t.day == date.day))
                    return kbOperation.suprKey();
            default:
                return null;
        }
    } catch (e) {
        return kbOperation.errorBoard({ show: true, msg: e.message })
    }
}

export default DayGrid
