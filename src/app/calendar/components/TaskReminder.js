import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Alert, Badge, NavDropdown } from 'react-bootstrap'
import { colorPriority, notificationsBySecond, getNotifications } from '../../commons/util/func'
import { updateTask } from '../actions/calendarActions'

const TaskReminder = ({ todayTasks, updateTask }) => {
    const [time, setTime] = React.useState(new Date().toLocaleTimeString());
    const [notifications, setNotifications] = React.useState([]);
    const dismissNotification = (task) => updateTask({ ...task, dismiss: true })
    const title = <>
        <i className="material-icons inline-icon">access_alarm</i>
        {notifications.length > 0 ? <Badge variant="danger"> {todayTasks.length}</Badge> : null}
    </>
    document.title = (notifications.length === 0 ? '' : '(' + notifications.length + ') ') + 'Agenda'
    React.useEffect(() => notificationsBySecond(setNotifications, todayTasks, setTime), [time]);
    React.useEffect(() => setNotifications(getNotifications(todayTasks)), [todayTasks]);
    return <NavDropdown title={title} id="collasible-nav-dropdown" drop={'left'}>
        <div style={{ width: '250px' }}>
            {notifications.length > 0 ? notifications.map((task, index) =>
                <Alert dismissible key={index}
                    variant={colorPriority(task.priority)}
                    onClose={() => dismissNotification(task)} >
                    {task.name} [ Hora: {task.date.hour}:{task.date.minute} ]
            </Alert>) : <p style={{ padding: '5px' }}>Sin recordatorios</p>}
        </div>
    </NavDropdown>
}

TaskReminder.propTypes = {
    todayTasks: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    todayTasks: state.calendar.todayTasks
})

export default connect(mapStateToProps, { updateTask, getNotifications })(TaskReminder);