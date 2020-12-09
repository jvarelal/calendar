import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TaskForm from './TaskForm'
import { evalueDate } from '../../commons/util/func'
import { TASK_PROP_SHAPE, PAST } from '../../commons/util/const'
import { deleteTask, processTask } from '../actions/taskActions'
import { getModalContent, getModalConfirmation } from '../../commons/actions/modalActions'
import { DropCard } from './TaskElements'

const TaskCard = ({ expanded = false, task = {}, dashboards, backgroundCards, onDragStart, onDrop, getModalContent, getModalConfirmation, deleteTask, processTask }) => {
    const titleOnDelete = `Eliminar nota`;
    const messageOnDelete = `¿Desea eliminar la nota ${task.name}?`;
    const confirmDelete = () => deleteTask(dashboards, task)
    const doneUndone = () => processTask(dashboards, { ...task, done: !task.done })
    return <DropCard title={task.name}
        variant={task.color ? (backgroundCards === '1' ? task.color : 'outline-' + task.color) : ''}
        onDragStart={onDragStart}
        onDrop={onDrop}
        expanded={expanded}>
        <div>
            <p>{task.detail}</p>
            <div className="p-1 text-muted" style={{ fontSize: '.7rem' }}>
                Creación: {task.creation}
            </div>
        </div>
        <div className="card-footer">
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
        </div>
    </DropCard>
}

TaskCard.propTypes = {
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
    backgroundCards: state.user.preferences.backgroundCards
})

export default connect(
    mapStateToProps,
    { getModalContent, getModalConfirmation, deleteTask, processTask }
)(TaskCard)
