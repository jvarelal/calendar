import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getModalContent } from '../../../layout/actions/modalActions'
import Form from '../../../commons/components/Form'
import DashBoardGroup from './DashBoardGroup'
import DashBoardForm from './DashBoardForm'
import DashBoardGroupForm from './DashBoardGroupForm'
import { DASHBOARD, SELECT_STATUS_TASK, STATUS_TASK } from '../../../commons/util/const'
import { moveInArray } from '../../../commons/util/func'
import { filterTasks } from '../../util/funcCalendar'
import TaskCard from '../TaskCard'
import { setIdxDashboard, processGroup, updateTaskPosition } from '../../actions/taskActions'

const DashBoard = ({ dashboards, idxDashboard, setIdxDashboard, getModalContent, processGroup, updateTaskPosition }) => {
    const [dragging, setDragging] = React.useState({ group: false, task: false })
    const [showTasks, setShowTasks] = React.useState(STATUS_TASK.PENDING)
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
    const newDashboard = () => getModalContent(<DashBoardForm title="+ Nuevo Tablero" />)
    const editDashboard = () => getModalContent(<DashBoardForm title="+ Editar Tablero" dashboardSelected={dashboard} />)
    const newGroup = () => getModalContent(<DashBoardGroupForm title="+ Nuevo grupo" dashboard={dashboard} />)
    return <div className="container">
        <div className="row text-center">
            <div className="col">
                <Form.Select name="dashboard"
                    label="Tablero" value={idxDashboard}
                    options={dashboards.map((d, i) => ({ id: i, text: d.name }))}
                    onChange={target => setIdxDashboard(target.value)}
                    number />
            </div>
            <div className="col col2 fm-group">
                <div className="btn-group">
                    <button className="btn btn-primary" onClick={editDashboard} title="Editar Tablero">
                        <i className="fas fa-tools" />
                    </button>
                    <button className="btn btn-primary" onClick={newDashboard} title="Nuevo Tablero">
                        <i className="fas fa-plus" /> <i className="fas fa-clipboard" />
                    </button>
                    <button className="btn btn-primary" onClick={newGroup} title="Nuevo Grupo">
                        <i className="fas fa-plus" /> <i className="fas fa-columns" />
                    </button>
                </div>
            </div>
            <div className="col">
                <Form.Select name="statusTask"
                    label="Notas en vista" value={showTasks}
                    options={SELECT_STATUS_TASK}
                    onChange={target => setShowTasks(target.value)}
                    number />
            </div>
        </div>
        <div className={dashboard.vertical ? 'container-scrollx' : ''}>
            <div className="row" style={dashboard.vertical ? { minWidth: `${dashboard.groups.length * 375}px` } : {}}>
                {dashboard.groups.map((group, idxGroup) => <div
                    key={group.id}
                    className="col">
                    <DashBoardGroup
                        vertical={dashboard.vertical}
                        dashboard={dashboard}
                        group={group}
                        onDragStart={e => onDragStart(e, idxGroup, 'group')}
                        onDrop={dragging ? e => onDropGroup(e, idxGroup) : null}>
                        {filterTasks(group, showTasks).map((task, idxTask) => {
                            let ntask = { ...task, dashboard: { id: dashboard.id, idGroup: group.id } }
                            return <TaskCard
                                key={idxTask}
                                task={ntask}
                                expanded={true}
                                onDragStart={e => onDragStart(e, ntask, 'task')}
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
    getModalContent: PropTypes.func.isRequired,
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
    { getModalContent, updateTaskPosition, setIdxDashboard, processGroup }
)(DashBoard)