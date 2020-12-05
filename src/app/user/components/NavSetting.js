import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Header from '../../commons/components/styled/Header'
import Form from '../../commons/components/styled/Form'
import { THEMES } from '../../commons/util/const'
import { setUserPreference, logout } from '../actions/userActions'

const NavSetting = ({ user, setUserPreference, logout }) => {
    const history = useHistory();
    const profileImg = !user.photo ? <i className="fas fa-user" /> :
        <img src={user.photo} alt="profile" className="profile" />
    return <Header.NavDropMenu logo={profileImg}>
        <div className="card">
            <div className="card-header text-center">
                <div>{user.displayName}</div>
                <div className="text-sm text-gray m-1">{user.email}</div>
            </div>
            <div className="card-body">
                <Form.Select name="theme" value={user.preferences.theme}
                    label="Fondos" onChange={setUserPreference}
                    size="3"
                    options={THEMES.map((theme, index) => ({ id: index, text: theme.NAME }))} 
                    number flash/>
                <Form.Select name="backgroundCards" value={user.preferences.backgroundCards}
                    label="Color de notas" onChange={setUserPreference}
                    options={BACKGROUND_NOTE} />
            </div>
            <div className="card-footer">
                <Header.NavLink onClick={() => logout({ cb: () => history.push('/login') })}>
                    <i className="fas fa-columns"></i> <span>Cerrar sesión</span>
                </Header.NavLink>
            </div>
        </div>
    </Header.NavDropMenu>
}

const BACKGROUND_NOTE = [{ id: 0, text: 'Solo borde' }, { id: 1, text: 'Fondo' }];

NavSetting.propTypes = {
    user: PropTypes.object.isRequired,
    setUserPreference: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { setUserPreference, logout })(NavSetting);