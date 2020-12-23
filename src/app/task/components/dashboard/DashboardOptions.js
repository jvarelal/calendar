import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Form from '../../../commons/components/Form'
import DashBoardForm from './DashBoardForm'
import { getModalContent, getModalConfirmation } from '../../../layout/actions/modalActions'
import DashBoardGroupForm from './DashBoardGroupForm'
import { DASHBOARD, SELECT_STATUS_TASK, ROLES } from '../../../util/const'
import { setIdxDashboard, updateDashboard, deleteDashboard } from '../../actions/taskActions'

const DashboardOptions = ({ user, dashboards, idxDashboard, setIdxDashboard, getModalContent, getModalConfirmation, deleteDashboard, updateDashboard, view, setView }) => {
    const dashboard = dashboards[idxDashboard] || DASHBOARD
    const newDashboard = () => getModalContent(<DashBoardForm title="+ Nuevo Tablero" />)
    const editDashboard = () => getModalContent(<DashBoardForm title="+ Editar Tablero" dashboardSelected={dashboard} />)
    const newGroup = () => getModalContent(<DashBoardGroupForm title="+ Nuevo grupo" dashboard={dashboard} />)
    const msgOnDelete = `¿Desea eliminar el tablero ${dashboard.name}? Todas las notas serán eliminadas.`
    const msgOnExit = <div className="text-center">
        ¿Desea salir del tablero {dashboard.name}? <br /> Las notas que haya creado se conservarán pero ya no tendrá acceso a estas.
    </div>
    const confirmDelete = () => deleteDashboard(dashboard)
    const confirmExit = () => {
        let excludeFromRoles = dashboard.roles.filter(u => u.email !== user.email)
        updateDashboard({ ...dashboard, roles: excludeFromRoles, members: excludeFromRoles.map(u => u.email) })
    }
    const userRol = (dashboard.roles.find(u => u.email === user.email) || { rol: ROLES.MEMBER }).rol
    return <div className="row text-center">
        <div className="col">
            <Form.Select name="dashboard"
                label="Tablero" value={idxDashboard}
                options={dashboards.map((d, i) => ({ id: i, text: d.name }))}
                onChange={target => setIdxDashboard(target.value)}
                number />
        </div>
        <div className="col">
            <Form.Select name="statusTask"
                label="Notas en vista" value={view.showTasks}
                options={SELECT_STATUS_TASK}
                onChange={target => setView({ ...view, showTasks: target.value })}
                number />
        </div>
        <div className="col col8">
            <Form.DropdownMenu text={<><i className="fas fa-tools" /> Opciones</>}>
                {userRol !== ROLES.MEMBER ? <div className="select-option" onClick={newGroup}>
                    <i className="fas fa-columns" /> Nuevo Grupo
                </div> : null}
                <div className="select-option" onClick={editDashboard}>
                    <i className="fas fa-edit" /> {userRol !== ROLES.MEMBER ? 'Editar tablero' : 'Infomación del tablero'}
                </div>
                {dashboards.length > 1 ? (user.email === dashboard.author ? <div className="select-option"
                    onClick={() => getModalConfirmation('Eliminar tablero', msgOnDelete, confirmDelete)}>
                    <i className="fas fa-trash-alt" /> Eiminar tablero
                </div> :
                    <div className="select-option"
                        onClick={() => getModalConfirmation('Salir del tablero', msgOnExit, confirmExit)}>
                        <i className="fas fa-sign-out-alt" /> Salir del tablero
                </div>) : null}
                <div className="select-option" onClick={newDashboard}>
                    <i className="fas fa-clipboard" /> Nuevo tablero
                </div>
            </Form.DropdownMenu>
        </div>
        <div className="col col8 responsive-hide">
            <Form.Group>
                <button className="btn btn-primary" onClick={() => setView({ ...view, vertical: !view.vertical })}>
                    <i className={`fas fa-${view.vertical ? 'columns' : 'tablet-alt'}`} />
                </button>
            </Form.Group>
        </div>
    </div >
}

DashboardOptions.propTypes = {
    user: PropTypes.object.isRequired,
    dashboards: PropTypes.array.isRequired,
    getModalContent: PropTypes.func.isRequired,
    getModalConfirmation: PropTypes.func.isRequired,
    deleteDashboard: PropTypes.func.isRequired,
    updateDashboard: PropTypes.func.isRequired,
    idxDashboard: PropTypes.number.isRequired
}

const mapToStateProp = state => ({
    dashboards: state.task.dashboards,
    idxDashboard: state.task.idxDashboard,
    user: state.user
})

export default connect(mapToStateProp,
    { getModalContent, getModalConfirmation, setIdxDashboard, deleteDashboard, updateDashboard }
)(DashboardOptions)