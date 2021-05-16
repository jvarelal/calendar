import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Modal from '../../../commons/components/Modal'
import Form from '../../../commons/components/Form'
import { createDashboard, updateDashboard, setIdxDashboard } from '../../actions/taskActions'
import { DASHBOARD, ROLES, DASHBOARD_PROP_SHAPE } from '../../../util/const'
import AddGroups from './AddGroups'
import AdminUsers from '../../../user/components/AdminUsers'
import { UserContext } from '../../../user/components/UserContext'

const DashBoardForm = ({ title, dashboardSelected, dashboards, createDashboard, updateDashboard, setIdxDashboard }) => {
    const user = React.useContext(UserContext)
    const [dashboard, setDashBoard] = React.useState(dashboardSelected || { ...DASHBOARD, roles: [{ email: user.email, rol: ROLES.AUTOR }] })
    const [alert, setAlert] = React.useState(null)
    const setGroups = groups => setDashBoard({ ...dashboard, groups: groups })
    const onChange = target => setDashBoard({ ...dashboard, [target.name]: target.value })
    const onChangeUsers = roles => setDashBoard({ ...dashboard, roles: roles })
    const userRol = (dashboard.roles.find(u => u.email === user.email) || { rol: ROLES.MEMBER }).rol
    const editable = !dashboard.id || dashboard.author === user.email || userRol !== ROLES.MEMBER
    const onSubmit = () => {
        dashboard.idToken = user.idToken
        if (dashboard.id)
            return updateDashboard(dashboard)
        if (dashboard.groups.length === 0)
            return setAlert('Agregue al menos un grupo al nuevo tablero')
        return createDashboard({ ...dashboard, cb: () => setIdxDashboard(dashboards.length)});
    }
    return <Modal.DropContent title={title} lg left>
        <Form onSubmit={onSubmit} outsideError={alert}>
            <Modal.Body>
                <div className="row">
                    <div className={`col br-gray`}>
                        <Form.Input name="name" required={true}
                            label="Nombre"
                            minLength="3"
                            value={dashboard.name} onChange={onChange}
                            disabled={!editable}
                            upperCase focus />
                        <Form.Input type="textarea" name="detail"
                            value={dashboard.detail}
                            disabled={!editable}
                            label="Descripción" rows="2" onChange={onChange} />
                        {!dashboard.id ? <AddGroups
                            groups={dashboard.groups}
                            setGroups={setGroups}
                            setAlert={setAlert} /> : null}
                    </div>
                    <AdminUsers editable={editable}
                        userInSession={user}
                        initialList={dashboard.roles}
                        onChangeUsers={onChangeUsers} />
                </div>
            </Modal.Body>
            {editable ? <Modal.FormFooter /> : null}
        </Form>
    </Modal.DropContent>
}

DashBoardForm.propTypes = {
    title: PropTypes.string.isRequired,
    dashboardSelected: DASHBOARD_PROP_SHAPE,
    dashboards: PropTypes.array.isRequired,
    createDashboard: PropTypes.func.isRequired,
    updateDashboard: PropTypes.func.isRequired,
    setIdxDashboard: PropTypes.func.isRequired
}

const mapToStateProp = state => ({
    dashboards: state.task.dashboards,
    user: state.user
})

export default connect(mapToStateProp, { createDashboard, updateDashboard, setIdxDashboard })(DashBoardForm)