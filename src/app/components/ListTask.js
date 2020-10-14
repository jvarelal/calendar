import React, { useState } from 'react'
import { Container, Button, Card } from 'react-bootstrap'
import { evalueTime } from '../util/utilFunc'
import { PAST } from '../util/utilConts'
import Task from './Task'

const ListTask = ({ year, month, day, tasks = [] }) => {
    const [showModal, setShowModal] = useState(false);
    const fragmentDay = { year: year, month: month, day: day }
    return <Container>
        <div style={{ paddingBottom: '15px', textAlign: 'center', marginBottom: '10px', borderBottom: '1px solid #888' }}>
            <header><h4>{`Día: ${day}/${month}/${year}`}</h4></header>
            {evalueTime(year, month, day, tasks) != PAST ? <>
                <Button variant="dark" onClick={e => setShowModal(true)}>+ Nueva Tarea</Button>
                <Task showModal={showModal} handleClose={() => setShowModal(false)} fragmentDay={fragmentDay} />
            </> : null}
        </div>
        <ShowTasks tasks={tasks} day={day} />
    </Container>
}

const ShowTasks = ({ tasks, day }) => {
    let showTasks = []
    try {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].day == day) {
                showTasks.push(<TaskCard task={tasks[i]} idx={i} />)
            }
        }
        if (showTasks.length === 0) {
            throw new Error('Sin tareas registradas');
        }
        return showTasks;
    } catch (e) {
        return <h4 style={{ color: '#888' }}>Sin tareas registradas</h4>;
    }
}

const TaskCard = ({ task, idx }) => {
    return <Card
        bg={task.priority == 2 ? 'danger' : (task.priority == 1 ? 'warning' : 'light')}
        text={task.priority == 0 ? 'black' : 'white'}
        key={idx} className="mb-2">
        <Card.Header>{task.name}</Card.Header>
        <Card.Body>
            <Card.Text>{task.detail}</Card.Text>
        </Card.Body>
    </Card>
}

export default ListTask;