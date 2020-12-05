import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Header from '../../commons/components/styled/Header'
import { notificationsBySecond, getNotifications } from '../../commons/util/func'
import { updateTask } from '../actions/taskActions'
import Notification from '../../commons/components/styled/Notification'

const TaskReminder = ({ todayTasks, updateTask }) => {
    const [time, setTime] = React.useState(new Date().toLocaleTimeString());
    const [notifications, setNotifications] = React.useState([]);
    const dismissNotification = (task) => updateTask({ ...task, dismiss: true })
    const title = <>
        <i className="fas fa-clock icon" />
        {notifications.length > 0 ? <span className="badge"> {notifications.length}</span> : null}
    </>
    document.title = (notifications.length === 0 ? '' : '(' + notifications.length + ') ') + 'Agenda'
    React.useEffect(() => notificationsBySecond(setNotifications, todayTasks, setTime), [time, todayTasks]);
    React.useEffect(() => setNotifications(getNotifications(todayTasks)), [todayTasks]);
    return <Header.NavDropMenu logo={title}>
        <div className="card">
            {notifications.length > 0 ? notifications.map((task, index) => <Notification
                onClose={() => dismissNotification(task)}
                key={index}
		title={<>
                    <strong>{task.name}</strong>
                    <small>[{task.date.hour}:{task.date.minute}]</small>
                </>}
		text={task.detail}
		/>) : <div className="card-header text-center">
                    <div>Sin recordatorios</div>
                </div>}
        </div>
    </Header.NavDropMenu>
}

TaskReminder.propTypes = {
    todayTasks: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    todayTasks: state.task.todayTasks
})

export default connect(mapStateToProps, { updateTask, getNotifications })(TaskReminder);
