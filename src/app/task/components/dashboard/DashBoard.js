import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getModalContent } from '../../../commons/actions/modalActions'
import Form from '../../../commons/components/styled/Form'
import DashBoardGroup from './DashBoardGroup'
import DashBoardForm from './DashBoardForm'
import DashBoardGroupForm from './DashBoardGroupForm'
import { DASHBOARD } from '../../../commons/util/const'
import { sortByList, moveInArray, updateTasksInGroup } from '../../../commons/util/func'
import TaskCard from '../TaskCard'
import { updateTask, setIdxDashboard, updateDashboard } from '../../actions/taskActions'

const DashBoard = ({ dashboards, idxDashboard, setIdxDashboard, tasks, getModalContent, updateTask, updateDashboard }) => {
    const [dragging, setDragging] = React.useState({ group: false, task: false })
    const tasksNotDone = tasks.filter(task => !task.done &&
        task.dashboard.id === dashboards[idxDashboard].id)
    const dashboard = dashboards[idxDashboard] || DASHBOARD
    const dragElement = {
        group: { target: React.useRef(), value: React.useRef() },
        task: { target: React.useRef(), value: React.useRef() }
    }
    const onDragStart = (e, reference, element) => {
        dragElement[element].value.current = reference;
        dragElement[element].target.current = e.target;
        dragElement[element].target.current.addEventListener('dragend', () => onDragEnd(element))
        setDragging({ ...dragging, [element]: true })
    }
    const onDragEnd = (element) => {
        if (dragElement[element].target.current) {
            dragElement[element].target.current.removeEventListener('dragend', () => onDragEnd(element))
            dragElement[element].value.current = null;
            dragElement[element].target.current = null;
            setDragging({ ...dragging, [element]: false })
        }
    }
    const onDropGroup = (idxGroup) => {
        let groupIndex = dragElement['group'].value.current
        let task = dragElement['task'].value.current
        if (!task) {
            let newOrderGroup = moveInArray(dashboard.orderGroup, groupIndex, idxGroup)
            return updateDashboard({ ...dashboard, orderGroup: newOrderGroup })
        }
        return onDropTask(idxGroup, 0)
    }
    const onDropTask = (idxGroup, idxTask) => {
        let task = dragElement['task'].value.current
        let idGroup = dashboard.orderGroup[idxGroup]
        let nTask = { ...task, dashboard: { ...task.dashboard, idGroup: idGroup } }
        if (idGroup === task.dashboard.idGroup) {
            return updateTasksInGroup(dashboard, task, idxTask, updateDashboard)
        }
        nTask.cb = () => updateTasksInGroup(dashboard, task, idxTask, updateDashboard)
        return updateTask(nTask);
    }
    const newDashboard = () => getModalContent(<DashBoardForm title="+ Nuevo Tablero" />)
    const newGroup = () => getModalContent(<DashBoardGroupForm title="+ Nuevo grupo" dashboard={dashboard} />)
    return <div className="container">
        <div className="row text-center">
            <div className="col fm-group">
                <button className="btn btn-primary" onClick={newDashboard}>
                    <i className="fas fa-plus" /> Nuevo Tablero
                </button>
            </div>
            <div className="col">
                <Form.Select name="dashboard"
                    label="Tablero" value={idxDashboard}
                    options={dashboards.map((d, i) => ({ id: i, text: d.name }))}
                    onChange={target => setIdxDashboard(Number(target.value))}
                    number flash />
            </div>
            <div className="col fm-group">
                <button className="btn btn-primary" onClick={newGroup}>
                    <i className="fas fa-plus" /> Nuevo Grupo
                </button>
            </div>
        </div>
        <div className="row">
            {sortByList(dashboard.groups, dashboard.orderGroup).map((group, idxGroup) => <div
                key={group.id}
                className="col">
                <DashBoardGroup
                    dashboard={dashboard}
                    group={group}
                    onDragStart={e => onDragStart(e, idxGroup, 'group')}
                    onDrop={dragging ? e => onDropGroup(idxGroup) : null}>
                    {sortByList(tasksNotDone.filter(t => t.dashboard.idGroup === group.id),
                        group.tasks).map((task, idxTask) => <TaskCard
                            key={dashboards}
                            task={task}
                            expanded={true}
                            onDragStart={e => onDragStart(e, task, 'task')}
                            onDrop={dragging ? e => onDropTask(idxGroup, idxTask) : null} />)}
                </DashBoardGroup>
            </div>)}
        </div>
    </div>
}

DashBoard.propTypes = {
    dashboards: PropTypes.array.isRequired,
    tasks: PropTypes.array.isRequired,
    getModalContent: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    idxDashboard: PropTypes.number.isRequired,
    updateDashboard: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    dashboards: state.task.dashboards,
    idxDashboard: state.task.idxDashboard,
    tasks: state.task.tasks
})

export default connect(
    mapStateToProps,
    { getModalContent, updateTask, setIdxDashboard, updateDashboard }
)(DashBoard)