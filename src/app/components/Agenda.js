import React, { useState, useEffect } from 'react'
import SelectText from './SelectText'
import DayGrid from './DayGrid'
import ListTask from './ListTask'
import Form from 'react-bootstrap/Form'
import { Container, Row, Col } from 'react-bootstrap'
import {SYSDATE, MONTHS_SP} from '../util/constants'

const Agenda = ({ minYear = 2010, maxYear = 2040 }) => {
    const [year, setYear] = useState(SYSDATE.getUTCFullYear());
    const [month, setMonth] = useState(SYSDATE.getMonth());
    const [day, setDay] = useState(SYSDATE.getDate());
    const years = listYears(minYear, maxYear);
    const months = MONTHS_SP.map((m, index) => ({ id: index, text: m }))
    return <div>
        <Form>
            <Container fluid>
                <Row>
                    <Col>
                        <SelectText
                            value={year}
                            options={years}
                            update={setYear}
                            htmlProps={{ id: 'year' }} />
                    </Col>
                    <Col>
                        <SelectText
                            value={month}
                            options={months}
                            update={setMonth}
                            htmlProps={{ id: 'month' }} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DayGrid year={year} month={month} update={setDay} daySelected={day}/>
                    </Col>
                    {day ? <Col xs={3}>
                        <ListTask year={year} month={month} day={day} />
                    </Col> : null}
                </Row>
            </Container>
        </Form>
    </div>
}

const listYears = (begin = 0, end = 0) => {
    let years = [];
    if (begin > end)
        throw new Error('Años invalidos')
    for (let year = begin; year <= end; year++) {
        years.push({ id: year, text: year });
    }
    return years;
}

export default Agenda;