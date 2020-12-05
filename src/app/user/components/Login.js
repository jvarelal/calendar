import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Form from '../../commons/components/styled/Form'
import { validateEmail } from '../../commons/util/func'
import { RGX } from '../../commons/util/const'
import { register, login, loginGoogle, loginFacebook } from '../actions/userActions'

const ACCESS = {
    LOGIN: { ID: 1, NAME: 'Login' },
    REGISTER: { ID: 2, NAME: 'Registrarse' }
}

const LIST_ACCESS = [ACCESS.LOGIN, ACCESS.REGISTER]

const Login = ({ currentUser, register, login, loginGoogle, loginFacebook }) => {
    const [user, setUser] = React.useState({ name: '', email: '', password: '' });
    const [typeLogin, setTypeLogin] = React.useState(ACCESS.LOGIN.ID);
    const [error, setError] = React.useState('');
    const onChange = (target) => setUser({ ...user, [target.name]: target.value })
    const changeAccess = type => typeLogin !== type ? setTypeLogin(type) : null
    const history = useHistory();
    const cbLogin = { cb: () => history.push('/') }
    const style = {margin: '0 1.5rem'}
    const onSubmit = (e) => {
        e.preventDefault();
        try {
            let validateUser = { ...user, ...cbLogin }
            typeLogin === ACCESS.REGISTER ? register(validateUser) : login(validateUser)
        } catch (e) {
            setError(e.message)
        }
    }
    React.useEffect(() => { if (currentUser.id) history.push('/') }, [currentUser, history])
    return <div className="row h50 flex-center">
        <div className="col text-center">
            <div className="login">
                <ul className="navbar-list">
                    {LIST_ACCESS.map((access, i) => <li className="w50 flex-center" key={i}>
                        {typeLogin === access.ID ? <span className="m-auto">{access.NAME}</span> :
                            <button onClick={() => changeAccess(access.ID)} className="btn-inactive btn w100">
                                {access.NAME}
                            </button>}
                    </li>)}
                </ul>
                <div className="plr-9 ptb-7">
                    <Form onSubmit={onSubmit} error={error}>
                        <div style={style}>
                            {typeLogin === ACCESS.REGISTER.ID ?
                                <Form.Input name="name" required={true} label="Nombre"
                                    value={user.name} onChange={onChange}
                                    rgx={RGX.ALPHANUMERICAL1} /> : null}
                            <Form.Input name="email" required={true} label="Email"
                                type="password"
                                value={user.email} onChange={onChange}
                                rgx={RGX.EMAIL} validateValue={validateEmail} />
                            <Form.Input name="password" required={true} label="Password"
                                value={user.password} onChange={onChange}
                                minLength="6" />
                        </div>
                        <div className="row">
                            <input type="submit" className="btn btn-primary w100" value="Ingresar" />
                        </div>
                    </Form>
                </div>
                <div className="card-footer ptb-7">
                    <div className="row">
                        <div className="col">
                            <button className="btn btn-red w100" onClick={() => loginGoogle(cbLogin)}>
                                <i className="fab fa-google" /> Google
                            </button>
                        </div>
                        <div className="col">
                            <button className="btn btn-blue w100" onClick={() => loginFacebook(cbLogin)}>
                                <i className="fab fa-facebook-square" /> Facebook
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

Login.propTypes = {
    register: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    loginGoogle: PropTypes.func.isRequired,
    loginFacebook: PropTypes.func.isRequired,
}

const mapToStateProp = state => ({
    currentUser: state.user
})

export default connect(
    mapToStateProp,
    { register, login, loginGoogle, loginFacebook }
)(Login);
