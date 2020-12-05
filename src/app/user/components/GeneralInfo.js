import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DropCard } from '../../task/components/TaskElements'
import { getLocation, getWeather } from '../actions/userActions'
import { SYSDATE } from '../../commons/util/const'

const GeneralInfo = ({ location = {}, getLocation, getWeather }) => {
    const getWeatherByLocation = (userlocation = {}) => {
        console.log(userlocation)
        getWeather({ latitude: userlocation.latitude, longitude: userlocation.longitude })
    }
    React.useEffect(() => getLocation(getWeatherByLocation), [getLocation])
    const weather = location.weather || { temp: {} }
    return <DropCard title="Bienvenido" variant="light">
        <div>
            <div className="row">
                <div className="col">
                    <p>
                        <i className="material-icons inline-icon mr-1">place</i>
                        {location.country_name}, {location.city}
                    </p>
                    <p>
                        <i className="material-icons inline-icon mr-1">public</i>
                            latitud: {location.latitude}, longitud: {location.longitude}
                    </p>
                    <p>
                        <i className="material-icons inline-icon mr-1">flag</i>
                        {location.ip} ({location.type})
                    </p>
                </div>
                <div className="col">
                    <p>
                        <i className="material-icons inline-icon mr-1">today</i>
                        {SYSDATE.getDate()}/{SYSDATE.getMonth() + 1}/{SYSDATE.getFullYear()}
                    </p>
                    <p>
                        <i className="material-icons inline-icon mr-1">wb_sunny</i>
                        {weather.temp.value}
                    </p>

                </div>
            </div>
        </div>
    </DropCard>
}

GeneralInfo.propTypes = {
    location: PropTypes.object.isRequired,
    getLocation: PropTypes.func.isRequired,
    getWeather: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    location: state.user.location
})

export default connect(mapStateToProps, { getLocation, getWeather })(GeneralInfo);
