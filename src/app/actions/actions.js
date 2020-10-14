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

const readTasks = (year, month, cb = () => null, cbError = () => null) => {
    let request = {
        type: TYPES.READ,
        body: { year: year, month: month },
        cb: (resp) => cb(resp.data),
        cbError: cbError
    }
    service(request);
}

export { modifyTasks, readTasks }