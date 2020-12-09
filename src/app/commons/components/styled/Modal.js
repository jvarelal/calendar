import React from 'react'
import { useHistory } from 'react-router-dom'
import { goToTheTop } from '../../util/func'

const RENDER_DELAY_IN = 50
const RENDER_DELAY_OUT = 350

const DelayActive = ({ className = '', show, cbIn, cbOut, children }) => {
    const [css, setCss] = React.useState('')
    React.useEffect(() => {
        try {
            if (show) {
                setTimeout(() => {
                    setCss(' active')
                    if (cbIn) cbIn()
                }, RENDER_DELAY_IN)
            }
            else {
                setCss('')
                setTimeout(cbOut, RENDER_DELAY_OUT)
            }
        } catch (e) { }
    }, [show, cbIn, cbOut])
    return <div className={className + css}>{children}</div>
}

const Modal = ({ show, onHide, children }) => {
    goToTheTop()
    return <div tabIndex="0"
        className={'modal ' + (show ? 'active' : '')}
        onKeyDown={e => {
            if (e.keyCode === 27) onHide()
        }}>
        {children}
    </div>
}

const Header = ({ title, handleClose }) => <div className="card-header">
    <div className="flex-center">
        <div>{title}</div>
        <span className="btn btn-sm" onClick={e => handleClose()} style={{ border: 'none' }}>
            X
        </span>
    </div>
</div>

const Body = ({ children }) => <div className="card-body ptb-9">{children}</div>

const DropContent = ({ title, handleClose, lg, left, children }) => {
    const [show, setShow] = React.useState(true)
    const className = 'modal-content ' + (left ? 'modal-left' : 'modal-center') + (lg ? ' modal-lg' : '')
    return <DelayActive className={className} show={show} cbOut={handleClose}>
        <div className="card-header">
            <div className="flex-center">
                <div>{title}</div>
                <span className="btn btn-sm" onClick={e => setShow(false)} style={{ border: 'none' }}>
                    {left ? <i className="fas fa-chevron-circle-left" /> : 'X'}
                </span>
            </div>
        </div>
        {children}
    </DelayActive>
}

const Confirmation = ({ title, message, handleClose, confirm, warning = false }) => <DropContent
    title={title}
    handleClose={handleClose}>
    <div className="card-body ptb-9">{message}</div>
    <div className="row card-footer">
        <div className="col">
            <button className={'btn ' + (warning ? 'btn-red' : 'btn-primary')}
                onClick={() => { confirm(); handleClose(); }}>
                Aceptar
            </button>
        </div>
        <div className="col">
            <button className="btn btn-gray" onClick={handleClose}>Cancelar</button>
        </div>
    </div>
</DropContent>

const Message = ({ title, message, handleClose }) => <DropContent
    title={title}
    handleClose={handleClose}>
    <div className="card-body ptb-9">{message}</div>
    <div className="card-footer">
        <button className="btn btn-primary" onClick={() => handleClose()}>
            Aceptar
        </button>
    </div>
</DropContent>

const Loader = () => <div className="modal-content active modal-center">
    <div className="card-body ptb-9 text-center">
        <div className="loading" /> <br />
        Espere un momento...
    </div>
</div>

const FormFooter = ({ handleClose }) => <div className="row card-footer">
    <div className="col">
        <input className="btn btn-primary" type="submit" value="Guardar" />
    </div>
    <div className="col">
        <button className="btn btn-gray" onClick={e => {
            e.preventDefault();
            handleClose()
        }}>
            Cancelar
                </button>
    </div>
</div>

const WithoutSession = ({ handleClose }) => {
    const history = useHistory();
    const login = () => {
        history.push('/login');
        handleClose()
    }
    return <div className="text-center p-4">
        <p>Para poder avanzar es necesario iniciar sesión</p>
        <button className="btn btn-primary" onClick={login}>
            Continuar
        </button>
    </div>
}

Modal.Header = Header
Modal.FormFooter = FormFooter
Modal.Loader = Loader
Modal.Confirmation = Confirmation
Modal.Message = Message
Modal.Body = Body
Modal.DropContent = DropContent
Modal.WithoutSession = WithoutSession

export default Modal