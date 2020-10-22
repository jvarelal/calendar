import { SYSDATE, PAST, PRESENT, FUTURE } from './utilConts'

const evalueDate = (date) => {
    if (date) {
        let year = date.year
        let month = date.month
        let day = date.day
        if (year === SYSDATE.getFullYear() && month === SYSDATE.getMonth() && day === SYSDATE.getDate()) {
            return PRESENT;
        }
        if (year > SYSDATE.getFullYear()) {
            return FUTURE;
        }
        if (year === SYSDATE.getFullYear()) {
            if (month > SYSDATE.getMonth()) {
                return FUTURE;
            }
            if (month === SYSDATE.getMonth() && day > SYSDATE.getDate()) {
                return FUTURE;
            }
        }
    }
    return PAST;
}

const validateAlarm = (time, date) => {
    let fragment = time.split(':')
    let hour = fragment[0]
    let minute = fragment[1]
    if (Number(hour) > Number(date.hour) ||
        (Number(hour) === Number(date.hour) && Number(minute) >= Number(date.minute))) {
        return true
    }
    return false
}

const getNotifications = (tasks, time = new Date().toLocaleTimeString()) => {
    return tasks.filter(t => t.alarm && validateAlarm(time, t.date) && !t.dismiss)
}

const notificationsBySecond = (setNotifications, tasks) => {
    let timer = setInterval(() => {
        let newTime = new Date().toLocaleTimeString()
        let fragment = newTime.split(':')
        if (fragment[fragment.length - 1] === '00') {
            setNotifications(getNotifications(tasks))
        }
    }, 1000)
    return function cleanup() {
        clearInterval(timer);
    }
}

const fillNumberList = (begin, end) => {
    let list = [];
    if (begin > end)
        throw new Error('Lista invalida')
    for (let number = begin; number <= end; number++) {
        list.push(number);
    }
    return list;
}

const fragmentDate = (date) => ({ year: date.getUTCFullYear(), month: date.getMonth(), day: date.getDate() })

const colorPriority = (priority) => priority === 2 ? 'danger' : (priority === 1 ? 'warning' : 'info')

export { evalueDate, fillNumberList, fragmentDate, colorPriority, validateAlarm, getNotifications, notificationsBySecond }