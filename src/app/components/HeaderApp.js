import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Alert, Badge, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { colorPriority, notificationsBySecond } from '../util/utilFunc'
import { readTasks, updateTask } from '../actions/calendarActions'

const HeaderApp = ({ todayTasks, updateTask, readTasks }) => {
    const [notifications, setNotifications] = React.useState([]);
    const dismissNotification = (task) => updateTask({
        ...task, dismiss: true, cb: () => readTasks(task.date)
    })
    const title = <>
        {notifications.length > 0 ? <Badge variant="danger"> {todayTasks.length}</Badge> : null}
         Notificaciones
    </>
    document.title = (notifications.length === 0 ? '' : '(' + notifications.length + ') ') + 'Agenda'
    React.useEffect(() => notificationsBySecond(setNotifications, todayTasks), [todayTasks]);
    return <header style={{ marginBottom: '25px' }}>
        <Navbar bg="info" variant="dark">
            <Navbar.Brand href="#home">Agenda</Navbar.Brand>
            <Nav className="mr-auto" />
            <Nav>
                <NavDropdown title={title} id="collasible-nav-dropdown" drop={'left'}>
                    <div style={{ width: '250px' }}>
                        {notifications.length > 0 ? todayTasks.map((task, index) =>
                            <Alert dismissible key={index}
                                variant={colorPriority(task.priority)}
                                onClose={() => dismissNotification(task)} >
                                {task.name} [ Hora: {task.date.hour}:{task.date.minute} ]
                            </Alert>) : <p style={{ padding: '5px' }}>Sin notificaciones</p>}
                    </div>
                </NavDropdown>
            </Nav>
        </Navbar>
    </header>
}

HeaderApp.propTypes = {
    todayTasks: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    todayTasks: state.calendar.todayTasks
})

export default connect(mapStateToProps, { updateTask, readTasks })(HeaderApp);