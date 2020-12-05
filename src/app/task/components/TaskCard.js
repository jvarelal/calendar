import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TaskForm from './TaskForm'
import { evalueDate } from '../../commons/util/func'
import { TASK_PROP_SHAPE, PAST } from '../../commons/util/const'
import { deleteTaskById, updateTask } from '../actions/taskActions'
import { getModalContent, getModalConfirmation } from '../../commons/actions/modalActions'
import { DropCard } from './TaskElements'

const TaskCard = ({ expanded = false, task = {}, onDragStart, onDrop, getModalContent, getModalConfirmation, deleteTaskById, updateTask }) => {
    const titleOnDelete = `Eliminar nota`;
    const messageOnDelete = `¿Desea eliminar la nota ${task.name}?`;
    const confirmDelete = () => deleteTaskById([task])
    const doneUndone = () => updateTask({ ...task, done: !task.done })
    return <DropCard title={task.name}
        variant={task.color}
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
    </DropCard>
}

TaskCard.propTypes = {
    expanded: PropTypes.bool,
    task: TASK_PROP_SHAPE.isRequired,
    backgroundCards: PropTypes.string.isRequired,
    deleteTaskById: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    onDragStart: PropTypes.func,
    getModalContent: PropTypes.func.isRequired,
    getModalConfirmation: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    backgroundCards: state.user.preferences.backgroundCards
})

export default connect(
    mapStateToProps,
    { getModalContent, getModalConfirmation, deleteTaskById, updateTask }
)(TaskCard)
