import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Container, Col, Row, Form, Button, Nav, Alert } from 'react-bootstrap'
import { InputForm } from '../../commons/components/FormElements'
import { ACCESS } from '../../commons/util/const'
import { validateEmail } from '../../commons/util/func'
import { register, login } from '../actions/userActions'
import { readTasks } from '../../calendar/actions/calendarActions'

const Login = ({ register, login, readTasks }) => {
    const [user, setUser] = React.useState({ name: '', email: '', password: '' });
    const [typeLogin, setTypeLogin] = React.useState(ACCESS.REGISTER);
    const [alert, setAlert] = React.useState(null);
    const onChange = (target) => {
        setUser({ ...user, [target.name]: target.value })
        setAlert(null)
    }
    const styleBackground = { background: 'rgba(255,255,255, 0.75)' }
    const changeAccess = type => typeLogin !== type ? setTypeLogin(type) : null
    const history = useHistory();
    const onSubmit = (e) => {
        e.preventDefault();
        try {
            if (!user.email || !validateEmail(user.email)) {
                throw new Error('Email invalido')
            }
            if (!user.password || user.password.trim().length < 6) {
                throw new Error('El password es obligatorio y contener más de 6 caracteres')
            }
            let validateUser = {
                ...user,
                cb: userCredential => {
                    readTasks(userCredential.user.uid)
                    history.push('/')
                }
            }
            typeLogin === ACCESS.REGISTER ? register(validateUser) : login(validateUser)
        } catch (e) {
            setAlert(e.message)
        }
    }
    return <Container className="p-4">
        <Row>
            <Col />
            <Col xs={6} className="m-5">
                <Nav variant="tabs" fill defaultActiveKey="link-1">
                    <div className="nav-item" style={styleBackground}>
                        <button onClick={() => changeAccess(ACCESS.LOGIN)}
                            className={'nav-link' + (typeLogin === ACCESS.LOGIN ? ' remark' : '')}>
                            Iniciar sesión
                        </button>
                    </div>
                    <div className="nav-item" style={styleBackground}>
                        <button onClick={() => changeAccess(ACCESS.REGISTER)}
                            className={'nav-link' + (typeLogin === ACCESS.REGISTER ? ' remark' : '')} >
                            Crear cuenta
                        </button>
                    </div>
                </Nav>
                <Form className="p-3 calendarDiv" onSubmit={onSubmit}>
                    {typeLogin === ACCESS.REGISTER ?
                        <InputForm name="name" required={true} label="Nombre:"
                            value={user.name} onChange={onChange} /> : null}
                    <InputForm name="email" required={true} label="Email:"
                        value={user.email} onChange={onChange} />
                    <InputForm name="password" required={true} label="Password:"
                        value={user.password} onChange={onChange} />
                    {alert ? <Alert variant="danger">{alert}</Alert> : null}
                    <Button variant="info" type="submit" block>Ingresar</Button>
                </Form>
            </Col>
        </Row>
    </Container>
}

Login.propTypes = {
    register: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    readTasks: PropTypes.func.isRequired
}

export default connect(null, { register, login, readTasks })(Login);