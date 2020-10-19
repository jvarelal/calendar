import { SYSDATE, PAST, PRESENT, FUTURE } from './utilConts'

const evalueTime = (date) => {
    if(date){
        let year = date.year
        let month = date.month
        let day = date.day
        if (year == SYSDATE.getFullYear() && month == SYSDATE.getMonth() && day == SYSDATE.getDate()) {
            return PRESENT;
        }
        if (year > SYSDATE.getFullYear()) {
            return FUTURE;
        }
        if (year == SYSDATE.getFullYear()) {
            if (month > SYSDATE.getMonth()) {
                return FUTURE;
            }
            if (month == SYSDATE.getMonth() && day > SYSDATE.getDate()) {
                return FUTURE;
            }
        }
    }
    return PAST;
}

const getLastDayMonth = (year, month) => new Date(year, Number(month) + 1, 0)

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

export { evalueTime, getLastDayMonth, fillNumberList, fragmentDate }