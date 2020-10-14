import React, { useState, useEffect } from 'react'
import DayGrid from './DayGrid'
import ListTask from './ListTask'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { SYSDATE, MONTHS_SP } from '../util/utilConts'
import { fillNumberList } from '../util/utilFunc'
import { readTasks } from '../actions/actions'

const Agenda = ({ minYear = 2010, maxYear = 2040 }) => {
    const [year, setYear] = useState(SYSDATE.getUTCFullYear());
    const [month, setMonth] = useState(SYSDATE.getMonth());
    const [day, setDay] = useState(SYSDATE.getDate());
    const [tasks, setTasks] = useState();
    const years = fillNumberList(minYear, maxYear);
    const months = MONTHS_SP.map((m, index) => ({ id: index, text: m }))
    useEffect(() => readTasks(year, month, setTasks), [year,month])
    return <Container fluid>
        <Row>
            <Col>
                <Container fluid>
                    <Row>
                        <Col />
                        <Col>
                            <Form.Group controlId={'month'}>
                                <Form.Control as="select" value={month} onChange={e => setMonth(e.target.value)}>
                                    {months.map((option, index) => <option key={index} value={option.id}>{option.text}</option>)}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId={'year'}>
                                <Form.Control as="select" value={year} onChange={e => setYear(e.target.value)}>
                                    {years.map((option, index) => <option key={index} value={option}>{option}</option>)}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col />
                    </Row>
                    <Row>
                        <Col>
                            <DayGrid year={year} month={month} update={setDay} daySelected={day} tasks={tasks} />
                        </Col>
                    </Row>
                </Container>
            </Col>
            <Col xs={4}>
                <Col>
                    <ListTask year={year} month={month} day={day} tasks={tasks} />
                </Col>
            </Col>
        </Row>
    </Container>
}

export default Agenda;