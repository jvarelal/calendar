import { SYSDATE, PAST, PRESENT, FUTURE } from './utilConts'

const evalueDate = (date) => {
    if (date) {
        let year = Number(date.year)
        let month = Number(date.month)
        let day = Number(date.day)
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
        (Number(hour) === Number(date.hour) &&
            Number(minute) >= Number(date.minute))) {
        return true
    }
    return false
}

const getNotifications = (tasks, time = new Date().toLocaleTimeString()) => {
    return tasks.filter(t => t.alarm && validateAlarm(time, t.date) && !t.dismiss)
}

const notificationsBySecond = (setNotifications, tasks, setTime) => {
    let timer = setInterval(() => {
        let newTime = new Date().toLocaleTimeString()
        let fragment = newTime.split(':')
        setTime(newTime)
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
    if(typeof begin !== 'number' || typeof end !== 'number'){
        throw new Error('Parametros invalidos')
    }
    for (let number = begin; number <= end; number++) {
        list.push(number);
    }
    return list;
}

const fragmentDate = (date) => ({ year: date.getUTCFullYear(), month: date.getMonth(), day: date.getDate() })

const colorPriority = (priority) => priority === 2 ? 'danger' : (priority === 1 ? 'warning' : 'info')

const addNewYearToList = (date = {}, yearslist = []) => {
    if (date.year < yearslist[0]) {
        yearslist = [date.year, ...yearslist]
    }
    if (date.year > yearslist[yearslist.length - 1]) {
        yearslist = [...yearslist, date.year]
    }
    return yearslist;
}

const getTaskByMonth = (tasks = [], date = {}) => {
    return tasks.filter(task => {
        let d = task.date
        return d.year === date.year && d.month === date.month
    });
}

const getTdByMonth = (prevTasks = [], date = {}, tasksByMonth = []) => {
    if (Number(date.year) === SYSDATE.getFullYear()
        && Number(date.month) === SYSDATE.getMonth()) {
        prevTasks = tasksByMonth.filter(task => Number(task.date.day) === SYSDATE.getDate())
    }
    return prevTasks;
}

const isDifferentYYMM = (date, newDate) => Number(newDate.year) !== Number(date.year) ||
    Number(newDate.month) !== Number(date.month)

const goToTheTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  } 

export {
    evalueDate,
    fillNumberList,
    fragmentDate,
    colorPriority,
    validateAlarm,
    getNotifications,
    notificationsBySecond,
    addNewYearToList,
    getTaskByMonth,
    getTdByMonth,
    isDifferentYYMM,
    goToTheTop
}