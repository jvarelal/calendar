import React from 'react'
import { goToTheTop } from '../../commons/util/func'

const TableWithHeader = ({ headers, className, children }) => {
    const widthCell = Math.trunc(100 / headers.length) + '%';
    return <table className="tbl text-center">
        <thead className={className}>
            <tr>
                {headers.map((header, index) => <th key={index} style={{ width: widthCell }}>
                    <span className="normal-th">{header}</span><span className="sm-th">{header[0]}</span>
                </th>)}
            </tr>
        </thead>
        {children}
    </table>
}

const CalendarCell = ({ day }) => <div className="space">
    {day.tasks && day.tasks.length > 0 ? <div className="flag"></div> : null}
    <h2 className="lighter m-auto">
        {day.fullDate.day} {day.saint.holiday ? <i style={{ fontSize: '1.25rem' }}
            className={day.saint.holiday.icon + ' m-2'} title={day.saint.holiday.title} /> : ''}
    </h2>
    {day.week ? <div className="week">{day.week}</div> : null}
    <p className="m-auto ptb-4 text-sm saint">{day.saint.name}</p>
</div>

const AlertFooter = ({ colSpan, alert, onClose }) => <tfoot>
    <tr>
        <td colSpan={colSpan}>
            {alert.show ? <div className="text-alert" onClose={onClose} dismissible>
                {alert.msg}
            </div> : null}
        </td>
    </tr>
</tfoot>

const MonthBackForward = ({ back, forward }) => {
    let style = { color: 'inherit', borderRadius: '0px' }
    const goBack = () => {
        goToTheTop();
        back();
    }
    const goForward = () => {
        goToTheTop();
        forward();
    }
    return <div className="btn-group w100">
        <button className="w50 btn"
            style={style}
            onClick={goBack}
            onDragEnter={() => setTimeout(goBack, 800)}>
            <i className="fas fa-chevron-circle-left" /> Mes anterior
            </button>
        <button className="w50 btn"
            style={style}
            onClick={goForward}
            onDragEnter={() => setTimeout(goForward, 800)}>
            Mes siguiente <i className="fas fa-chevron-circle-right" />
        </button>
    </div>
}

const DivColorOption = ({ id, text, onClick }) => <div
    className="select-option flex-center"
    onMouseOver={e => onClick(id)}>
    <div className={'mini-square ' + id}></div>
    <div className="mr-auto">{text}</div>
</div>

const ButtonNewTask = ({ onClick }) => <div className="col">
    <button className="w100 btn btn-primary" onClick={onClick}>
        <i className="fas fa-plus" />
    </button>
</div>

const DropCard = ({ title, variant, onDragStart, onDrop, children, expanded = false }) => {
    const [showDetail, setShowDetail] = React.useState(expanded)
    return <div className={'card card-note ' + variant}
        draggable={onDragStart ? true : false}
        onDragStart={onDragStart}
        onDrop={onDrop}>
        <div className="card-header">
            <div className="flex-center">
                <div className="col"><strong>{title}</strong></div>
                <div className="col col4 text-right">
                    <button className="btn btn-sm" onClick={() => setShowDetail(!showDetail)}>
                        <i className={showDetail ? 'fas fa-chevron-circle-up' : 'fas fa-chevron-circle-down'} />
                    </button>
                </div>
            </div>
        </div>
        {showDetail ? children : null}
    </div>
}



export {
    TableWithHeader,
    CalendarCell,
    AlertFooter,
    MonthBackForward,
    DivColorOption,
    ButtonNewTask,
    DropCard
}