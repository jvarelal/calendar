import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Header from '../../commons/components/styled/Header'
import Form from '../../commons/components/styled/Form'
import { THEMES } from '../../commons/util/const'
import { getLocation, getWeather } from '../actions/userActions'
import { setUserPreference, logout } from '../actions/userActions'

const NavSetting = ({ user, location = {}, getLocation, getWeather, setUserPreference, logout }) => {
    const getWeatherByLocation = (userlocation = {}) => {
        getWeather({ latitude: userlocation.latitude, longitude: userlocation.longitude })
    }
    React.useEffect(() => getLocation(getWeatherByLocation), [getLocation])
    const weather = location.weather || { temp: {} }
    const history = useHistory();
    const profileImg = !user.photo ? <i className="fas fa-user" /> :
        <img src={user.photo} alt="profile" className="profile" />
    return <Header.NavDropMenu logo={profileImg}>
        <div className="card">
            <div className="card-header text-center">
                <div>{user.displayName}</div>
                <div className="text-sm text-gray m-1">{user.email}</div>
                <div className="row text-sm m-5">
                    <div className="col">{location.country_name}, {location.city}</div>
                    <div className="col">{weather.temp.value} °C</div>
                </div>
            </div>
            <div className="card-body">
                <Form.FmGroup label="Fondos" active>
                    <div className="square-group text-center ptb-7" id="theme">
                        {THEMES.map((THEME, index) => <div key={index}
                            title={THEME.NAME}
                            className={`small-square ${THEME.NAME}`}
                            onClick={e => setUserPreference({ name: 'theme', value: index })}
                        />)}
                    </div>
                </Form.FmGroup>
                <Form.Select name="backgroundCards" value={user.preferences.backgroundCards}
                    label="Color de notas" onChange={setUserPreference}
                    options={BACKGROUND_NOTE} flash />
            </div>
            <div className="card-footer">
                <Header.NavLink onClick={() => logout({ cb: () => history.push('/login') })}>
                    <i className="fas fa-columns"></i> <span>Cerrar sesión</span>
                </Header.NavLink>
            </div>
        </div>
    </Header.NavDropMenu>
}

const BACKGROUND_NOTE = [{ id: 0, text: 'Light' }, { id: 1, text: 'Boldo' }];

NavSetting.propTypes = {
    user: PropTypes.object.isRequired,
    setUserPreference: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    getLocation: PropTypes.func.isRequired,
    getWeather: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    location: state.user.location
})

export default connect(
    mapStateToProps,
    { setUserPreference, getLocation, getWeather, logout }
)(NavSetting);