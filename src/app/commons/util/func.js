import { SYSDATE, FUTURE, PRESENT, PAST } from './const'

const goToTheTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

const completeZero = (number) => Number(number) < 10 ? '0' + number : number;

const fillNumberList = (begin, end) => {
    let list = [];
    if (begin > end)
        throw new Error('Lista invalida')
    if (typeof begin !== 'number' || typeof end !== 'number') {
        throw new Error('Parametros invalidos')
    }
    for (let number = begin; number <= end; number++) {
        list.push(number);
    }
    return list;
}

const fragmentDate = (date) => ({ year: date.getUTCFullYear(), month: date.getMonth(), day: date.getDate() })

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

const colorPriority = (priority) => priority === 2 ? 'danger' : (priority === 1 ? 'warning' : 'info')

const stringJsonDate = (date) => {
    let day = completeZero(date.day);
    let month = completeZero(Number(date.month) + 1);
    let year = completeZero(Number(date.year));
    return `${day}/${month}/${year}`
}

const getLastDayMonth = (year, month) => new Date(year, Number(month) + 1, 0)

const getMinDay = (minDate, startDate) => {
    let minDay = minDate.day < startDate.day ? minDate.day : startDate.day;
    if (minDate.year !== startDate.year || startDate.month > minDate.month) {
        minDay = 1
    }
    return minDay;
}

const getMaxDay = (maxDate, startDate) => {
    let maxDay = maxDate.day > startDate.day ? maxDate.day : startDate.day;
    if (maxDate.year !== startDate.year || startDate.month < maxDate.month) {
        maxDay = getLastDayMonth(startDate.year, startDate.month).getDate()
    }
    return maxDay;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export {
    goToTheTop,
    completeZero,
    fillNumberList,
    fragmentDate,
    evalueDate,
    getNotifications,
    notificationsBySecond,
    colorPriority,
    stringJsonDate,
    getLastDayMonth,
    getMinDay,
    getMaxDay,
    getRandomNumber,
    validateEmail
}