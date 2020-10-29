import { fragmentDate, evalueDate } from './utilFunc'
import { KEYCODES, DAYS_SP, FUTURE, PAST } from './utilConts'

const getLastDayMonth = (year, month) => new Date(year, Number(month) + 1, 0)

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
                    throw new Error('* Solo se pueden asignar tareas a fechas posteriores a la actual')
                return kbOperation.enterKey();
            case KEYCODES.SUPR:
                if (evalueDate(date) !== FUTURE)
                    throw new Error('* No se pueden eliminar tareas de la fecha actual o anteriores')
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

export { getDaysInPanel, getLastDayMonth, getCalendarTableByMonth, keyBoardMove }