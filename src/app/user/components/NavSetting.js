import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Header from '../../commons/components/Header'
import Form from '../../commons/components/Form'
import LocationWeather from './LocationWeather'
import { THEMES } from '../../commons/util/const'
import { setUserPreference, logout } from '../actions/userActions'
import { resetDashboard } from '../../task/actions/taskActions'

const NavSetting = ({ user, setUserPreference, logout, resetDashboard }) => {
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
                <LocationWeather />
                <Form.FmGroup label="Fondos" active>
                    <div className="square-group text-center ptb-7" id="theme">
                        {THEMES.map((THEME, index) => <div key={index}
                            title={THEME.NAME} className={`small-square ${THEME.NAME}`}
                            onClick={() => setUserPreference({ name: 'theme', value: index })} />)}
                    </div>
                </Form.FmGroup>
                <Form.Select name="backgroundCards" value={user.preferences.backgroundCards}
                    label="Color de notas" onChange={setUserPreference}
                    options={BACKGROUND_NOTE} />
            </div>
            <div className="card-footer">
                <Header.NavLink onClick={() => logout({
                    cb: () => {
                        resetDashboard();
                        history.push('/login')
                    }
                })}>
                    <i className="fas fa-sign-out-alt" /> <span>Cerrar sesión</span>
                </Header.NavLink>
            </div>
        </div>
    </Header.NavDropMenu>
}

const BACKGROUND_NOTE = [{ id: 0, text: 'Light' }, { id: 1, text: 'Bold' }];

NavSetting.propTypes = {
    user: PropTypes.object.isRequired,
    setUserPreference: PropTypes.func.isRequired,
    resetDashboard: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ user: state.user })

export default connect(
    mapStateToProps,
    { setUserPreference, logout, resetDashboard }
)(NavSetting);