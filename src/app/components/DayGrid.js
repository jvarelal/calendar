import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { SYSDATE, DAYS_SP } from '../util/constants'

const PAST = 'past';
const PRESENT = 'today';
const FUTURE = 'future';

const DayGrid = ({ year = SYSDATE.getFullYear(), month = 0, daySelected = 0, update = () => null, }) => {
    const [day, setDay] = useState(daySelected);
    const days = getDaysInGrid(year, month, day);
    const updateDay = (newDay) => {
        if (newDay.able) {
            setDay(newDay.date == day ? null : newDay.date)
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
                        {d.date}
                    </td>)}
            </tr>)}
        </tbody>
    </Table>
}

const getDaysInGrid = (year, month, daySelected) => {
    const daysPrevMonth = new Date(year, month, 0);
    const lastDayMonth = getLastDayMonth(year, month);
    let days = [];
    let daysToComplete = daysPrevMonth.getDate() - daysPrevMonth.getDay()
    while(daysToComplete <= daysPrevMonth.getDate() && daysPrevMonth.getDay() < 6){
        days = fillRowGrid(days, { date: daysToComplete++, able: false, className: 'disable' });
    }
    for (daysToComplete = 1; daysToComplete <= lastDayMonth; daysToComplete++) {
        days = fillRowGrid(days, {
            date: daysToComplete,
            able: true,
            className: daysToComplete == daySelected ? 'selected' : evalueTime(year, month, daysToComplete)
        });
    }
    daysToComplete = 1;
    while (days[days.length - 1].length % 7 > 0) {
        days = fillRowGrid(days, { date: daysToComplete++, able: false, className: 'disable' });
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

const getLastDayMonth = (year, month) => new Date(year, Number(month) + 1, 0).getDate()

const evalueTime = (year, month, day) => {
    if (year == SYSDATE.getFullYear() && month == SYSDATE.getMonth() && day == SYSDATE.getDate()) {
        return PRESENT;
    }
    if (year > SYSDATE.getFullYear()) {
        return FUTURE;
    }
    if (year == SYSDATE.getFullYear()) {
        if (month > SYSDATE.getMonth()) {
            return FUTURE;
        }
        if (month == SYSDATE.getMonth() && day > SYSDATE.getDate()) {
            return FUTURE;
        }
    }
    return PAST;
}

export default DayGrid
