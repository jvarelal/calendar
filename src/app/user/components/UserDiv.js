import React from 'react'
import { ROLES } from '../../util/const'
import UserPng from '../../../assets/img/User-512.png'

const UserDiv = ({ user, changeUser }) => {
    const changeRol = () => {
        if (changeUser && user.rol !== ROLES.AUTOR) {
            user.rol = user.rol === ROLES.ADMIN ? ROLES.MEMBER : ROLES.ADMIN;
            changeUser(user)
        }
    }
    console.log(user)
    return <div className="flex-center  ptb-5 bb-gray">
        <div className="col col5">
            <img src={user.photoURL || UserPng} alt="profile" className="profile-min" />
        </div>
        <div className="col flex-center">
            <div>
                <span>{user.displayName}</span>
                <div className="text-sm text-gray mtb-2">{user.email}</div>
            </div>
        </div>
        <span className={`btn btn-sm ${changeUser ? '' : 'inactive'}`} onClick={changeRol}>
            {user.rol === ROLES.AUTOR ? 'Creador' : (user.rol === ROLES.ADMIN ? 'Admin' : 'Member')}
        </span>
    </div>
}

export default UserDiv