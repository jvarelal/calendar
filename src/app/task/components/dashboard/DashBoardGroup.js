import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DASHBOARD_PROP_SHAPE, ROLES } from '../../../util/const'
import TaskForm from '../TaskForm'
import DashBoardGroupForm from './DashBoardGroupForm'
import { deleteGroup } from '../../actions/taskActions'
import { getModalContent, getModalConfirmation } from '../../../layout/actions/modalActions'
import { onDragOver } from '../../../util/func'
import { UserContext } from '../../../user/components/UserContext'

const DashBoardGroup = ({ dashboard = {}, group = {}, children, getModalContent, available = true, onDragStart,
    onDrop, getModalConfirmation, deleteGroup, vertical }) => {
    const user = React.useContext(UserContext)
    const newTask = () => getModalContent(<TaskForm idGroup={group.id} />)
    const editGroup = () => getModalContent(<DashBoardGroupForm title="Editar grupo" dashboard={dashboard} group={group} />)
    const titleOnDelete = `Eliminar grupo`;
    const messageOnDelete = `¿Desea eliminar el grupo ${group.name}?`;
    const deleteCurrent = () => getModalConfirmation(titleOnDelete, messageOnDelete, () => deleteGroup(dashboard, group))
    const userRol = ((dashboard.roles || []).find(u => u.email === user.email) || { rol: ROLES.MEMBER }).rol
    return <div className="card-group glass"
        onDrop={onDrop}
        draggable={onDragStart ? true : false}
        onDragStart={onDragStart}
        onDragOver={onDragOver}>
        <div className="card-group-header">
            <div className="p-2">{group.name}</div>
            <div className="btn-group ml-auto">
                {available ? <button className="btn-sm" onClick={newTask}>
                    <i className="fas fa-plus"></i>
                </button> : null}
                {userRol !== ROLES.MEMBER ? <>
                    <button className="btn-sm" onClick={editGroup}>
                        <i className="fas fa-edit"></i>
                    </button>
                    {dashboard.groups.length > 1 && group.tasks.length === 0 ? <button className="btn-sm"
                        onClick={deleteCurrent} >
                        <i className="fas fa-trash"></i>
                    </button> : null}
                </> : null}
            </div>
        </div>
        <div className="card-group-body mtb-8">
            {children.length > 0 ? <div className={'card-group-child' + (vertical ? '' : ' row m-1')}>
                {children.map((child, index) => <div
                    className="col plr-2 card-group-child"
                    key={index}>
                    {child}
                </div>)}
            </div> :
                <div className="card-group-empty">
                    <h3 className="text-center m-1 card-group-child">Sin notas</h3>
                    <div className="empty-img card-group-child" />
                    {available ? <button className="btn btn-primary" onClick={newTask}>
                        <i className="fas fa-plus" /> Agregar nota
                    </button> : null}
                </div>}
        </div>
    </div>
}

DashBoardGroup.propTypes = {
    dashboard: DASHBOARD_PROP_SHAPE,
    group: PropTypes.object.isRequired,
    getModalContent: PropTypes.func.isRequired,
    getModalConfirmation: PropTypes.func.isRequired,
    deleteGroup: PropTypes.func.isRequired,
    onDrop: PropTypes.func
}

export default connect(null, { getModalContent, getModalConfirmation, deleteGroup })(DashBoardGroup)