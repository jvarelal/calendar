import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DASHBOARD_PROP_SHAPE } from '../../../commons/util/const'
import TaskForm from '../TaskForm'
import DashBoardGroupForm from './DashBoardGroupForm'
import { getModalContent } from '../../../commons/actions/modalActions'
import { onDragOver } from '../../../commons/util/func'

const DashBoardGroup = ({ dashboard, group, children, getModalContent, onDragStart, onDrop }) => {
    const newTask = () => getModalContent(<TaskForm idDashboard={dashboard.id} idGroup={group.id} />)
    const editGroup = () => getModalContent(<DashBoardGroupForm
        title="Editar grupo"
        dashboard={dashboard}
        group={group} />)
    const thereAreNotes = children.length > 0
    return <div className="card-group"
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
                <button className="btn-sm">
                    <i className="fas fa-plus" onClick={newTask}></i>
                </button>
                {!thereAreNotes ? <button className="btn-sm" >
                    <i className="fas fa-trash"></i>
                </button> : null}
            </div>
        </div>
        <div className="card-group-body">
            {thereAreNotes ? <div className="row">{children.map((child, index) => <div
                className="col"
                key={index}>
                {child}
            </div>)}
            </div> :
                <div className="text-center w100 ptb-9">
                    <i className="far fa-sticky-note" style={{ fontSize: '4rem' }} /> <br /><br />
                    No se ha agregado ninguna nota
                </div>}
        </div>
    </div>
}


DashBoardGroup.propTypes = {
    dashboard: DASHBOARD_PROP_SHAPE.isRequired,
    group: PropTypes.object.isRequired,
    getModalContent: PropTypes.func.isRequired,
    onDrop: PropTypes.func
}

export default connect(
    null,
    { getModalContent }
)(DashBoardGroup)