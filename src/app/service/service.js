import { CALENDAR_TYPES } from '../actions/types'

export default function service({ type = '', body = {}, cb = () => null, error = () => null }) {
    const operations = [
        {
            type: CALENDAR_TYPES.CREATE_TASK,
            operation: _createTask
        },
        {
            type: CALENDAR_TYPES.LIST_TASKS,
            operation: _readTask
        },
        {
            type: CALENDAR_TYPES.EDIT_TASK,
            operation: _updateTask
        },
        {
            type: CALENDAR_TYPES.DELETE.BY_ID,
            operation: _deleteTaskById
        },
        {
            type: CALENDAR_TYPES.DELETE.BY_DATE,
            operation: _deleteTaskByDate
        }
    ];
    let search = operations.find(o => o.type === type);
    search.operation(body, cb, error);
}

const response = { status: 200, message: '' }

const _createTask = (body, cb, cbError) => {
    try {
        let data = _getData()
        data.push({ ...body, id: new Date().getTime() });
        _setData(data);
        cb({ ...response, message: 'Tarea agregada' });
    } catch (e) {
        cbError({ status: 500, message: e.message })
    }
}

const _readTask = (body, cb, cbError) => {
    try {
        let monthData = _getData().filter(task => {
            let date = task.date
            return date.year === body.year && date.month === body.month
        });
        cb({ ...response, message: 'Tareas listadas', data: monthData });
    } catch (e) {
        cbError({ status: 500, message: e.message })
    }
}

const _updateTask = (body, cb, cbError) => {
    try {
        let data = _getData();
        let done = false;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === body.id) {
                data[i] = { ...body };
                done = true;
                break;
            }
        }
        if (!done) {
            throw new Error('Tarea no encontrada');
        }
        _setData(data);
        cb({ ...response, message: 'Tarea actualizada' });
    } catch (e) {
        cbError({ status: 500, message: e.message })
    }
}

const _deleteTaskById = (body, cb, cbError) => {
    try {
        let data = _getData().filter(task => task.id !== body.id);
        _setData(data);
        cb({ ...response, message: 'Tarea eliminada' });
    } catch (e) {
        cbError({ status: 500, message: e.message })
    }
}

const _deleteTaskByDate = (body, cb, cbError) => {
    try {
        let data = _getData().filter(task => {
            let date = task.date;
            return !(date.year === body.year &&
                date.month === body.month &&
                date.day === body.day)
        });
        _setData(data);
        cb({ ...response, message: 'Tareas eliminadas' });
    } catch (e) {
        cbError({ status: 500, message: e.message })
    }
}

const _getData = () => {
    let data = localStorage.tasks || '[]';
    return JSON.parse(data);
}

const _setData = (data) => {
    localStorage.tasks = JSON.stringify(data);
}