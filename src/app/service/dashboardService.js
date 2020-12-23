import { db, FieldValue } from './firebase'
import { completeZero, replaceById } from '../util/func'
import { OK_RESPONSE } from '../util/const'

const dashboardService = {
    createDashboard: async (body, cb, cbError) => {
        try {
            let refDoc = await db.collection('dashboards').add({ ...body, creation: new Date().toISOString() })
            cb({ ...OK_RESPONSE, message: 'Tablero creado', data: refDoc })
        } catch (e) {
            console.log(e)
            cbError({ status: 500, message: e.message })
        }
    },
    readDashboards: (body, cb, cbError) => {
        try {
            db.collection('dashboards').where("members", "array-contains", body.email)
                .onSnapshot(querySnap => {
                    let data = [];
                    querySnap.forEach(doc => data.push({ ...doc.data(), id: doc.id }))
                    cb({ ...OK_RESPONSE, message: 'Tableros listados', data: data });
                })
        } catch (e) {
            cbError({ status: 500, message: e.message })
        }
    },
    updateDashboards: async (body, cb, cbError) => {
        try {
            await db.collection('dashboards').doc(body.id).update(body)
            cb({ ...OK_RESPONSE, message: 'Dashboard actualizado' });
        } catch (e) {
            cbError({ status: 500, message: e.message })
        }
    },
    deleteDashboard: async (body, cb, cbError) => {
        try {
            await db.collection('dashboards').doc(body.id).delete()
            cb({ ...OK_RESPONSE, message: 'Dashboard eliminado' });
        } catch (e) {
            cbError({ status: 500, message: e.message })
        }
    },
    updateGroup: async (body, cb, cbError) => {
        try {
            db.collection('dashboards').doc(body.id).update({ groups: body.groups })
            cb({ ...OK_RESPONSE, message: 'Dashboard actualizado' });
        } catch (e) {
            cbError({ status: 500, message: e.message })
        }
    },
    deleteGroup: (body, cb, cbError) => {
        let { dashboard, group } = body
        dashboard.groups = dashboard.groups.filter(g => g.id !== group.id)
        dashboardService.updateGroup(dashboard, cb, cbError)
    },
    editTask: async (body, cb, cbError) => {
        let task = body.task
        let idGroup = task.dashboard.idGroup
        try {
            let taskDb = setTaskDb(task)
            if (!task.taskId) {
                db.collection('taskDetail').add({ history: [taskDb.history] }).then(refDoc => {
                    let dashboard = insertTaskInDashboard(body.dashboard, idGroup, { ...taskDb.preview, taskId: refDoc.id })
                    dashboardService.updateGroup(dashboard, cb, cbError)
                })
            } else {
                let dashboard = insertTaskInDashboard(body.dashboard, idGroup, taskDb.preview)
                db.collection('taskDetail').doc(task.taskId).update({ history: FieldValue.arrayUnion(taskDb.history) })
                dashboardService.updateGroup(dashboard, cb, cbError)
            }
        } catch (e) {
            cbError({ status: 500, message: e.message })
        }
    },
    moveTask: (body, cb, cbError) => {
        let { dashboard, newIdGroup, idxTask, task } = body
        const prevIdGroup = task.idGroup
        for (let i = 0; i < dashboard.groups.length; i++) {
            if (dashboard.groups[i].id === prevIdGroup) {
                dashboard.groups[i].tasks = dashboard.groups[i].tasks.filter(t => t.taskId !== task.taskId)
            }
            if (dashboard.groups[i].id === newIdGroup) {
                dashboard.groups[i].tasks.splice(idxTask, 0, task);
            }
        }
        dashboardService.updateGroup(dashboard, cb, cbError)
    },
    deleteTask: (body, cb, cbError) => {
        let { dashboard, task } = body
        for (let i = 0; i < dashboard.groups.length; i++) {
            if (dashboard.groups[i].id === task.dashboard.idGroup) {
                dashboard.groups[i].tasks = dashboard.groups[i].tasks.filter(t => t.taskId !== task.taskId)
                break;
            }
        }
        dashboardService.updateGroup(dashboard, cb, cbError)
    }
}

const setTaskDb = task => {
    let date = task.date
    let preview = {
        userId: task.user.id,
        name: `${task.name}|${task.color}|${task.done}`,
        author: task.author || task.user.id,
        detail: task.detail,
        date: `${date.year}-${Number(date.month) + 1}-${date.day}` ||
            (task.alarm ? `T${completeZero(date.hour)}:${completeZero(date.minute)}${task.dismiss}` : '')
    }
    if (task.taskId) preview.taskId = task.taskId
    let history = {
        userId: task.user.id,
        user: task.user.email,
        createdAt: new Date().toISOString(),
        preview
    }
    return { preview, history }
}

const insertTaskInDashboard = (dashboard, idGroup, task) => {
    for (let i = 0; i < dashboard.groups.length; i++) {
        if (dashboard.groups[i].id === idGroup) {
            dashboard.groups[i].tasks = replaceById(dashboard.groups[i].tasks, task, 'taskId')
            break;
        }
    }
    return dashboard
}

export default dashboardService