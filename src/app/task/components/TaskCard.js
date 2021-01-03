import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TaskForm from './TaskForm'
import { evalueDate } from '../../util/func'
import { TASK_PROP_SHAPE, PAST, ROLES } from '../../util/const'
import { deleteTask, processTask } from '../actions/taskActions'
import { getModalContent, getModalConfirmation } from '../../layout/actions/modalActions'

const TaskCard = ({ expanded = false, task = {}, user, dashboards, backgroundCards, onDragStart, onDrop, getModalContent, getModalConfirmation, deleteTask, processTask }) => {
    const [showDetail, setShowDetail] = React.useState(expanded)
    const titleOnDelete = `Eliminar nota`;
    const messageOnDelete = `¿Desea eliminar la nota ${task.name}?`;
    const dashboard = dashboards.find(d => d.id === task.dashboard.id)
    const confirmDelete = () => deleteTask(dashboard, task)
    const doneUndone = () => processTask(dashboard, { ...task, done: !task.done, user })
    const variant = task.color ? (backgroundCards === '1' ? task.color : 'outline-' + task.color) : ''
    const userRol = (dashboard.roles.find(u => u.email === user.email) || { rol: ROLES.MEMBER }).rol
    return <div className={'card card-note ' + variant} onDragStart={onDragStart}
        draggable={onDragStart ? true : false} onDrop={onDrop}>
        <div className="card-header">
            <div className="flex-center">
                <div className="col"><strong>{task.name}</strong></div>
                <div className="col text-right">
                    <button className="btn btn-sm" onClick={() => setShowDetail(!showDetail)}>
                        <i className={showDetail ? 'fas fa-chevron-circle-up' : 'fas fa-chevron-circle-down'} />
                    </button>
                </div>
            </div>
        </div>
        {showDetail ? <div className="card-expe">
            <div>
                <p>{task.detail}</p>
            </div>
            {userRol !== ROLES.MEMBER || user.id === task.author ? <div className="card-footer">
                <div className="row text-center">
                    <div className="col">
                        <button className="btn-sm"
                            title={task.done ? 'Nuevamente pendiente :(' : 'Hecho!'}
                            onClick={doneUndone}>
                            <i className={task.done ? 'fas fa-thumbtack' : 'fas fa-check-square'} />
                        </button>
                    </div>
                    {evalueDate(task.date) !== PAST || !task.done ? <>
                        <div className="col">
                            <button className="btn-sm"
                                onClick={() => getModalContent(<TaskForm taskSelected={task} />)}
                                title="Editar">
                                <i className="fas fa-edit" />
                            </button>
                        </div>
                        <div className="col">
                            <button className="btn-sm"
                                onClick={() => getModalConfirmation(titleOnDelete, messageOnDelete, confirmDelete)}
                                title="Eliminar">
                                <i className="fas fa-trash-alt" />
                            </button>
                        </div>
                    </> : null}
                </div>
            </div> : null}
        </div> : null}
    </div>
}

TaskCard.propTypes = {
    user: PropTypes.object,
    expanded: PropTypes.bool,
    task: TASK_PROP_SHAPE.isRequired,
    dashboards: PropTypes.array.isRequired,
    backgroundCards: PropTypes.string.isRequired,
    deleteTask: PropTypes.func.isRequired,
    processTask: PropTypes.func.isRequired,
    onDragStart: PropTypes.func,
    getModalContent: PropTypes.func.isRequired,
    getModalConfirmation: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    dashboards: state.task.dashboards,
    backgroundCards: state.user.preferences.backgroundCards,
    user: state.user
})

export default connect(
    mapStateToProps,
    { getModalContent, getModalConfirmation, deleteTask, processTask }
)(TaskCard)
