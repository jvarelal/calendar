import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DASHBOARD_PROP_SHAPE } from '../../../commons/util/const'
import TaskForm from '../TaskForm'
import DashBoardGroupForm from './DashBoardGroupForm'
import { deleteGroup } from '../../actions/taskActions'
import { getModalContent, getModalConfirmation } from '../../../commons/actions/modalActions'
import { onDragOver } from '../../../commons/util/func'

const DashBoardGroup = ({ dashboard, group, children, getModalContent, onDragStart, onDrop, getModalConfirmation, deleteGroup, vertical }) => {
    const newTask = () => getModalContent(<TaskForm idDashboard={dashboard.id} idGroup={group.id} />)
    const editGroup = () => getModalContent(<DashBoardGroupForm title="Editar grupo" dashboard={dashboard} group={group} />)
    const titleOnDelete = `Eliminar grupo`;
    const messageOnDelete = `¿Desea eliminar el grupo ${group.name}?`;
    const deleteCurrent = () => getModalConfirmation(titleOnDelete, messageOnDelete, () => deleteGroup(dashboard, group))
    const thereAreNotes = group.tasks.length > 0
    const uniqueGroup = dashboard.groups.length === 1
    return <div className="card-group mtb-2"
        onDrop={onDrop}
        draggable={onDragStart ? true : false}
        onDragStart={onDragStart}
        onDragOver={onDragOver}>
        <div className="card-group-header">
            <div className="p-2">{group.name}</div>
            <div className="btn-group ml-auto">
                <button className="btn-sm" onClick={editGroup}>
                    <i className="fas fa-edit"></i>
                </button>
                <button className="btn-sm" onClick={newTask}>
                    <i className="fas fa-plus"></i>
                </button>
                {!thereAreNotes && !uniqueGroup ? <button className="btn-sm"
                    onClick={deleteCurrent} >
                    <i className="fas fa-trash"></i>
                </button> : null}
            </div>
        </div>
        <div className="card-group-body">
            {thereAreNotes ? <div className={'card-group-child' + (vertical ? '' : ' row m-1')}>
                {children.map((child, index) => <div
                    className="col plr-2 card-group-child"
                    key={index}>
                    {child}
                </div>)}
            </div> :
                <div className="card-group-empty">
                    <i className="far fa-sticky-note card-group-child" style={{ fontSize: '4rem' }} /> <br /><br />
                    No se ha agregado ninguna nota
                </div>}
        </div>
    </div>
}


DashBoardGroup.propTypes = {
    dashboard: DASHBOARD_PROP_SHAPE.isRequired,
    group: PropTypes.object.isRequired,
    getModalContent: PropTypes.func.isRequired,
    getModalConfirmation: PropTypes.func.isRequired,
    deleteGroup: PropTypes.func.isRequired,
    onDrop: PropTypes.func
}

export default connect(
    null,
    { getModalContent, getModalConfirmation, deleteGroup }
)(DashBoardGroup)