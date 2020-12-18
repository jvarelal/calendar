import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Header from '../../commons/components/Header'
import { notificationsBySecond, getNotifications } from '../../commons/util/func'
import { processTask } from '../actions/taskActions'
import Notification from '../../commons/components/Notification'

const TaskReminder = ({ tasks, dashboards, processTask }) => {
    const [time, setTime] = React.useState(new Date().toLocaleTimeString());
    const [notifications, setNotifications] = React.useState([]);
    const dismissNotification = (task) => processTask(dashboards, task, true)
    const title = <>
        <i className="fas fa-clock icon-g" />
        {notifications.length > 0 ? <span className="badge"> {notifications.length}</span> : null}
    </>
    document.title = (notifications.length === 0 ? '' : '(' + notifications.length + ') ') + 'Agenda'
    React.useEffect(() => notificationsBySecond(setNotifications, tasks, setTime), [time, tasks]);
    React.useEffect(() => setNotifications(getNotifications(tasks)), [tasks]);
    return <Header.NavDropMenu logo={title}>
        <div className="card">
            {notifications.length > 0 ? notifications.map((task, index) => <Notification
                onClose={() => dismissNotification(task)}
                key={index}
                title={<><strong>{task.name}</strong> [{task.date.hour}:{task.date.minute}]</>}
                text={task.detail}
            />) : <div className="card-header text-center">
                    <div>Sin recordatorios</div>
                </div>}
        </div>
    </Header.NavDropMenu>
}

TaskReminder.propTypes = {
    tasks: PropTypes.array.isRequired,
    todayTasks: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    dashboards: state.task.dashboards,
    tasks: state.task.tasks,
    todayTasks: state.task.todayTasks
})

export default connect(mapStateToProps, { processTask, getNotifications })(TaskReminder);
