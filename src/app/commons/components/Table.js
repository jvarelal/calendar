import React from 'react'
import Notification from './Notification'

const Table = ({ headers, className, children }) => {
    const widthCell = Math.trunc(100 / headers.length) + '%';
    return <table className={`tbl ${className}`}>
        <thead>
            <tr>
                {headers.map((header, index) => <th key={index}
                    style={{ width: header.porcentage ? header.porcentage : widthCell }}>
                    <span className="normal-th">{header.text}</span>
                    {header.responsiveText ? <span className="sm-th">{header.responsiveText}</span> : null}
                </th>)}
            </tr>
        </thead>
        {children}
    </table>
}

const AlertFooter = ({ colSpan, alert, onClose }) => <tfoot>
    <tr>
        <td colSpan={colSpan}>
            {alert.show ? <div className="text-alert">
                <Notification.Dismissible title={alert.msg} onClose={onClose} iconClose="X" />
            </div> : null}
        </td>
    </tr>
</tfoot>

Table.AlertFooter = AlertFooter

export default Table