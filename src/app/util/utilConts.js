const SYSDATE = new Date();

const DAYS_SP = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']

const MONTHS_SP = [
    'Enero', 'Febrero', 'Marzo',
    'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre',
    'Octubre', 'Noviembre', 'Diciembre'
];

const PAST = 'past';
const PRESENT = 'today';
const FUTURE = 'future';

const PRIORITIES = ['Baja', 'Media', 'Alta'];

const KEYCODES = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ENTER: 13,
    SUPR: 46
}

const TASK_MANAGER = {
    EDITOR: 1,
    ERASER: 2
}


export {
    SYSDATE,
    DAYS_SP,
    MONTHS_SP,
    PAST,
    PRESENT,
    FUTURE, 
    PRIORITIES,
    KEYCODES,
    TASK_MANAGER
}