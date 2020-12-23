import React from 'react'
import { useHistory } from 'react-router-dom'
import Notification from './Notification'
import { goToTheTop } from '../../util/func'
import { KEYCODES } from '../../util/const'

const RENDER_DELAY_IN = 50
const RENDER_DELAY_OUT = 500
const ModalContext = React.createContext(() => null)
const ModalCssContext = React.createContext(() => null)

const Modal = ({ show, handleClose, children }) => {
    goToTheTop()
    return <ModalContext.Provider value={handleClose}>
        <div className={'modal ' + (show ? 'active' : '')}>
            {children}
        </div>
    </ModalContext.Provider>
}

const DelayActive = ({ className = '', show, children }) => {
    const closeModal = React.useContext(ModalContext)
    const [css, setCss] = React.useState('')
    const hide = () => {
        setCss('')
        setTimeout(closeModal, RENDER_DELAY_OUT)
    }
    React.useEffect(() => {
        try {
            show ? setTimeout(() => setCss(' active'), RENDER_DELAY_IN) : hide()
        } catch (e) { }
    }, [show]) // eslint-disable-line react-hooks/exhaustive-deps
    return <ModalCssContext.Provider value={hide}>
        <div tabIndex="0" className={className + css}
            onKeyDown={e => {
                if (e.keyCode === KEYCODES.ESC) hide()
            }}>
            {children}
        </div>
    </ModalCssContext.Provider>
}

const DropContent = ({ title, lg, left, children }) => {
    const [show, setShow] = React.useState(true)
    const className = `modal-content modal-${left ? 'left' : 'center'} ${lg ? ' modal-lg' : ''}`
    return <DelayActive className={className} show={show}>
        <div className="card-header">
            <Notification.Dismissible title={title} onClose={() => setShow(false)}
                iconClose={left ? <i className="fas fa-chevron-circle-left" /> : 'X'} />
        </div>
        {children}
    </DelayActive>
}

const Confirmation = ({ title, message, confirm, warning = false }) => {
    return <DropContent title={title}>
        <div className="card-body ptb-9">{message}</div>
        <div className="row card-footer">
            <div className="col">
                <CloseButton className={`btn btn-${warning ? 'red' : 'primary'}`}
                    onClick={confirm}
                    text="Aceptar" />
            </div>
            <div className="col">
                <CloseButton className="btn btn-gray" text="Cancelar" />
            </div>
        </div>
    </DropContent>
}

const Message = ({ title, message }) => <DropContent title={title}>
    <div className="card-body ptb-9">{message}</div>
    <div className="card-footer">
        <CloseButton className="btn btn-primary" text="Aceptar" />
    </div>
</DropContent>

const Loader = () => <div className="modal-content active modal-center">
    <div className="card-body ptb-9 text-center">
        <div className="loading" /> <br />
        Espere un momento...
    </div>
</div>

//INNER CHILDS
const CloseButton = ({ text, className, onClick }) => {
    const closeModal = React.useContext(ModalCssContext)
    return <button className={className} onClick={() => {
        if (onClick) onClick()
        closeModal()
    }}>
        {text}
    </button>
}

const Body = ({ children }) => <div className="card-body ptb-9">{children}</div>

const FormFooter = () => {
    const closeModal = React.useContext(ModalCssContext)
    return <div className="row card-footer">
        <div className="col">
            <input className="btn btn-primary" type="submit" value="Guardar" />
        </div>
        <div className="col">
            <button className="btn btn-gray" onClick={e => {
                e.preventDefault();
                closeModal()
            }}> Cancelar </button>
        </div>
    </div>
}

const WithoutSession = () => {
    const closeModal = React.useContext(ModalCssContext)
    const history = useHistory();
    const buttonEl = React.useRef(null)
    const login = () => {
        history.push('/login');
        closeModal()
    }
    return <div className="text-center p-4">
        <p>Para poder avanzar es necesario iniciar sesión</p>
        <h1><i className="fas fa-door-closed" /></h1>
        <button className="btn btn-primary" onClick={login} ref={buttonEl}>
            Continuar <i className="fas fa-arrow-right" />
        </button>
    </div>
}

Modal.FormFooter = FormFooter
Modal.Loader = Loader
Modal.Confirmation = Confirmation
Modal.Message = Message
Modal.Body = Body
Modal.DropContent = DropContent
Modal.WithoutSession = WithoutSession

export default Modal