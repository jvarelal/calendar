import { SYSDATE, FUTURE, PRESENT, PAST } from './const'
import { THEMES } from './themes'
import square from '../../assets/img/squares.png'

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
    let notifications = tasks.filter(t => t.alarm &&
        evalueDate(t.date) === PRESENT &&
        validateAlarm(time, t.date) &&
        !t.dismiss)
    notifyMe(notifications)
    return notifications
}

const notifyMe = (tasks) => {
    let display = () => tasks.forEach(t => {
        new Notification(`Agenda - ${t.name} [${completeZero(t.date.hour)}:${completeZero(t.date.minute)}]`, {
            body: t.detail || 'Recordatorio',
            icon: square
        })
    })
    if (Notification.permission === "granted") {
        display()
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission(permission => {
            if (permission === "granted") {
                display()
            }
        });
    }
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

const jsonToDate = (jsonDate) => new Date(jsonDate.year, jsonDate.month, jsonDate.day)

const getWeek = (jsonDate) => {
    let dt = jsonToDate(jsonDate);
    var tdt = new Date(dt.valueOf());
    var dayn = (dt.getDay() + 6) % 7;
    tdt.setDate(tdt.getDate() - dayn + 3);
    var firstThursday = tdt.valueOf();
    tdt.setMonth(0, 1);
    if (tdt.getDay() !== 4) {
        tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - tdt) / 604800000);
}

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}


const insertArrayWithId = (array = [], element = {}) => {
    if (array.length === 0) {
        return [{ ...element, id: 1 }]
    }
    let ids = array.map(o => Number(o.id));
    let nextId = Math.max(...ids) + 1;
    return [...array, { ...element, id: nextId }]
}

const replaceById = (array = [], element = {}, nameId = 'id') => {
    let nArray = [...array]
    let replaced = false
    for (let i = 0; i < nArray.length; i++) {
        if (nArray[i][nameId] === element[nameId]) {
            nArray[i] = element
            replaced = true
        }
    }
    if (!replaced) {
        nArray = [...nArray, element]
    }
    return nArray;
}

const sortByList = (array = [], list = []) => {
    let newArray = []
    list.forEach(id => {
        let element = array.find(e => e.id === id)
        if (element) newArray.push(element)
    })
    let remainArray = array.filter(e => !list.includes(e.id))
    return [...remainArray, ...newArray];
}

const lpadArray = (array, number) => {
    const module = array.length % number
    if (module === 0)
        return array
    return [...new Array(number - module), ...array]
}

const rpadArray = (array, number) => {
    const module = array.length % number
    if (module === 0)
        return array
    return [...array, ...new Array(number - module)]
}

const moveInArray = (array, indexTarget, newIndex) => {
    let nArray = [...array]
    nArray.splice(newIndex, 0, nArray.splice(indexTarget, 1)[0]);
    return nArray;
}

const onDragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
}

const validateEmail = (email) => {
    let validation = { error: !/\S+@\S+\.\S+/.test(email) }
    if (validation.error) validation.msg = 'Email invalido'
    return validation;
}

const getTheme = () => {
    let user = getUserLocalData()
    return THEMES[user.theme]
}

const setPrefence = preference => {
    let user = getUserLocalData()
    setUserLocalData({ ...user, ...preference })
}

const getUserLocalData = () => {
    let local = localStorage.notas;
    return local ? JSON.parse(local) : {
        theme: getRandomNumber(0, THEMES.length - 1),
        backgroundCards: false
    }
}

const setUserLocalData = (data) => {
    localStorage.notas = JSON.stringify({
        theme: data.theme !== undefined && data.theme !== null ? data.theme : getRandomNumber(0, THEMES.length - 1),
        backgroundCards: data.backgroundCards || false
    })
}

const onTextChange = (e, rg, setValue, upperCase) => {
    let input = e.target;
    let value = input.value && upperCase ? input.value.toUpperCase() : input.value
    if ((!value || (rg.test(input.value) &&
        (input.value.length <= input.maxLength))) && (input.value.trim() !== '' || input.value.length === 0)) {
        return setValue(value ? value : '')
    }
}

const expandTask = taskDb => {
    try {
        let title = taskDb.name.split('|')
        let timestamp = taskDb.date.split('T')
        let dateElements = timestamp[0].split('-')
        let date = {
            year: Number(dateElements[0]),
            month: Number(dateElements[1]) - 1,
            day: Number(dateElements[2])
        }
        if (timestamp.length > 1) {
            let timeElements = timestamp[1].split(':')
            date.hour = timeElements[0]
            date.minute = timeElements[1]
        }
        return {
            taskId: taskDb.taskId,
            name: title[0],
            color: title[1],
            done: title[2] === 'true',
            detail: taskDb.detail,
            author: taskDb.author,
            date: date,
            userId: taskDb.author,
            alarm: timestamp.length > 1
        }
    } catch (e) {
        return {}
    }
}

/*
const onAlphaChange = evento => {
    let input = evento.target;
    let rg = /^([a-zA-Z0-9-@. ]*)$/
    if (rg.test(input.value)
        && (this.state[input.name].length < input.maxLength || input.value.length <= input.maxLength))
        return this.setState({ [input.name]: input.value ? input.value.toUpperCase() : '' })
}

const onNumberChange = evento => {
    let input = evento.target;
    let rg = /^([0-9-]*)$/
    if (rg.test(input.value)
        && (this.state[input.name].length < input.maxLength || input.value.length <= input.maxLength))
        return this.setState({ [input.name]: input.value ? input.value.toUpperCase() : '' })
}
*/
export {
    goToTheTop,
    completeZero,
    fillNumberList,
    fragmentDate,
    evalueDate,
    getNotifications,
    notificationsBySecond,
    stringJsonDate,
    getLastDayMonth,
    getMinDay,
    getMaxDay,
    jsonToDate,
    getWeek,
    getRandomNumber,
    lpadArray,
    rpadArray,
    sortByList,
    onDragOver,
    moveInArray,
    validateEmail,
    insertArrayWithId,
    replaceById,
    getTheme,
    getUserLocalData,
    setUserLocalData,
    setPrefence,
    expandTask,
    onTextChange
}