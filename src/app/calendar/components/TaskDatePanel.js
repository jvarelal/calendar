import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import YearMonthControl from './YearMonthControl'
import TaskCard from './TaskCard'
import TaskForm from './TaskForm'
import { Container, Row, Col } from 'react-bootstrap'
import { getDaysInPanel, handleDrop } from '../util/funcCalendar'
import { fragmentDate } from '../../commons/util/func'
import { updateTask, setDate } from '../actions/calendarActions'
import { getModalMessage, getModalContent } from '../../commons/actions/modalActions'
import { DATE_PROP_SHAPE, DAYS_SP, VARIANTS } from '../../commons/util/const'
import { MonthBackForward } from './AppElements'

const TaskDatePanel = ({ date, tasksByMonth, updateTask, getModalMessage, setDate, getModalContent }) => {
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
    const onDivClick = (e, d) => {
        if (d.able) {
            setDate({ ...date, day: d.day });
            getModalContent(<TaskForm title="+ Nueva Nota" />)
        }
    }
    const monthBack = () => setDate(fragmentDate(new Date(date.year, Number(date.month) - 1, date.day)))
    const monthFordward = () => setDate(fragmentDate(new Date(date.year, Number(date.month) + 1, date.day)))
    return <Container className="pt-4 calendarDiv">
        <YearMonthControl />
        <Container className="mb-5 pb-1 taskPanel">
            <MonthBackForward back={monthBack} forward={monthFordward} />
            {days.map((d, index) => <Row key={index}>
                <Col xs={1}
                    className={'p-1 panel-cell ' + (d.able ? 'panel-active' : 'disable')}
                    onClick={(e) => onDivClick(e, d)}>
                    <h5>{d.day}</h5>
                    <p className="m-0" style={{ fontSize: '0.75rem' }}>
                        {DAYS_SP[d.dayOfWeek]}
                    </p>
                </Col>
                {VARIANTS.map((variant, i) => <Col key={i}
                    className={'p-4 panel-cell panel-' + variant}
                    onDrop={dragging ? e => onDrop(e, d) : null}
                    onDragOver={onDragOver}>
                    {d.tasks[variant].map((task, index) =>
                        <TaskCard key={index}
                            task={task}
                            expanded={true}
                            onDragStart={e => onDragStart(e, task)} />)}
                </Col>)}
            </Row>
            )}
            <MonthBackForward back={monthBack} forward={monthFordward} />
        </Container>
    </Container>
}

TaskDatePanel.propTypes = {
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
)(TaskDatePanel)