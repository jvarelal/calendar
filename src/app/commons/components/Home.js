import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    const [axisY, setAxisY] = React.useState(0)
    const handleScroll = () => setAxisY(window.pageYOffset)
    const styleLink = { display: 'block', textAlign: 'center' }
    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return <div>
        <div className="flex-center">
            <div className="start-text">
                <div className="start-info">
                    <h3 className="text-center">Agenda tus actividades </h3>
                    <p>
                        Selecciona una fecha especifica en tu calendario y genera las notas
                        que requieras para alistar tus actividades con la posibilidad
                        de recordatorios a la hora que especifiques.
                       </p>
                    <Link to="/calendar" className="btn btn-primary" style={styleLink}>
                        <i className="fas fa-arrow-right" /> Comenzar
                    </Link>
                </div>
            </div>
            <div className="start-img-r" style={{ transform: `translateX(-${axisY * .75}px)` }} />
        </div>
        <div className="flex-center">
            <div className="start-img-l" style={{ transform: `translateX(-${getPercentageX(0, 0.49, axisY * 1.2)}px)` }} />
            <div className="start-text ml-auto">
                <div className="start-info">
                    <h3 className="text-center">Enlista tus pendientes</h3>
                    <p>
                        Redacta tus pendientes y visualizalos
                        en los tableros y grupos que tu definas para su
                        clasificación.
                    </p>
                    <Link to="/dashboard" className="btn btn-primary" style={styleLink}>
                        <i className="fas fa-arrow-right" /> Comenzar
                    </Link>
                </div>
            </div>
        </div>
    </div>
}

const getPercentageX = (min, max, advanceY) => {
    try {
        let width = window.innerWidth
        let scrollTop = window.scrollY;
        let docHeight = document.getElementsByClassName('wrapper')[0].offsetHeight
        let winHeight = window.innerHeight;
        let scrollPercent = scrollTop / (docHeight - winHeight);
        let maxWidth = max * width
        const axisStart = (max - min) * width * scrollPercent
        return axisStart >= maxWidth ? maxWidth : axisStart
    } catch (e) {
        return 0
    }
}

export default Home
