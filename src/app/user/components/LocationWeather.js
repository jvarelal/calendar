import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getLocation, getWeather } from '../actions/userActions'

const LocationWeather = ({location = {}, getLocation, getWeather }) => {
    const getWeatherByLocation = (userlocation = {}) => {
        getWeather({ latitude: userlocation.latitude, longitude: userlocation.longitude })
    }
    React.useEffect(() => getLocation(getWeatherByLocation), [])// eslint-disable-line react-hooks/exhaustive-deps
    return <div className="row text-sm m-5">
        {location.country_name ? <div className="col">
            <i className="fas fa-map-marker-alt" /> {location.country_name}, {location.city}
        </div> : null}
        <Weather weather={location.weather} />
    </div>
}

const Weather = ({ weather }) => {
    try {
        if (!weather.temp.value) {
            return null
        }
        const temp = Number(weather.temp.value)
        let thermometer = ''
        switch (true) {
            case temp < 5:
                thermometer = 'thermometer-empty'
                break;
            case temp < 15:
                thermometer = 'thermometer-quarter'
                break;
            case temp < 25:
                thermometer = 'thermometer-half'
                break;
            case temp < 35:
                thermometer = 'thermometer-three-quarters'
                break;
            case temp < 45:
                thermometer = 'thermometer-full'
                break;
            default:
                thermometer = 'thermometer-half'
                break;
        }
        return <div className="col">
            <i className={`fas fa-${thermometer}`} /> {weather.temp.value} °C
        </div>
    } catch (e) {
        return null
    }
}

LocationWeather.propTypes = {
    location: PropTypes.object.isRequired,
    getLocation: PropTypes.func.isRequired,
    getWeather: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ location: state.user.location })

export default connect(
    mapStateToProps,
    { getLocation, getWeather }
)(LocationWeather);