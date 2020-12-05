import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Modal from '../../commons/components/styled/Modal'
import Form from '../../commons/components/styled/Form'
import { useHistory } from 'react-router-dom'
import { fillNumberList, fragmentDate, evalueDate } from '../../commons/util/func'
import { SYSDATE, DATE_PROP_SHAPE, TASK_PROP_SHAPE, COLORS, TASK, PAST } from '../../commons/util/const'
import { createTask, updateTask } from '../actions/taskActions'
import { updateDashboard } from '../actions/taskActions'
import { DivColorOption } from './TaskElements'
import { handleClose } from '../../commons/actions/modalActions'

const maxDate = { year: SYSDATE.getFullYear() + 4, month: 11, day: 31 }

const TaskForm = ({ userId, date, taskSelected, dashboards, idxDashboard, idGroup, handleClose, createTask, updateTask, updateDashboard }) => {
    const initialTask = taskSelected || {
        ...TASK,
        date: { ...date, hour: '00', minute: '00' },
        dashboard: dashboards.length > 0 ? {
            id: dashboards[idxDashboard].id,
            idGroup: idGroup || dashboards[idxDashboard].groups[0].id
        } : {}
    }
    const [task, setTask] = React.useState(initialTask);
    const currentDashboard = dashboards.find(d => d.id === task.dashboard.id)
    const history = useHistory();
    const onChange = (target) => setTask({ ...task, [target.name]: target.value })
    const onChangeDb = target => setTask({ ...task, dashboard: { ...task.dashboard, [target.name]: target.value } })
    const onCheck = event => setTask({ ...task, [event.target.name]: !task[event.target.name] })
    const minDate = fragmentDate(SYSDATE)
    const onChangeTime = target => {
        let newDate = { ...task.date, [target.name]: target.value }
        setTask({ ...task, date: evalueDate(newDate) !== PAST ? newDate : minDate })
    }
    const onSubmit = (event) => {
        event.preventDefault();
        task.id ? updateTask({ ...task, dismiss: false }) : createTask({ ...task, userId: userId })
    }
    const login = () => {
        history.push('/login');
        handleClose()
    }
    React.useEffect(() => setTask(initialTask), [taskSelected]) // eslint-disable-line react-hooks/exhaustive-deps
    return <Modal.DropContent title={task.id ? 'Editar tarea' : '+ Nueva tarea'} handleClose={handleClose} lg>
        {userId ? <Form onSubmit={onSubmit}>
            <Modal.Body>
                <div className="flex-center">
                    <div className="col col3">
                        <Form.Select name="id" value={task.dashboard.id} label="Tablero"
                            options={dashboards.map((d, i) => ({ id: d.id, text: d.name }))}
                            onChange={onChangeDb} disabled={idGroup || task.id} />
                        <Form.Select name="idGroup" value={task.dashboard.idGroup} label="Grupo"
                            options={currentDashboard.groups.map(g => ({ id: g.id, text: g.name }))}
                            onChange={onChangeDb} number disabled={idGroup || task.id} />
                        <Form.SelectDiv name="color" value={task.color} label="Color"
                            options={COLORS}>
                            {COLORS.map((color, index) => <DivColorOption
                                key={index}
                                id={color.id}
                                text={color.text}
                                onClick={e => onChange({ name: 'color', value: color.id })} />)}
                        </Form.SelectDiv>
                        <div className={'square m-auto ' + task.color}></div>
                    </div>
                    <div className="col bl-gray">
                        <Form.Input name="name" required={true} label="Titulo"
                            value={task.name} onChange={onChange} upperCase />
                        <Form.TextArea name="detail" value={task.detail} label="Descripción"
                            rows="3" onChange={onChange} />
                        <Form.DateSelect label="Fecha a marcar en calendario:"
                            controlId="date"
                            startDate={task.date}
                            minDate={fragmentDate(SYSDATE)}
                            maxDate={maxDate}
                            handleChange={onChangeTime} />
                        <Form.CheckBox name="alarm" label="Crear recordatorio" value={task.alarm} onChange={onCheck} />
                        {task.alarm ? <Form.MultiGroup>
                            <Form.Select name="hour" label="Hora" value={task.date.hour}
                                options={fillNumberList(0, 23)} onChange={onChangeTime} number inline />
                            <Form.Select name="minute" label="Minuto" value={task.date.minute}
                                options={fillNumberList(0, 59)} onChange={onChangeTime} number inline />
                        </Form.MultiGroup> : null}
                    </div>
                </div>
            </Modal.Body>
            <Modal.FormFooter handleClose={handleClose} />
        </Form> : <div className="text-center p-4">
                <p>Inicia sesión para poder guardar notas</p>
                <button className="btn btn-primary" onClick={login}>Iniciar sesión</button>
            </div>}
    </Modal.DropContent>
}

TaskForm.propTypes = {
    userId: PropTypes.string,
    date: DATE_PROP_SHAPE.isRequired,
    dashboards: PropTypes.array.isRequired,
    idxDashboard: PropTypes.number.isRequired,
    idGroup: PropTypes.number,
    task: TASK_PROP_SHAPE,
    createTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    updateDashboard: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    dashboards: state.task.dashboards,
    idxDashboard: state.task.idxDashboard,
    date: state.task.date,
    userId: state.user.id
})

export default connect(
    mapStateToProps,
    { handleClose, createTask, updateTask, updateDashboard }
)(TaskForm);