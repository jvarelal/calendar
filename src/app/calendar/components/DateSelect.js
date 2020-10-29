import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { getLastDayMonth } from '../util/utilFuncCalendar'
import { SelectAlone } from '../../commons/components/AppElements'
import { MONTHS_SP } from '../util/utilConts'
import { fillNumberList } from '../util/utilFunc'

const DateSelect = ({ label, controlId, startDate, minDate, maxDate, handleChange }) => {
    const months = []
    const minDay = getMinDay(minDate, startDate);
    const maxDay = getMaxDay(maxDate, startDate);
    MONTHS_SP.forEach((month, index) => {
        if ((minDate.year !== startDate.year || index >= minDate.month) &&
            (maxDate.year !== startDate.year || index <= maxDate.month)) {
            months.push({ id: index, text: month })
        }
    });
    return <Form.Group controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Container>
            <Row>
                <Col>
                    <SelectAlone name="year" value={startDate.year}
                        options={fillNumberList(minDate.year, maxDate.year)}
                        onChange={handleChange} />
                </Col>
                <Col>
                    <SelectAlone name="month" value={startDate.month}
                        options={months} onChange={handleChange} />
                </Col>
                <Col>
                    <SelectAlone name="day" value={startDate.day}
                        options={fillNumberList(minDay, maxDay)}
                        onChange={handleChange} />
                </Col>
            </Row>
        </Container>
    </Form.Group>
}


const getMinDay = (minDate, startDate) => {
    let minDay = minDate.day < startDate.day ? minDate.day : startDate.day;
    if (minDate.year !== startDate.year || startDate.month > minDate.month) {
        minDay = 1
    }
    return minDay;
}

const getMaxDay = (maxDate, startDate) => {
    let maxDay = maxDate.day > startDate.day ? maxDate.day : startDate.day;
    if (maxDate.year !== startDate.year || startDate.month < maxDate.month) {
        maxDay = getLastDayMonth(startDate.year, startDate.month).getDate()
    }
    return maxDay;
}

export default DateSelect