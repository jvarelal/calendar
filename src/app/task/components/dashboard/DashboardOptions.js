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
    const msgOnDelete = `¿Desea eliminar el tablero ${dashboard.name}? Todas las notas serán eliminadas.`
    const msgOnExit = <div className="text-center">
        ¿Desea salir del tablero {dashboard.name}? <br /> Las notas que haya creado se conservarán pero ya no tendrá acceso a estas.
    </div>
    const confirmDelete = () => {
        deleteDashboard(dashboard)
        setIdxDashboard(0)
    }
    const confirmExit = () => {
        let excludeFromRoles = dashboard.roles.filter(u => u.email !== user.email)
        updateDashboard({ ...dashboard, roles: excludeFromRoles, members: excludeFromRoles.map(u => u.email) })
    }
    const userRol = (dashboard.roles.find(u => u.email === user.email) || { rol: ROLES.MEMBER }).rol
    let options = [
        {
            icon: `fas fa-${view.vertical ? 'columns' : 'tablet-alt'}`,
            text: `Distribución ${view.vertical ? 'Automática' : 'Vertical'}`,
            onClick: () => setView({ ...view, vertical: !view.vertical }),
            show: true
        },
        {
            icon: `fas fa-columns`,
            text: `Nuevo Grupo`,
            onClick: () => getModalContent(<DashBoardGroupForm title="+ Nuevo grupo" dashboard={dashboard} />),
            show: userRol !== ROLES.MEMBER
        },
        {
            icon: `fas fa-${userRol !== ROLES.MEMBER ? 'edit' : 'info'}`,
            text: userRol !== ROLES.MEMBER ? 'Editar tablero' : 'Infomación del tablero',
            onClick: () => getModalContent(<DashBoardForm title="+ Editar Tablero" dashboardSelected={dashboard} />),
            show: true
        },
        {
            icon: `fas fa-trash-alt`,
            text: 'Eiminar tablero',
            onClick: () => getModalConfirmation('Eliminar tablero', msgOnDelete, confirmDelete),
            show: dashboards.length > 1 && user.email === dashboard.author
        },
        {
            icon: `fas fa-sign-out-alt`,
            text: 'Salir del tablero',
            onClick: () => getModalConfirmation('Salir del tablero', msgOnExit, confirmExit),
            show: dashboards.length > 1 && user.email !== dashboard.author
        },
        {
            icon: `fas fa-clipboard`,
            text: 'Nuevo tablero',
            onClick: () => getModalContent(<DashBoardForm title="+ Nuevo Tablero" />),
            show: true
        },
        {
            icon: `fas fa-question-circle`,
            text: 'Ayuda',
            onClick: () => getModalContent(<DashBoardForm title="+ Nuevo Tablero" />),
            show: true
        }
    ]
    return <div className="row text-center">
        <div className="col flex-center">
            <div className="col">
                <Form.Select name="dashboard"
                    label={<><i className={`fas fa-${dashboard.members.length > 1 ? 'users' : 'user'} mlr-4`} />  Tablero</>}
                    value={idxDashboard}
                    options={dashboards.map((d, i) => ({ id: i, text: d.name }))}
                    onChange={target => setIdxDashboard(target.value)}
                    number inline />
            </div>
            <div className="col">
                <Form.Select name="statusTask"
                    label="Notas en vista" value={view.showTasks}
                    options={SELECT_STATUS_TASK}
                    onChange={target => setView({ ...view, showTasks: target.value })}
                    number inline />
            </div>
        </div>
        <div className="col col5 flex-center">
            <Form.DropdownMenu text={<><i className="fas fa-tools" /> Opciones</>}>
                {options.filter(o => o.show).map(option => <div className="select-option" onClick={option.onClick}>
                    <i className={option.icon} /> {option.text}
                </div>)}
            </Form.DropdownMenu>
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