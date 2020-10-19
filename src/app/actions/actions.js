import TYPES from './types'
import service from '../service/service'

const modifyTasks = (task = {}, cb = () => null, cbError = () => null) => {
    let request = {
        type: task.id ? TYPES.UPDATE : TYPES.CREATE,
        body: task,
        cb: cb,
        cbError: cbError
    }
    service(request);
}

const readTasks = (date, cb = () => null, cbError = () => null) => {
    let request = {
        type: TYPES.READ,
        body: date,
        cb: (resp) => cb(resp.data),
        cbError: cbError
    }
    service(request);
}

const deleteTasks = (task= {}, date = {}, cb = () => null, cbError = () => null) => {
    let request = {
        type: task && task != null ? TYPES.DELETE.ID : TYPES.DELETE.DATE,
        body: {...date, ...task},
        cb: (resp) => cb(resp.data),
        cbError: cbError
    }
    console.log(request)
    service(request);
}

export { modifyTasks, readTasks, deleteTasks }