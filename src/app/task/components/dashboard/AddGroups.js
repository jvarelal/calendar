import React from 'react'
import PropTypes from 'prop-types'
import Form from '../../../commons/components/Form'
import { GROUP_DASHBOARD } from '../../../util/const'
import { insertArrayWithId } from '../../../util/func'

const AddGroups = ({ groups, setGroups, setAlert }) => {
    const [group, setGroup] = React.useState('')
    const addGroup = () => {
        if (group && group.trim() !== '') {
            setGroups(insertArrayWithId(groups, { ...GROUP_DASHBOARD, name: group }))
            setGroup('')
        } else {
            setAlert('Escriba un nombre al grupo a agregar')
        }
    }
    const deleteGroup = index => {
        let alterGroup = [...groups]
        alterGroup.splice(index, 1)
        setGroups(alterGroup)
    }
    return <div>
        <Form.InputButton name="group" label="Nuevo Grupo"
            value={group} onChange={target => setGroup(target.value)}
            textButton={<i className="fas fa-plus" />}
            onButtonClick={addGroup} upperCase />
        <span className="overlabel">Grupos</span>
        <div className="bb-gray">
            {groups.length > 0 ?
                groups.map((group, index) => <div className="flex-center bb-gray" key={index} >
                    <div className="col ptb-7">{group.name}</div>
                    <div className="col col4 text-right">
                        <span className="btn btn-sm p-2" onClick={() => deleteGroup(index)}>
                            <i className="fas fa-trash-alt" />
                        </span>
                    </div>
                </div>) : <div>
                    <div className="empty-img-min" />
                    <p className="text-center text-muted m-2">Sin grupos agregados</p>
                </div>}
        </div>
    </div>
}

AddGroups.propTypes = {
    groups: PropTypes.array.isRequired,
    setGroups: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
}

export default AddGroups