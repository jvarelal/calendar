import React from 'react'
import PropTypes from 'prop-types'
import Form from '../../commons/components/Form'
import UserDiv from './UserDiv'
import { RGX, ROLES } from '../../util/const'
import { validateEmail } from '../../util/func'
import userService from '../../service/userService'

const AdminUsers = ({ userInSession, onChangeUsers = () => null, initialList = [], editable = true }) => {
    const [users, setUsers] = React.useState(initialList.map(user => {
        if (user.email === userInSession.email) {
            return { ...userInSession, rol: user.rol }
        }
        return { email: user.email, rol: user.rol, pending: true }
    }))
    const updateUsers = alterUsers => {
        setUsers(alterUsers)
        onChangeUsers(alterUsers.map(u => ({ email: u.email, rol: u.rol })))
    }
    const deleteUser = index => {
        let alterUsers = [...users]
        alterUsers.splice(index, 1)
        updateUsers(alterUsers)
    }
    const changeUser = (user, index) => {
        let alterUsers = [...users]
        alterUsers[index] = user
        updateUsers(alterUsers)
    }
    React.useEffect(() => {
        if (initialList.length > 0) {
            let pushUser = (user, resp) => {
                let userResp = resp.status === 200 ? resp.data : { email: user.email, name: 'Miembro' }
                userResp.rol = user.rol
                let updatedUsers = users.map(prevUser => {
                    if (prevUser.email === userResp.email) return userResp
                    return prevUser
                })
                setUsers(updatedUsers)
            }
            let searchUser = user => userService.searchUser({ email: user.email, type: 'email' },
                resp => pushUser(user, resp),
                resp => pushUser(user, resp))
            initialList.forEach(user => {
                if (user.email !== userInSession.email) searchUser(user)
            })
        }
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    return <div className="col">
        {editable ? <AddUser users={users} updateUsers={updateUsers} /> : null}
        <div>
            {users.length > 0 ? users.map((user, index) => user.pending ? <div key={index} className="loading-min mtb-9" /> :
                <div className="flex-center bb-gray" key={index}>
                    <UserDiv user={user} changeUser={editable ? changeUser : null} />
                    {editable && user.email !== userInSession.email ? <span
                        className="btn btn-sm p-2"
                        onClick={() => deleteUser(index)}>
                        X
                    </span> : null}
                </div>) : null}
        </div>
    </div>
}

const AddUser = ({ users, updateUsers }) => {
    const [email, setEmail] = React.useState('')
    const [alert, setAlert] = React.useState('')
    const [pending, setPending] = React.useState(false)
    React.useEffect(() => {
        if (pending) {
            let cb = resp => {
                if (resp.status === 200) {
                    let updatedUsers = [...users, { ...resp.data, rol: ROLES.MEMBER }]
                    setEmail('')
                    updateUsers(updatedUsers)
                } else {
                    setAlert(`No se encontro usuario ${email}`)
                }
                setPending(false)
            }
            if (users.find(u => u.email === email.toLowerCase())) {
                setAlert('¡El usuario ya esta agregado!')
                setPending(false)
            } else {
                let searchUser = () => userService.searchUser({ email: email.toLowerCase(), type: 'email' }, cb, cb)
                searchUser()
            }
        }
    }, [pending]) // eslint-disable-line react-hooks/exhaustive-deps
    React.useEffect(() => { if (alert) setAlert('') }, [email]) // eslint-disable-line react-hooks/exhaustive-deps
    return <>
        <Form.InputButton name="email" label="Agregar correo"
            value={email} onChange={target => setEmail(target.value)} rgx={RGX.EMAIL}
            textButton={pending ? <div className="loading-min" /> :
                <><i className="fas fa-plus" /> <i className="fas fa-user" /></>}
            blockButton={pending || validateEmail(email).error}
            onButtonClick={() => setPending(true)} />
        {alert ? <p className="text-alert">{alert}</p> : null}
    </>
}

AdminUsers.propTypes = {
    userInSession: PropTypes.object.isRequired,
    initialList: PropTypes.array.isRequired,
    onChangeUsers: PropTypes.func.isRequired,
    editable: PropTypes.bool.isRequired
}

export default AdminUsers