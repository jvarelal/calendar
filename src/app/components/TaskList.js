import React, { useState } from 'react'
import { Container, Button, Card, Row, Col } from 'react-bootstrap'
import { evalueTime } from '../util/utilFunc'
import { FUTURE } from '../util/utilConts'

const TaskList = ({ date, tasks = [], newTask = () => null, editTask = () => null, deleteTask = () => null }) => {
    return <Container>
        <div style={{ paddingBottom: '15px', textAlign: 'center', marginBottom: '10px', borderBottom: '1px solid #888' }}>
            <header>
                <h4>{`Día: ${date.day}/${Number(date.month) + 1}/${date.year}`}</h4>
            </header>
            {evalueTime(date) == FUTURE ? <Button variant="secondary" onClick={newTask}>+ Nueva Tarea</Button> : null}
        </div>
        <ShowTasks tasks={tasks} date={date} editTask={editTask} deleteTask={deleteTask} />
    </Container>
}

const ShowTasks = ({ tasks, date, editTask, deleteTask }) => {
    let showTasks = []
    try {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].day == date.day) {
                showTasks.push(<TaskCard
                    task={tasks[i]}
                    date={date}
                    editTask={editTask}
                    deleteTask={deleteTask}
                    key={i} />)
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

const TaskCard = ({ task, date, editTask, deleteTask }) => {
    const [showDetail, setShowDetail] = useState(false)
    const color = task.priority == 2 ? 'danger' : (task.priority == 1 ? 'warning' : 'info');
    const editable = evalueTime(date) === FUTURE
    return <>
        <Card border={color}>
            <Card.Header>
                <Row>
                    <Col><strong>{task.name}</strong></Col>
                    <Col>
                        <Button variant={color}
                            onClick={() => setShowDetail(!showDetail)}
                            size="sm">
                            {showDetail ? 'Ocultar detalle' : 'Mostrar detalle'}
                        </Button>
                    </Col>
                </Row>
            </Card.Header>
            {showDetail ? <Card.Body>
                <Card.Text>{task.detail}</Card.Text>
                {editable ?
                    <Row>
                        <Col>
                            <Button variant="primary" size="sm" block onClick={() => editTask(task)}>
                                Editar
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="dark" size="sm" block onClick={() => deleteTask(task)}>
                                Eliminar
                            </Button>
                        </Col>
                    </Row> : null}
            </Card.Body> : null}
        </Card>
        <br />
    </>
}

export default TaskList;