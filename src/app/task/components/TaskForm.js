import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Modal from '../../commons/components/Modal'
import Form from '../../commons/components/Form'
import { fillNumberList, evalueDate, fragmentDate } from '../../util/func'
import { SYSDATE, MAXDATE, DATE_PROP_SHAPE, TASK_PROP_SHAPE, TASK, PAST } from '../../util/const'
import { COLORS } from '../../util/themes'
import { processTask } from '../actions/taskActions'

const TaskForm = ({ user, date, taskSelected, dashboards, idxDashboard, idGroup, processTask }) => {
    const initialTask = setInitialTask(taskSelected, date, dashboards, idxDashboard, idGroup)
    const [task, setTask] = React.useState(initialTask);
    const onChange = target => setTask({ ...task, [target.name]: target.value })
    const onCheck = event => setTask({ ...task, [event.target.name]: !task[event.target.name] })
    const onChangeDashboard = target => setTask({ ...task, dashboard: { ...task.dashboard, [target.name]: [target.value] } })
    const onChangeTime = target => {
        let newDate = { ...task.date, [target.name]: target.value }
        setTask({ ...task, date: evalueDate(newDate) !== PAST ? newDate : fragmentDate(SYSDATE) })
    }
    const dashboard = dashboards.find(d => d.id === task.dashboard.id)
    const onSubmit = () => processTask(dashboard, { ...task, user })
    React.useEffect(() => setTask(initialTask), [taskSelected]) // eslint-disable-line react-hooks/exhaustive-deps
    return <Modal.DropContent lg={user.id} left={user.id} title={task.taskId ? 'Editar tarea' : '+ Nueva tarea'} >
        {user.id ? <Form onSubmit={onSubmit}>
            <Modal.Body>
                <div className="row">
                    <div className="col col3">
                        <Form.Select name="id"
                            value={task.dashboard.id} label="Tablero"
                            options={dashboards.map((d, i) => ({ id: d.id, text: d.name }))}
                            onChange={onChangeDashboard}
                            disabled={idGroup || task.id} />
                        <Form.Select name="idGroup"
                            value={task.dashboard.idGroup} label="Grupo"
                            options={dashboard.groups.map(g => ({ id: g.id, text: g.name }))}
                            onChange={onChangeDashboard}
                            number disabled={idGroup || task.id} />
                        <Form.SelectDiv name="color"
                            value={task.color} label="Color"
                            onChange={onChange} options={COLORS}>
                            {COLORS.map((color, index) => <div key={index}
                                className={`select-option flex-center ${task.color === color.id ? 'selected' : ''}`}
                                onMouseOver={e => onChange({ name: 'color', value: color.id })}>
                                <div className={`mini-square ${color.id}`}></div>
                                <div className="mr-auto">{color.text}</div>
                            </div>)}
                        </Form.SelectDiv>
                        <div className={'responsive-hide square m-auto ' + task.color}></div>
                    </div>
                    <div className="col bl-gray">
                        <Form.Input name="name"
                            required={true}
                            label="Titulo"
                            value={task.name} onChange={onChange}
                            minLength="3" upperCase focus />
                        <Form.Input type="textarea" name="detail" value={task.detail}
                            label="Descripción" rows="3" onChange={onChange} />
                        <Form.DateSelect label="Fecha a marcar en calendario:"
                            controlId="date"
                            startDate={task.date}
                            minDate={fragmentDate(SYSDATE)}
                            maxDate={MAXDATE}
                            handleChange={onChangeTime} />
                        <Form.CheckBox name="alarm" label="Crear recordatorio"
                            value={task.alarm} onChange={onCheck} />
                        {task.alarm ? <Form.MultiGroup>
                            <Form.Select name="hour" label="Hora"
                                value={task.date.hour}
                                options={fillNumberList(0, 23)}
                                onChange={onChangeTime} inline />
                            <Form.Select name="minute" label="Minuto"
                                value={task.date.minute}
                                options={fillNumberList(0, 59)}
                                onChange={onChangeTime} inline />
                        </Form.MultiGroup> : null}
                    </div>
                </div>
            </Modal.Body>
            <Modal.FormFooter />
        </Form> : <Modal.WithoutSession />}
    </Modal.DropContent>
}

const setInitialTask = (taskSelected, date, dashboards, idxDashboard, idGroup) => {
    let initialTask = taskSelected || { ...TASK, date: { ...date, hour: '00', minute: '00' } }
    if (!taskSelected && dashboards[idxDashboard]) {
        initialTask.dashboard = {
            id: dashboards[idxDashboard].id,
            idGroup: idGroup || dashboards[idxDashboard].groups[0].id
        }
    }
    return initialTask
}

TaskForm.propTypes = {
    user: PropTypes.object,
    date: DATE_PROP_SHAPE.isRequired,
    dashboards: PropTypes.array.isRequired,
    idxDashboard: PropTypes.number.isRequired,
    idGroup: PropTypes.number,
    task: TASK_PROP_SHAPE,
    processTask: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    dashboards: state.task.dashboards,
    idxDashboard: state.task.idxDashboard,
    date: state.task.date,
    user: state.user
})

export default connect(mapStateToProps, { processTask })(TaskForm);
