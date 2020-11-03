import React from 'react'
import {
    Alert,
    Table,
    Button,
    Container,
    Row,
    Col
} from 'react-bootstrap'
import { goToTheTop } from '../../commons/util/func'

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
        borderLeft: '1rem solid ' + (colorDanger ? '#dc3545' : (colorWarning ? '#ffc107' : '#007bff')),
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


const InfoDiv = () => <Container>
    <Row>
        <Col>
            <div className="square today" /> <label>Día actual</label>
        </Col>
        <Col>
            <div className="flag flag-info" /><label>Nota(s) agendada</label>
        </Col>
    </Row>
    <Row>
        <Col>
            <div className="square selected" /> <label>Día seleccionado</label>
        </Col>
        <Col>
            <div className="flag flag-warning" /><label>Nota(s) de prioridad media agendada</label>
        </Col>
    </Row>
    <Row>
        <Col>
            <div className="square disable" /><label>Día del mes en previo o siguiente</label>
        </Col>
        <Col>
            <div className="flag flag-danger" /><label>Nota(s) de prioridad alta agendada</label>
        </Col>
    </Row>
</Container>;

const MonthBackForward = ({ back, forward }) => {
    const goBack = () => {
        goToTheTop();
        back();
    }
    const goForward = () => {
        goToTheTop();
        forward();
    }
    return <Row>
        <Col className="p-0">
            <Button block className="m-0"
                variant="outline-info"
                style={{ borderRadius: '0px' }}
                onClick={goBack}
                onDragEnter={() => setTimeout(goBack, 800)}>
                <i className="material-icons inline-icon">arrow_back</i>Mes anterior
            </Button>
        </Col>
        <Col className="p-0">
            <Button block className="m-0"
                variant="outline-info"
                style={{ borderRadius: '0px' }}
                onClick={goForward}
                onDragEnter={() => setTimeout(goForward, 800)}>
                <i className="material-icons inline-icon">arrow_forward</i>Mes siguiente
            </Button>
        </Col>
    </Row>
}

const ButtonNewTask = ({ onClick, size = "sm" }) => <Col>
    <Button block size={size}
        variant="info" onClick={onClick}>
        <i className="material-icons inline-icon">add</i>
    </Button>
</Col>

export {
    TableHead,
    FlagPriorityTask,
    AlertTableFooter,
    MonthBackForward,
    ButtonNewTask
}