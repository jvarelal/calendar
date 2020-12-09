import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Modal from '../../../commons/components/styled/Modal'
import Form from '../../../commons/components/styled/Form'
import { GROUP_DASHBOARD, DASHBOARD_PROP_SHAPE } from '../../../commons/util/const'
import { processGroup } from '../../actions/taskActions'
import { handleClose } from '../../../commons/actions/modalActions'
import { insertArrayWithId } from '../../../commons/util/func'

const DashBoardGroupForm = ({ title, dashboard, group = {}, handleClose, processGroup }) => {
    const [nGroup, setNGroup] = React.useState(group.id ? group : GROUP_DASHBOARD)
    const onChange = (target) => setNGroup({ ...nGroup, [target.name]: target.value })
    const onSubmit = e => {
        e.preventDefault();
        let groups = [...dashboard.groups]
        if (nGroup.id) {
            for (let i = 0; i < groups.length; i++) {
                if (groups[i].id === nGroup.id) {
                    groups[i] = nGroup
                }
            }
        } else {
            groups = insertArrayWithId(groups, nGroup)
        }
        processGroup({ ...dashboard, groups: groups })
    }
    return <Modal.DropContent title={title} handleClose={handleClose} left>
        <Form onSubmit={onSubmit}>
            <Modal.Body>
                <Form.Input name="name" required={true} label="Nombre"
                    value={nGroup.name} onChange={onChange} upperCase focus />
            </Modal.Body>
            <Modal.FormFooter handleClose={handleClose} />
        </Form>
    </Modal.DropContent>
}

DashBoardGroupForm.propTypes = {
    title: PropTypes.string.isRequired,
    dashboard: DASHBOARD_PROP_SHAPE.isRequired,
    group: PropTypes.object,
    handleClose: PropTypes.func.isRequired,
    processGroup: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    dashboards: state.task.dashboards
})

export default connect(
    mapStateToProps,
    { handleClose, processGroup }
)(DashBoardGroupForm)