import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'
import { MemoryRouter } from 'react-router'
import { DATE_PROP_SHAPE } from '../util/utilConts'
import CalendarTable from './CalendarTable'
import TaskList from './TaskList'
import YearMonthControl from './YearMonthControl'
import TaskPanel from './TaskPanel'
import { MenuTabs } from '../../commons/components/AppElements'
import { readTasks } from '../actions/calendarActions'

const Calendar = ({ date, readTasks }) => {
    let navs = [
        { link: '/', name: 'Calendario', component: TaskInCalendar },
        { link: '/list', name: 'Lista', component: TaskPanel }
    ]
    React.useEffect(() => readTasks(date), []) // eslint-disable-line react-hooks/exhaustive-deps
    return <Container>
        <MemoryRouter>
            <MenuTabs navs={navs} />
            <Switch>
                {navs.map((nav, index) => <Route key={index} exact path={nav.link} component={nav.component} />)}
            </Switch>
        </MemoryRouter>
    </Container>
}

const TaskInCalendar = () => <Row>
    <Col xs={8}>
        <YearMonthControl />
        <CalendarTable />
    </Col>
    <Col>
        <TaskList />
    </Col>
</Row>

Calendar.propTypes = {
    date: DATE_PROP_SHAPE.isRequired,
    readTasks: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    date: state.calendar.date
})

export default connect(mapStateToProps, { readTasks })(Calendar)