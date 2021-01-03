import React from 'react'
import CalendarHelp from '../../task/components/calendar/CalendarHelp'

const Help = () => {
    const style = { maxWidth: '950px', background: 'rgba(255,255,255, 0.75)', margin: 'auto' }
    return <div className="container" style={style}>
        <CalendarHelp />
    </div>
}


export default Help