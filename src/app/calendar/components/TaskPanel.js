import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import YearMonthControl from './YearMonthControl'
import TaskCard from './TaskCard'
import TaskForm from './TaskForm'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { getDaysInPanel } from '../util/utilFuncCalendar'
import { evalueDate, goToTheTop, fragmentDate } from '../util/utilFunc'
import { updateTask, setDate } from '../actions/calendarActions'
import { getModalMessage, getModalContent } from '../../commons/actions/modalActions'
import { DATE_PROP_SHAPE, DAYS_SP, PAST } from '../util/utilConts'

const TaskPanel = ({ date, tasksByMonth, updateTask, getModalMessage, setDate, getModalContent }) => {
    const [dragging, setDragging] = React.useState(false)
    const days = getDaysInPanel(date, tasksByMonth);
    const dragTask = React.useRef();
    const dragCard = React.useRef();
    const onDragStart = (e, task) => {
        dragTask.current = task;
        dragCard.current = e.target;
        dragCard.current.addEventListener('dragend', onDragEnd)
        setDragging(true)
    }
    const onDragEnd = () => {
        dragCard.current.removeEventListener('dragend', onDragEnd)
        dragTask.current = null;
        dragCard.current = null;
        setDragging(false)
    }
    const onDragOver = (event) => {
        event.stopPropagation();
        event.preventDefault();
    }
    const onDrop = (e, d) => handleDrop(e, { ...date, day: d.day }, dragTask.current, getModalMessage, updateTask)
    const onDivClick = (e, day) => {
        setDate({ ...date, day: day });
        getModalContent(<TaskForm title="+ Nueva Tarea" />)
    }
    const monthBack = () => setDate(fragmentDate(new Date(date.year, Number(date.month) - 1, date.day)))//setDate({ ...date, month: Number(date.month) - 1 });
    const monthFordward = () => setDate(fragmentDate(new Date(date.year, Number(date.month) + 1, date.day)))//setDate({ ...date, month: Number(date.month) + 1 });
    return <>
        <YearMonthControl />
        <Container className="mb-5">
            <MonthBackForward back={monthBack} forward={monthFordward} />
            {days.map((d, index) => <Row key={index}>
                <Col xs={1}
                    className={'p-1 panel-cell ' + (d.able ? 'panel-active' : 'disable')}
                    onClick={(e) => onDivClick(e, d.day)}>
                    <h5>{d.day}</h5>
                    <p className="m-0" style={{ fontSize: '0.75rem' }}>{DAYS_SP[d.dayOfWeek]}</p>
                </Col>
                <Col className="p-4 panel-cell panel-danger"
                    onDrop={dragging ? e => onDrop(e, d) : null}
                    onDragOver={onDragOver}>
                    {d.tasks.danger.map((task, index) =>
                        <TaskCard key={index} task={task} onDragStart={e => onDragStart(e, task)} />)}
                </Col>
                <Col className="p-4 panel-cell panel-warning"
                    onDrop={dragging ? e => onDrop(e, d) : null}
                    onDragOver={onDragOver}>
                    {d.tasks.warning.map((task, index) =>
                        <TaskCard key={index} task={task} onDragStart={e => onDragStart(e, task)} />)}
                </Col>
                <Col className="p-4 panel-cell panel-info"
                    onDrop={dragging ? e => onDrop(e, d) : null}
                    onDragOver={onDragOver}>
                    {d.tasks.info.map((task, index) =>
                        <TaskCard key={index} task={task} onDragStart={e => onDragStart(e, task)} />)}
                </Col>
            </Row>
            )}
            <MonthBackForward back={monthBack} forward={monthFordward} />
        </Container>
    </>
}

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
                onDragEnter={() => setTimeout(goBack, 1000)}>
                <i className="material-icons inline-icon">arrow_back</i>Mes anterior
            </Button>
        </Col>
        <Col className="p-0">
            <Button block className="m-0"
                variant="outline-info"
                style={{ borderRadius: '0px' }}
                onClick={goForward}
                onDragEnter={() => setTimeout(goForward, 1000)}>
                <i className="material-icons inline-icon">arrow_forward</i>Mes siguiente
            </Button>
        </Col>
    </Row>
}

const handleDrop = (e, newDate, task, getModalMessage, updateTask) => {
    let className = e.target.className
    let newPriority;
    switch (true) {
        case className.indexOf('danger') >= 0:
            newPriority = 2;
            break;
        case className.indexOf('warning') >= 0:
            newPriority = 1;
            break;
        case className.indexOf('info') >= 0:
            newPriority = 0;
            break;
        default:
            newPriority = task.priority;
            break;
    }
    if (evalueDate(newDate) === PAST || evalueDate(task.date) === PAST) {
        return getModalMessage('Editar tarea', 'No se pueden asignar o afectar tareas de fechas anteriores')
    }
    if (task.priority !== newPriority || task.date.day !== newDate.day) {
        let nTask = { ...task, priority: newPriority, dismiss: false, date: newDate }
        return updateTask(nTask);
    }
}

TaskPanel.propTypes = {
    date: DATE_PROP_SHAPE.isRequired,
    tasksByMonth: PropTypes.array.isRequired,
    updateTask: PropTypes.func.isRequired,
    setDate: PropTypes.func.isRequired,
    getModalMessage: PropTypes.func.isRequired,
    getModalContent: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    date: state.calendar.date,
    tasksByMonth: state.calendar.tasksByMonth
})

export default connect(
    mapStateToProps,
    { updateTask, getModalMessage, setDate, getModalContent }
)(TaskPanel)