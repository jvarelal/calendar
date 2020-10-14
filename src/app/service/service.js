import TYPES from '../actions/types'

export default function service({ type = '', body = {}, cb = () => null, cbError = () => null }) {
    const operations = [
        {
            type: TYPES.CREATE,
            operation: createTask
        },
        {
            type: TYPES.READ,
            operation: readTask
        },
        {
            type: TYPES.UPDATE,
            operation: updateTask
        },
        {
            type: TYPES.DELETE,
            operation: deleteTask
        }
    ];
    let search = operations.find(o => o.type === type);
    search.operation(body, cb, cbError);
}

const response = { status: 200, msg: '' }

const createTask = (body, cb, cbError) => {
    try {
        let data = _getData()
        data.push({ ...body, id: new Date().getTime() });
        _setData(data);
        cb({ ...response, msg: 'Tarea agregada' });
    } catch (e) {
        cbError({ status: 500, msg: e.message })
    }
}

const readTask = (body, cb, cbError) => {
    try {
        let monthData = _getData().filter(task => task.year == body.year && task.month == body.month);
        cb({ ...response, msg: 'Tareas listadas', data: monthData });
    } catch (e) {
        cbError({ status: 500, msg: e.message })
    }
}

const updateTask = (body, cb, cbError) => {
    try {
        let data = _getData();
        let done = false;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == body.id) {
                data[i] = { ...body };
                done = true;
                break;
            }
        }
        if (!done) {
            throw new Error('Tarea no encontrada');
        }
        _setData(data);
        cb({ ...response, msg: 'Tarea actualizada' });
    } catch (e) {
        cbError({ status: 500, msg: e.message })
    }
}

const deleteTask = (body, cb, cbError) => {
    try {
        let data = _getData().filter(task => task.id != body.id);
        _setData(data);
        cb({ ...response, msg: 'Tarea eliminada' });
    } catch (e) {
        cbError({ status: 500, msg: e.message })
    }
}

const _getData = () => {
    let data = localStorage.tasks || '[]';
    return JSON.parse(data);
}

const _setData = (data) => {
    localStorage.tasks = JSON.stringify(data);
}