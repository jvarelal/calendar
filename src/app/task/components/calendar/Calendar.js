import React from 'react';
import CalendarTable from './CalendarTable'
import TaskList from './TaskList'
import YearMonthControl from './YearMonthControl'

const Calendar = () => <div className="container">
    <div className="row">
        <div className="col">
            <YearMonthControl />
            <CalendarTable />
        </div>
        <div className="col col4 bl-gray">
            <TaskList />
        </div>
    </div>
</div>

export default Calendar