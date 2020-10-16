import React, { useState, useEffect } from 'react'
import DayGrid from './DayGrid'
import TaskList from './TaskList'
import { Container, Row, Col } from 'react-bootstrap'
import { SYSDATE, MONTHS_SP, TASK_MANAGER } from '../util/utilConts'
import { fillNumberList, fragmentDate } from '../util/utilFunc'
import { readTasks } from '../actions/actions'
import { SelectForm } from './FormElement'
import TaskManager from './TaskManager'

const months = MONTHS_SP.map((month, index) => ({ id: index, text: month }))

const Agenda = ({ minYear, maxYear }) => {
    const [date, setDate] = useState(fragmentDate(SYSDATE));
    const [showManager, setShowManager] = useState();
    const [tasksListByMonth, setTasksListByMonth] = useState();
    const [taskSelected, setTaskSelected] = useState();
    const onChange = (target) => setDate({ ...date, [target.name]: target.value })
    const editTask = (t) => {
        setTaskSelected(t)
        setShowManager(TASK_MANAGER.EDITOR)
    }
    const deleteTask = (t) => {
        setTaskSelected(t)
        setShowManager(TASK_MANAGER.ERASER)
    }
    const closeManager = () => {
        setShowManager(null);
        setTaskSelected(null)
    }
    const years = fillNumberList(minYear, maxYear);
    useEffect(() => readTasks(date, setTasksListByMonth), [date.year, date.month])
    useEffect(() => setTaskSelected(null), [tasksListByMonth])
    return <Container fluid>
        <Row>
            <Col xs={8}>
                <Row>
                    <Col>
                        <SelectForm name='month' value={date.month}
                            options={months} onChange={onChange} />
                    </Col>
                    <Col>
                        <SelectForm name='year' value={date.year}
                            options={years} onChange={onChange} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DayGrid update={setDate}
                            dateSelected={date}
                            tasks={tasksListByMonth}
                            newTask={() => setShowManager(TASK_MANAGER.EDITOR)}
                            deleteTasks={() => setShowManager(TASK_MANAGER.ERASER)} />
                    </Col>
                </Row>
            </Col>
            <Col>
                <TaskList date={date}
                    tasks={tasksListByMonth}
                    newTask={() => setShowManager(TASK_MANAGER.EDITOR)}
                    editTask={editTask}
                    deleteTask={deleteTask} />
                <TaskManager date={date}
                    showManager={showManager}
                    updateTasks={setTasksListByMonth}
                    handleClose={closeManager}
                    taskSelected={taskSelected} />
            </Col>
        </Row>
    </Container>
}

export default Agenda;