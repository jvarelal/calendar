import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, Container, Row, Col } from 'react-bootstrap'
import { DropCard } from './AppElements'
import { getLocation, getWeather } from '../actions/infoUserActions'
import { SYSDATE } from '../../calendar/util/utilConts'

const GeneralInfo = ({ location = {}, getLocation, getWeather }) => {
    const getWeatherByLocation = (userlocation = {}) => {
        console.log(userlocation)
        getWeather({ latitude: userlocation.latitude, longitude: userlocation.longitude })
    }
    React.useEffect(() => getLocation(getWeatherByLocation), [getLocation])
    const weather = location.weather || { temp: {} }
    return <DropCard title="Bienvenido" variant="light">
        <Card.Body className="pb-0">
            <Row>
                <Col>
                    <Container>
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
                    </Container>
                </Col>
                <Col>
                    <p>
                        <i className="material-icons inline-icon mr-1">today</i> 
                        {SYSDATE.getDate()}/{SYSDATE.getMonth() + 1}/{SYSDATE.getFullYear()}
                    </p>
                    <p>
                        <i className="material-icons inline-icon mr-1">wb_sunny</i> 
                        {weather.temp.value}
                    </p>

                </Col>
            </Row>
        </Card.Body>
        <Card.Footer></Card.Footer>
    </DropCard>
}

GeneralInfo.propTypes = {
    location: PropTypes.object.isRequired,
    getLocation: PropTypes.func.isRequired,
    getWeather: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    location: state.infoUser.location
})

export default connect(mapStateToProps, { getLocation, getWeather })(GeneralInfo);
