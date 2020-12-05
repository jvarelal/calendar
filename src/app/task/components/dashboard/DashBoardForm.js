import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Modal from '../../../commons/components/styled/Modal'
import Form from '../../../commons/components/styled/Form'
import { handleClose } from '../../../commons/actions/modalActions'
import { createDashboard, updateDashboard, setIdxDashboard } from '../../actions/taskActions'
import { DASHBOARD, DASHBOARD_PROP_SHAPE, GROUP_DASHBOARD } from '../../../commons/util/const'
import { insertArrayWithId } from '../../../commons/util/func'

const DashBoardForm = ({ title, userId, dashboardSelected, dashboards, handleClose, createDashboard, updateDashboard, setIdxDashboard }) => {
    const [dashboard, setDashBoard] = React.useState(dashboardSelected || { ...DASHBOARD })
    const [group, setGroup] = React.useState('')
    const [alert, setAlert] = React.useState(null)
    const onChange = (target) => setDashBoard({ ...dashboard, [target.name]: target.value })
    const addGroup = () => {
        if (group && group.trim() !== '') {
            let updatedGroup = insertArrayWithId(dashboard.groups, { ...GROUP_DASHBOARD, name: group })
            setDashBoard({ ...dashboard, groups: updatedGroup })
            setGroup('')
        } else {
            setAlert('Escriba un nombre al grupo a agregar')
        }
    }
    const deleteGroup = (index) => {
        let alterGroup = [...dashboard.groups]
        alterGroup.splice(index, 1)
        setDashBoard({ ...dashboard, groups: alterGroup })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        let nDashboard = { ...dashboard, userId: userId, orderGroup: dashboard.groups.map(g => g.id) }
        if (nDashboard.groups.length > 0) {
            return nDashboard.id ? updateDashboard(nDashboard) :
                createDashboard({ ...nDashboard, cb: () => setIdxDashboard(dashboards.length) });
        }
        return setAlert('Agregue al menos un grupo al nuevo tablero')
    }
    return <Modal.DropContent title={title} handleClose={handleClose} >
        <Form onSubmit={onSubmit} error={alert}>
            <Modal.Body>
                <Form.Input name="name" required={true} label="Nombre"
                    value={dashboard.name} onChange={onChange} upperCase />
                <Form.TextArea name="detail" value={dashboard.detail} label="Descripción"
                    rows="2" onChange={onChange} />
                <Form.InputButton name="group" label="Nuevo Grupo"
                    value={group} onChange={target => setGroup(target.value)}
                    onButtonClick={addGroup} upperCase />
                <div style={{ border: '1px solid #ccc' }}>
                    {dashboard.groups.length > 0 ?
                        dashboard.groups.map((group, index) => <div className="flex-center" key={index}
                            style={{ borderBottom: '1px solid #aaa' }}>
                            <div className="col ptb-7">{group.name}</div>
                            <div className="col col4 text-right">
                                <span className="btn btn-sm p-2" onClick={() => deleteGroup(index)}>
                                    <i className="fas fa-trash-alt" />
                                </span>
                            </div>
                        </div>) : <h4 className="text-center text-muted m-8">Sin grupos agregados</h4>}
                </div>
            </Modal.Body>
            <Modal.FormFooter handleClose={handleClose} />
        </Form>
    </Modal.DropContent>
}

DashBoardForm.propTypes = {
    title: PropTypes.string.isRequired,
    userId: PropTypes.string,
    dashboardSelected: DASHBOARD_PROP_SHAPE,
    dashboards: PropTypes.array.isRequired,
    handleClose: PropTypes.func.isRequired,
    createDashboard: PropTypes.func.isRequired,
    updateDashboard: PropTypes.func.isRequired,
    setIdxDashboard: PropTypes.func.isRequired
}

const mapToStateProp = state => ({
    dashboards: state.task.dashboards,
    userId: state.user.id
})

export default connect(mapToStateProp, { handleClose, createDashboard, updateDashboard, setIdxDashboard })(DashBoardForm)