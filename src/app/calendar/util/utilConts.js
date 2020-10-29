import PropTypes from 'prop-types'

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

const TASK = {
    name: '',
    priority: 0,
    detail: '',
    alarm: false,
    date: {},
    dismiss: false
}

const TASK_CONFIG = {
    EDIT_PAST: false
}

const DATE_PROP_SHAPE = PropTypes.shape({
    day: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired
})

const TASK_PROP_SHAPE = PropTypes.shape({
    name: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
    detail: PropTypes.string.isRequired,
    alarm: PropTypes.bool.isRequired,
    date: PropTypes.shape({
        day: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
        year: PropTypes.number.isRequired,
        hour: PropTypes.string.isRequired,
        minute: PropTypes.string.isRequired
    }).isRequired,
    dismiss: PropTypes.bool.isRequired
})

export {
    SYSDATE,
    DAYS_SP,
    MONTHS_SP,
    PAST,
    PRESENT,
    FUTURE,
    PRIORITIES,
    KEYCODES,
    TASK,
    DATE_PROP_SHAPE,
    TASK_PROP_SHAPE,
    TASK_CONFIG
}