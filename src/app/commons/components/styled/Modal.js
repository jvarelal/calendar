import React from 'react'

const DelayActive = ({ className = '', delay = 0, show, cbIn, cbOut, children }) => {
    const [css, setCss] = React.useState('')
    React.useEffect(() => {
        try {
            if (show) {
                setTimeout(() => {
                    setCss(' active')
                    if (cbIn) cbIn()
                }, delay)
            }
            else {
                setCss('')
                setTimeout(cbOut, 1000)
            }
        } catch (e) { }
    }, [show, cbIn, cbOut, delay])
    return <div className={className + css}>{children}</div>
}

const Modal = ({ show, children }) => <div className={'modal ' + (show ? 'active' : '')}>
    {children}
</div>

const Header = ({ title, handleClose }) => <div className="card-header">
    <div className="flex-center">
        <div>{title}</div>
        <span className="btn btn-sm" onClick={e => handleClose()} style={{ border: 'none' }}>
            X
        </span>
    </div>
</div>

const Body = ({ children }) => <div className="card-body">{children}</div>

const DropContent = ({ title, handleClose, lg, children }) => {
    const [show, setShow] = React.useState(true)
    const className = 'modal-content' + (lg ? ' modal-lg' : '')
    return <DelayActive className={className} delay={100} show={show} cbOut={handleClose}>
        <div className="card-header">
            <div className="flex-center">
                <div>{title}</div>
                <span className="btn btn-sm" onClick={e => setShow(false)} style={{ border: 'none' }}>
                    X
                </span>
            </div>
        </div>
        {children}
    </DelayActive>
}

const Confirmation = ({ title, message, handleClose, confirm, warning = false }) => <DropContent
    title={title}
    handleClose={handleClose}>
    <div className="card-body">{message}</div>
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
    <div className="card-body">{message}</div>
    <div className="card-footer">
        <button className="btn btn-primary" onClick={() => handleClose()}>
            Aceptar
        </button>
    </div>
</DropContent>

const Loader = () => <div className="modal-content active">
    <div className="card-body text-center">
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

Modal.Header = Header
Modal.FormFooter = FormFooter
Modal.Loader = Loader
Modal.Confirmation = Confirmation
Modal.Message = Message
Modal.Body = Body
Modal.DropContent = DropContent

export default Modal