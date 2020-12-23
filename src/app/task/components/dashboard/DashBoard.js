import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DashBoardGroup from './DashBoardGroup'
import { DASHBOARD, STATUS_TASK } from '../../../util/const'
import { moveInArray, expandTask } from '../../../util/func'
import { filterTasks } from '../../../util/funcCalendar'
import TaskCard from '../TaskCard'
import { processGroup, updateTaskPosition } from '../../actions/taskActions'
import DashboardOptions from './DashboardOptions'

const DashBoard = ({ dashboards, idxDashboard, processGroup, updateTaskPosition }) => {
    const [dragging, setDragging] = React.useState({ group: false, task: false })
    const [view, setView] = React.useState({ showTasks: STATUS_TASK.PENDING, vertical: false })
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
    const onDropGroup = (e, idxGroup) => {
        let targetClass = e.target.className
        let groupIndex = dragElement['group'].value.current
        let task = dragElement['task'].value.current
        if (!task) {
            return processGroup({ ...dashboard, groups: moveInArray(dashboard.groups, groupIndex, idxGroup) })
        }
        if (targetClass.indexOf('card-group') >= 0)
            return onDropTask(idxGroup, 0)
    }
    const onDropTask = (idxGroup, idxTask) => {
        let task = dragElement['task'].value.current
        if (task) {
            let idGroup = dashboard.groups[idxGroup].id
            return updateTaskPosition(dashboard, idGroup, idxTask, task);
        }
    }
    return <div className="container">
        <DashboardOptions setView={setView} view={view} />
        <div className={view.vertical ? 'container-scrollx' : ''}>
            <div className="row" style={view.vertical ? { minWidth: `${dashboard.groups.length * 375}px` } : {}}>
                {dashboard.groups.map((group, idxGroup) => <div key={group.id} className="col">
                    <DashBoardGroup vertical={view.vertical} dashboard={dashboard} group={group}
                        onDragStart={e => onDragStart(e, idxGroup, 'group')}
                        onDrop={dragging ? e => onDropGroup(e, idxGroup) : null}>
                        {filterTasks(group, view.showTasks).map((task, idxTask) => {
                            let ntask = {
                                ...expandTask(task),
                                dashboard: { id: dashboard.id, idGroup: group.id }
                            }
                            return <TaskCard key={idxTask} task={ntask} expanded={true}
                                onDragStart={e => onDragStart(e, { ...task, idGroup: group.id }, 'task')}
                                onDrop={dragging ? e => onDropTask(idxGroup, idxTask) : null} />
                        })}
                    </DashBoardGroup>
                </div>)}
            </div>
        </div>
    </div>
}

DashBoard.propTypes = {
    dashboards: PropTypes.array.isRequired,
    updateTaskPosition: PropTypes.func.isRequired,
    idxDashboard: PropTypes.number.isRequired,
    processGroup: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    dashboards: state.task.dashboards,
    idxDashboard: state.task.idxDashboard
})

export default connect(
    mapStateToProps,
    { updateTaskPosition, processGroup }
)(DashBoard)