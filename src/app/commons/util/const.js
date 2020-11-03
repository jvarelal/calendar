import PropTypes from 'prop-types'

const THEMES = [
    {
        NAME: 'Wood',
        CREATOR: 'https://cargocollective.com/whydontwetry',
        NAV: {
            VARIANT: 'dark',
            CSS: { background: 'black' }
        }
    },
    {
        NAME: 'Illusionist',
        CREATOR: 'http://julien-bailly.com/',
        NAV: {
            VARIANT: 'dark',
            CSS: { background: '#4d4d95' }
        }
    },
    {
        NAME: 'Mosaic',
        CREATOR: 'http://julien-bailly.com/',
        NAV: {
            VARIANT: 'dark',
            CSS: { background: 'black' }
        }
    },
    {
        NAME: 'Alchemy',
        CREATOR: 'http://repponen.com/',
        NAV: {
            VARIANT: 'dark',
            CSS: { background: 'orange' }
        }
    },
    {
        NAME: 'Ahoy',
        CREATOR: 'https://www.behance.net/lorena-g',
        NAV: {
            VARIANT: 'dark',
            CSS: { background: '#f4a8b5' }
        }
    },
    {
        NAME: 'Asteroids',
        CREATOR: 'https://noumevon.com/',
        NAV: {
            VARIANT: 'dark',
            CSS: { background: 'darkblue' }
        }
    },
    {
        NAME: 'Brijan',
        CREATOR: 'https://twitter.com/brijanp',
        NAV: {
            VARIANT: 'dark',
            CSS: { background: '#229722' }
        }
    },
    {
        NAME: 'Bicycles',
        CREATOR: 'http://shaunfox.com/',
        NAV: {
            VARIANT: 'dark',
            CSS: { background: 'rgb(91, 90, 90)' }
        }
    },
    {
        NAME: 'Autumn',
        CREATOR: 'https://daileycrafton.com/',
        NAV: {
            VARIANT: 'dark',
            CSS: { background: '#ae443c' }
        }
    },
    {
        NAME: 'Kitty',
        CREATOR: 'http://thepatternlibrary.com/#kitty',
        NAV: {
            VARIANT: 'dark',
            CSS: { background: '#f4a8b5' }
        }
    },
    {
        NAME: 'Glitch',
        CREATOR: 'https://twitter.com/destroywerk',
        NAV: {
            VARIANT: 'dark',
            CSS: { background: 'rgb(101, 176, 127)' }
        }
    },
    {
        NAME: 'Cuadros',
        CREATOR: 'https://twitter.com/nataliadfrutos',
        NAV: {
            VARIANT: 'light',
            CSS: { background: 'rgba(255,255,255,0.8)' }
        }
    },
    {
        NAME: 'Celebration',
        CREATOR: 'https://twitter.com/prabhuk1986',
        NAV: {
            VARIANT: 'dark',
            CSS: { background: '#2d2d4f' }
        }
    }
]

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
const VARIANTS = ['danger', 'warning', 'info']

const ACCESS = {
    REGISTER: 1,
    LOGIN: 2
}

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
    dismiss: false,
    done: false,
    creation: '',
    lastEdition: ''
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
    dismiss: PropTypes.bool.isRequired,
    creation: PropTypes.string.isRequired,
    lastEdition: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired
})

export {
    THEMES,
    SYSDATE,
    DAYS_SP,
    MONTHS_SP,
    PAST,
    PRESENT,
    FUTURE,
    PRIORITIES,
    KEYCODES,
    TASK,
    ACCESS,
    DATE_PROP_SHAPE,
    TASK_PROP_SHAPE,
    VARIANTS
}