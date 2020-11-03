import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { setYearMonth } from '../actions/calendarActions'
import { MONTHS_SP } from '../../commons/util/const'
import { SelectForm } from '../../commons/components/FormElements'

const months = MONTHS_SP.map((month, index) => ({ id: index, text: month }))

const YearMonthControl = ({ years, year, month, setYearMonth }) => <Row>
    <Col>
        <SelectForm name='month' value={month}
            options={months} onChange={setYearMonth} />
    </Col>
    <Col>
        <SelectForm name='year' value={year}
            options={years} onChange={setYearMonth} />
    </Col>
</Row>

YearMonthControl.propTypes = {
    years: PropTypes.array.isRequired,
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    setYearMonth: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    years: state.calendar.years,
    year: state.calendar.date.year,
    month: state.calendar.date.month
})

export default connect(mapStateToProps, { setYearMonth })(YearMonthControl)