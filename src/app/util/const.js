import React from 'react'
import PropTypes from 'prop-types'

const ACCESS = {
    LOGIN: { ID: 1, NAME: 'Login' },
    REGISTER: { ID: 2, NAME: 'Registrarse' }
}

const LIST_ACCESS = [ACCESS.LOGIN, ACCESS.REGISTER]

const SYSDATE = new Date();

const MAXDATE = { year: SYSDATE.getFullYear() + 4, month: 11, day: 31 }

const DAYS_SP = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']

const MONTHS_SP = [
    'Enero', 'Febrero', 'Marzo',
    'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre',
    'Octubre', 'Noviembre', 'Diciembre'
];

const PAST = 'past';
const PRESENT = 'today';
const FUTURE = 'future';

const KEYCODES = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ENTER: 13,
    SUPR: 46,
    ESC: 27
}

const TASK = {
    name: '',
    color: 'white',
    detail: '',
    alarm: false,
    date: { hour: '00', minute: '00' },
    dismiss: false,
    done: false,
    creation: '',
    editions: []
}

const STATUS_TASK = {
    PENDING: 1,
    COMPLETE: 2,
    ALL: 3
}

const SELECT_STATUS_TASK = [
    { id: STATUS_TASK.PENDING, text: 'Fijadas' },
    { id: STATUS_TASK.COMPLETE, text: 'Completadas' },
    { id: STATUS_TASK.ALL, text: 'Todas' }

]

const GROUP_DASHBOARD = {
    id: 0,
    name: '',
    tasks: []
}

const DASHBOARD = {
    name: '',
    detail: '',
    groups: [],
    roles: []
}

const TEMPLATES = {
    DASHBOARD: {
        BASE: {
            ...DASHBOARD,
            name: 'PENDIENTES',
            detail: 'Mis pendientes',
            groups: [{ ...GROUP_DASHBOARD, name: 'MI LISTA', id: 1 }]
        }
    }
}

const ROLES = {
    AUTOR: 0,
    ADMIN: 1,
    MEMBER: 2
}

const OK_RESPONSE = { status: 200, message: '' }

const DATE_PROP_SHAPE = PropTypes.shape({
    day: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired
})

const GROUP_PROP_SHAPE = PropTypes.shape({
    name: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired
})

const DASHBOARD_PROP_SHAPE = PropTypes.shape({
    name: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
    roles: PropTypes.array.isRequired,
    groups: PropTypes.arrayOf(GROUP_PROP_SHAPE).isRequired,
    creation: PropTypes.string.isRequired
})

const TASK_PROP_SHAPE = PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
    alarm: PropTypes.bool.isRequired,
    date: PropTypes.shape({
        day: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
        year: PropTypes.number.isRequired,
        hour: PropTypes.string,
        minute: PropTypes.string
    }).isRequired,
    done: PropTypes.bool.isRequired,
    dashboard: PropTypes.shape({
        id: PropTypes.string.isRequired,
        idGroup: PropTypes.number.isRequired
    }).isRequired
})

const RGX = {
    ALL: /./,
    LETTERS: /^([a-zA-Z- ]*)$/,
    ALPHANUMERICAL1: /^([a-zA-Z0-9- ]*)$/,
    EMAIL: /^([a-zA-Z0-9-_.@ ]*)$/,
    NUMBERS: /^([0-9-]*)$/
}

const LOADING = <div className="container">
    <div className="flex-center m-9 ptb-9">
        <div className="m-auto ptb-9">
            <div className="loading" /> <br />Cargando...
        </div>
    </div>
</div>

export {
    ACCESS,
    LIST_ACCESS,
    SYSDATE,
    MAXDATE,
    DAYS_SP,
    MONTHS_SP,
    PAST,
    PRESENT,
    FUTURE,
    KEYCODES,
    TASK,
    STATUS_TASK,
    SELECT_STATUS_TASK,
    TEMPLATES,
    GROUP_DASHBOARD,
    DASHBOARD,
    DASHBOARD_PROP_SHAPE,
    DATE_PROP_SHAPE,
    TASK_PROP_SHAPE,
    RGX,
    ROLES,
    OK_RESPONSE,
    LOADING
}