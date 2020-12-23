import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Form from '../../../commons/components/Form'
import { stringJsonDate } from '../../../util/func'
import { setYearMonth } from '../../actions/taskActions'
import { DATE_PROP_SHAPE, MONTHS_SP } from '../../../util/const'
import DashBoardGroup from '../dashboard/DashBoardGroup'
import TaskCard from '../TaskCard'
import CalendarGrid from './CalendarGrid'
import CalendarList from './CalendarList'
import SAINTS from '../../../util/saints'

const Calendar = ({ years, date, tasksByMonth, setYearMonth }) => {
    const [grid, setGrid] = React.useState(true)
    const holiday = SAINTS[date.month].DAYS[date.day - 1].holiday
    const nameGroup = <>
        <i className="fas fa-calendar" /> {stringJsonDate(date)} {holiday ? `- ${holiday.title}` : null}
    </>
    return <div className="container">
        <div className="row">
            <div className="col">
                <Form.Select name="year" value={date.year} label="Año"
                    onChange={setYearMonth} options={years} />
            </div>
            <div className="col">
                <Form.Select name="month" label="Mes" value={date.month}
                    options={MONTHS_SP.map((month, index) => ({ id: index, text: month }))}
                    onChange={setYearMonth} />
            </div>
            <div className="col col4 text-center responsive-hide">
                <Form.Group>
                    <button className="btn btn-primary" onClick={() => setGrid(!grid)}>
                        <i className={`fas fa-${grid ? 'calendar-alt' : 'columns'}`} /> {grid ? ' Grid' : ' Lista'}
                    </button>
                </Form.Group>
            </div>
        </div>
        {grid ? <div className="row">
            <div className="col">
                <CalendarGrid />
            </div>
            <div className="col col4 bl-gray">
                <DashBoardGroup vertical={true} group={{ name: nameGroup }}>
                    {tasksByMonth.filter(task => task.date.day === date.day).map((task, index) =>
                        <TaskCard key={index} task={task} />)}
                </DashBoardGroup >
            </div>
        </div> : <CalendarList />}
    </div >
}

Calendar.propTypes = {
    years: PropTypes.array.isRequired,
    date: DATE_PROP_SHAPE.isRequired,
    tasksByMonth: PropTypes.array.isRequired,
    setYearMonth: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    years: state.task.years,
    tasksByMonth: state.task.tasksByMonth,
    date: state.task.date
})

export default connect(mapStateToProps, { setYearMonth })(Calendar)