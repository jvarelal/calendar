import { fragmentDate, evalueDate, getLastDayMonth } from '../../commons/util/func'
import { KEYCODES, SYSDATE, DAYS_SP, FUTURE, PAST } from '../../commons/util/const'

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

const getDaysInPanel = (date, tasks) => {
    const finalDayOfWeekPrevMonth = getLastDayMonth(date.year, Number(date.month) - 1).getDay();
    const lastDayMonth = getLastDayMonth(date.year, date.month);
    let days = [];
    let dayOfWeek = finalDayOfWeekPrevMonth + 1
    for (let day = 1; day <= lastDayMonth.getDate(); day++) {
        dayOfWeek = dayOfWeek === 7 ? 0 : dayOfWeek;
        days.push({
            day: day,
            dayOfWeek: dayOfWeek,
            able: evalueDate({ ...date, day: day }) !== PAST,
            tasks: sortTasksByPriority(tasks.filter(t => t.date.day === day))
        })
        dayOfWeek++;
    }
    return days;
}

const sortTasksByPriority = (tasks) => ({
    danger: tasks.filter(t => t.priority === 2) || [],
    warning: tasks.filter(t => t.priority === 1) || [],
    info: tasks.filter(t => t.priority === 0) || [],
})

const getCalendarTableByMonth = (date, tasks) => {
    const daysPrevMonth = getLastDayMonth(date.year, Number(date.month) - 1);
    const lastDayMonth = getLastDayMonth(date.year, date.month).getDate();
    let days = [];
    let day = daysPrevMonth.getDate() - daysPrevMonth.getDay()
    while (day <= daysPrevMonth.getDate() && daysPrevMonth.getDay() < 6) {
        _fillRowGrid(days, { day: day++, able: false, className: 'disable' });
    }
    for (let day = 1; day <= lastDayMonth; day++) {
        _fillRowGrid(days, {
            day: day,
            able: true,
            className: day === Number(date.day) ? 'selected' : evalueDate({ ...date, day: day }),
            tasks: tasks.filter(t => t.date.day === day)
        });
    }
    day = 1;
    while (days[days.length - 1].length % 7 > 0) {
        _fillRowGrid(days, { day: day++, able: false, className: 'disable' });
    }
    return days;
}

const _fillRowGrid = (daysRow = [], newDay = {}) => {
    if (daysRow.length > 0 && daysRow[daysRow.length - 1].length < DAYS_SP.length)
        daysRow[daysRow.length - 1].push(newDay);
    else
        daysRow.push([newDay]);
}

const keyBoardMove = (kbOperation) => {
    try {
        let date = kbOperation.date
        switch (kbOperation.keyCode) {
            case KEYCODES.LEFT:
                return kbOperation.arrowsKey(fragmentDate(new Date(date.year, date.month, Number(date.day) - 1)))
            case KEYCODES.UP:
                return kbOperation.arrowsKey(fragmentDate(new Date(date.year, date.month, Number(date.day) - 7)))
            case KEYCODES.RIGHT:
                return kbOperation.arrowsKey(fragmentDate(new Date(date.year, date.month, Number(date.day) + 1)))
            case KEYCODES.DOWN:
                return kbOperation.arrowsKey(fragmentDate(new Date(date.year, date.month, Number(date.day) + 7)))
            case KEYCODES.ENTER:
                if (evalueDate(date) === PAST)
                    throw new Error('* Solo se pueden asignar notas a fechas posteriores a la actual')
                return kbOperation.enterKey();
            case KEYCODES.SUPR:
                if (evalueDate(date) !== FUTURE)
                    throw new Error('* No se pueden eliminar notas de la fecha actual o anteriores')
                let taskByDate = kbOperation.tasks.filter(t => t.date.year === date.year &&
                    t.date.month === date.month &&
                    t.date.day === date.day)
                if (taskByDate.length > 0)
                    return kbOperation.suprKey(taskByDate);
                break;
            default:
                return null;
        }
    } catch (e) {
        return kbOperation.errorBoard({ show: true, msg: e.message })
    }
}

const handleDrop = (e, newDate, task, getModalMessage, updateTask) => {
    let className = e.target.className
    let newPriority;
    switch (true) {
        case className.indexOf('danger') >= 0:
            newPriority = 2;
            break;
        case className.indexOf('warning') >= 0:
            newPriority = 1;
            break;
        case className.indexOf('info') >= 0:
            newPriority = 0;
            break;
        default:
            newPriority = task.priority;
            break;
    }
    if (evalueDate(newDate) === PAST || evalueDate(task.date) === PAST) {
        return getModalMessage('Editar nota', 'No se pueden asignar o afectar notas de fechas anteriores')
    }
    if (task.priority !== newPriority || task.date.day !== newDate.day) {
        let nTask = { ...task, priority: newPriority, dismiss: false, date: newDate }
        return updateTask(nTask);
    }
}

export {
    addNewYearToList,
    getTaskByMonth,
    getTdByMonth,
    sortTasksByPriority,
    isDifferentYYMM,
    getDaysInPanel,
    getCalendarTableByMonth,
    keyBoardMove,
    handleDrop
}