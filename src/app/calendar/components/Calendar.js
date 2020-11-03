import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import CalendarTable from './CalendarTable'
import TaskList from './TaskList'
import YearMonthControl from './YearMonthControl'

const Calendar = () => <Container className="pt-4 calendarDiv">
    <Row>
        <Col xs={8}>
            <YearMonthControl />
            <CalendarTable />
        </Col>
        <Col>
            <TaskList />
        </Col>
    </Row>
</Container>

export default Calendar