import React from 'react'
import PropTypes from 'prop-types'

const THEMES = [
    {
        NAME: 'White',
        CREATOR: ''
    },
    {
        NAME: 'Wood',
        CREATOR: 'https://cargocollective.com/whydontwetry'
    },
    {
        NAME: 'Illusionist',
        CREATOR: 'http://julien-bailly.com/'
    },
    {
        NAME: 'Alchemy',
        CREATOR: 'http://repponen.com/'
    },
    {
        NAME: 'Ahoy',
        CREATOR: 'https://www.behance.net/lorena-g'
    },
    {
        NAME: 'Asteroids',
        CREATOR: 'https://noumevon.com/'
    },
    {
        NAME: 'Kitty',
        CREATOR: 'http://thepatternlibrary.com/#kitty'
    },
    {
        NAME: 'Glitch',
        CREATOR: 'https://twitter.com/destroywerk'
    },
    {
        NAME: 'Cuadros',
        CREATOR: 'https://twitter.com/nataliadfrutos'
    },
    {
        NAME: 'Celebration',
        CREATOR: 'https://twitter.com/prabhuk1986'
    }
]

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

const COLORS = [
    { id: 'white', text: 'Blanco Translucido' },
    { id: 'blue', text: 'Azul' },
    { id: 'yellow', text: 'Amarillo' },
    { id: 'pink', text: 'Rosa' },
    { id: 'green', text: 'Verde' },
    { id: 'orange', text: 'Naranja' },
    { id: 'purple', text: 'Morado' }
];

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
    color: COLORS[0].id,
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
    { id: STATUS_TASK.PENDING, text: 'Pendientes' },
    { id: STATUS_TASK.COMPLETE, text: 'Completadas' },
    { id: STATUS_TASK.ALL, text: 'Todas' }

]

const GROUP_DASHBOARD = {
    id: 0,
    name: '',
    tasks: [],
    creation: '',
    editions: []
}

const DASHBOARD = {
    name: '',
    detail: '',
    groups: [],
    orderGroup: [],
    creation: '',
    vertical: 0
}

const TEMPLATES = {
    DASHBOARD: {
        BASE: {
            ...DASHBOARD,
            name: 'PENDIENTES',
            detail: 'Mis pendientes',
            groups: [{ ...GROUP_DASHBOARD, name: 'MI LISTA', id: 1 }],
            orderGroup: [1]
        }
    }
}

const DATE_PROP_SHAPE = PropTypes.shape({
    day: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired
})

const GROUP_PROP_SHAPE = PropTypes.shape({
    name: PropTypes.string.isRequired,
    tasks: PropTypes.array.isRequired,
    creation: PropTypes.string.isRequired,
    editions: PropTypes.array.isRequired,
})

const DASHBOARD_PROP_SHAPE = PropTypes.shape({
    name: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
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
        hour: PropTypes.string.isRequired,
        minute: PropTypes.string.isRequired
    }).isRequired,
    dismiss: PropTypes.bool.isRequired,
    creation: PropTypes.string.isRequired,
    editions: PropTypes.array.isRequired,
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
            <div className="loading" /> <br />Cargando
        </div>
    </div>
</div>

export {
    THEMES,
    SYSDATE,
    MAXDATE,
    DAYS_SP,
    MONTHS_SP,
    PAST,
    PRESENT,
    FUTURE,
    COLORS,
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
    LOADING
}