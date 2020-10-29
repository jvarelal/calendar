import React from 'react'
import {
    Form,
    Alert,
    Table,
    Modal,
    Button,
    Container,
    Row,
    Col,
    Spinner,
    Card,
    Nav
} from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

const InputForm = ({ name, type, required, label, value, onChange }) =>
    <Form.Group controlId={name}>
        {label ? <Form.Label>{label}</Form.Label> : null}
        <Form.Control
            name={name}
            type={type}
            value={value}
            onChange={e => onChange(e.target)}
            required={required} />
    </Form.Group>

const SelectForm = ({ name, label, value, options, onChange }) =>
    <Form.Group controlId={name}>
        {label ? <Form.Label>{label}</Form.Label> : null}
        <SelectAlone name={name} value={value} options={options} onChange={onChange} />
    </Form.Group>

const SelectAlone = ({ name, value, options, onChange }) =>
    <Form.Control as="select" name={name} value={value} onChange={e => onChange(e.target)}>
        {options.map((option, index) => {
            if (typeof option === 'object') {
                return <option key={index} value={option.id}>{option.text}</option>
            }
            if (typeof option === 'number') {
                return <option key={index} value={option}>{option < 10 ? '0' + option : option}</option>
            }
            return <option key={index} value={index}>{option}</option>
        })}
    </Form.Control>

const TextAreaForm = ({ name, required, label, rows, value, onChange }) =>
    <Form.Group controlId={name}>
        {label ? <Form.Label>{label}</Form.Label> : null}
        <Form.Control as="textarea" rows={rows} name={name}
            value={value} onChange={e => onChange(e.target)} required={required} />
    </Form.Group>

const TableHead = ({ headers, className, children }) => {
    const widthCell = Math.trunc(100 / headers.length) + '%';
    return <Table>
        <thead className={className}>
            <tr>
                {headers.map((header, index) => <th key={index} style={{ width: widthCell }}>{header}</th>)}
            </tr>
        </thead>
        {children}
    </Table>
}

const FlagPriorityTask = ({ tasks }) => {
    if (!tasks || tasks.length === 0) {
        return null;
    }
    let colorWarning = tasks.find(t => t.priority === 1)
    let colorDanger = tasks.find(t => t.priority === 2)
    let styles = {
        width: '0',
        height: '0',
        borderTop: '1rem solid transparent',
        borderBottom: '1rem solid transparent',
        borderLeft: '2rem solid ' + (colorDanger ? '#dc3545' : (colorWarning ? '#ffc107' : '#007bff')),
        float: 'left',
        position: 'absolute'
    }
    return <div style={styles}> </div>
}

const AlertTableFooter = ({ colSpan, alert, onClose }) => <tfoot>
    <tr>
        <td colSpan={colSpan}>
            {alert.show ? <Alert variant="warning" onClose={onClose} dismissible>
                {alert.msg}
            </Alert> : null}
        </td>
    </tr>
    <tr>
        <td colSpan={colSpan} style={{ fontSize: '0.75rem' }}>
            <InfoDiv />
        </td>
    </tr>
</tfoot>

const DropCard = ({ title, variant, children }) => {
    const [showDetail, setShowDetail] = React.useState(false)
    return <Card border={variant} className="mb-2" draggable>
        <Card.Header>
            <Row>
                <Col><strong>{title}</strong></Col>
                <Col className="text-right">
                    <Button variant={variant} size="sm"
                        onClick={() => setShowDetail(!showDetail)}>
                        <i className="material-icons inline-icon">
                            {showDetail ? 'arrow_drop_up' : 'arrow_drop_down'}
                        </i>
                        <i className="material-icons inline-icon">assignment</i>
                    </Button>
                </Col>
            </Row>
        </Card.Header>
        {showDetail ? children : null}
    </Card>
}

const ModalHeader = ({ title }) => <Modal.Header closeButton>
    <Modal.Title>{title}</Modal.Title>
</Modal.Header>

const ModalConfirmation = ({ title, message, handleClose, confirm }) => <>
    <ModalHeader title={title} />
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Cancelar
            </Button>
        <Button variant="warning" onClick={() => {
            confirm();
            handleClose();
        }}>
            Aceptar
            </Button>
    </Modal.Footer>
</>

const ModalMessage = ({ title, message, handleClose }) => <>
    <ModalHeader title={title} />
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
            Aceptar
        </Button>
    </Modal.Footer>
</>

const ModalLoader = () => <Modal.Body>
    <div style={{ textAlign: 'center' }}>
        <Spinner animation="border" /> <br />
        Espere un momento...
    </div>
</Modal.Body>

const InfoDiv = () => <Container>
    <Row>
        <Col>
            <div className="square today" /> <label>Día actual</label>
        </Col>
        <Col>
            <div className="flag flag-info" /><label>Tarea(s) agendada</label>
        </Col>
    </Row>
    <Row>
        <Col>
            <div className="square selected" /> <label>Día seleccionado</label>
        </Col>
        <Col>
            <div className="flag flag-warning" /><label>Tarea(s) de prioridad media agendada</label>
        </Col>
    </Row>
    <Row>
        <Col>
            <div className="square disable" /><label>Día del mes en previo o siguiente</label>
        </Col>
        <Col>
            <div className="flag flag-danger" /><label>Tarea(s) de prioridad alta agendada</label>
        </Col>
    </Row>
</Container>;


const MenuTabs = ({ navs }) => {
    let location = useLocation();
    return <Nav justify fill variant="tabs" className="mb-4">
        {navs.map((nav, index) => <div key={index} className="nav-item">
            <Link to={nav.link} className={'nav-link' + (nav.link === location.pathname ? ' active' : '')}>{nav.name}</Link>
        </div>)}
    </Nav>
}

export {
    SelectForm,
    SelectAlone,
    InputForm,
    TextAreaForm,
    TableHead,
    FlagPriorityTask,
    AlertTableFooter,
    ModalConfirmation,
    ModalHeader,
    ModalMessage,
    ModalLoader,
    DropCard,
    MenuTabs
}