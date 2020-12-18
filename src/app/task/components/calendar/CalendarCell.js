import React from 'react'
import { DAYS_SP } from '../../../commons/util/const'

const CalendarCell = ({ day, flag = true }) => {
    return <div className="space">
        {day.tasks && day.tasks.length > 0 && flag ?
            <div className="flag"></div> :
            null}
        <h2 className="lighter m-auto">
            {day.fullDate.day} {day.saint.holiday ? <i
                style={{ fontSize: '1.25rem' }}
                className={`${day.saint.holiday.icon} m-2`}
                title={day.saint.holiday.title} /> : ''}
        </h2>
        {day.week ? <div className="week">{day.week}</div> : null}
        {day.dayOfWeek !== undefined ? <p className="m-1"> {DAYS_SP[day.dayOfWeek]} </p> : null}
        <p className="m-auto ptb-4 text-sm saint">{day.saint.name}</p>
    </div>
}

export default CalendarCell