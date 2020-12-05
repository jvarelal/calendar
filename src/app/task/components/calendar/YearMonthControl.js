import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Form from '../../../commons/components/styled/Form'
import { setYearMonth } from '../../actions/taskActions'
import { MONTHS_SP } from '../../../commons/util/const'

const months = MONTHS_SP.map((month, index) => ({ id: index, text: month }))

const YearMonthControl = ({ years, year, month, setYearMonth }) => <div className="row">
    <div className="col">
        <Form.Select name="month" value={month} label="Mes"
            onChange={setYearMonth} options={months} flash />
    </div>
    <div className="col">
        <Form.Select name="year" value={year} label="Año"
            onChange={setYearMonth} options={years} flash />
    </div>
</div>

YearMonthControl.propTypes = {
    years: PropTypes.array.isRequired,
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    setYearMonth: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    years: state.task.years,
    year: state.task.date.year,
    month: state.task.date.month
})

export default connect(mapStateToProps, { setYearMonth })(YearMonthControl)