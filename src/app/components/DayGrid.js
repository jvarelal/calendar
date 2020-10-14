import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { SYSDATE, DAYS_SP } from '../util/utilConts'
import { evalueTime, getLastDayMonth } from '../util/utilFunc'

const DayGrid = ({ year = SYSDATE.getFullYear(), month = 0, daySelected = 0, update = () => null, tasks = [] }) => {
    const [day, setDay] = useState(daySelected);
    const days = getDaysInGrid(year, month, day, tasks);
    const updateDay = (newDay) => {
        if (newDay.able) {
            setDay(newDay.date)
        }
    }
    useEffect(() => update(day));
    return <Table>
        <thead className="dayGrid">
            <tr>
                {DAYS_SP.map((daySp, index) =>
                    <th key={index} style={{ width: Math.trunc(100 / DAYS_SP.length) + '%' }}>
                        {daySp}
                    </th>)}
            </tr>
        </thead>
        <tbody className="dayGrid">
            {days.map((row, index) => <tr key={index}>
                {row.map((d, i) =>
                    <td key={i} className={d.className} onClick={e => updateDay(d)}>
                        <Arrow tasks={d.tasks}/>
                        {d.date}
                    </td>)}
            </tr>)}
        </tbody>
    </Table>
}

const getDaysInGrid = (year, month, daySelected, tasks) => {
    const daysPrevMonth = getLastDayMonth(year, Number(month) - 1);
    const lastDayMonth = getLastDayMonth(year, month).getDate();
    let days = [];
    let day = daysPrevMonth.getDate() - daysPrevMonth.getDay()
    while (day <= daysPrevMonth.getDate() && daysPrevMonth.getDay() < 6) {
        days = fillRowGrid(days, { date: day++, able: false, className: 'disable' });
    }
    for (day = 1; day <= lastDayMonth; day++) {
        days = fillRowGrid(days, {
            date: day,
            able: true,
            className: day == daySelected ? 'selected' : evalueTime(year, month, day),
            tasks: tasks.filter(t => t.day == day)
        });
    }
    day = 1;
    while (days[days.length - 1].length % 7 > 0) {
        days = fillRowGrid(days, { date: day++, able: false, className: 'disable' });
    }
    return days;
}

const fillRowGrid = (daysRow = [], newDay = {}) => {
    if (daysRow.length > 0 && daysRow[daysRow.length - 1].length < DAYS_SP.length) {
        daysRow[daysRow.length - 1].push(newDay);
    } else {
        daysRow.push([newDay]);
    }
    return daysRow
}

const Arrow = ({ tasks }) => {
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

export default DayGrid
