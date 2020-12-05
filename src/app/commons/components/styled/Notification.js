import React from 'react'

const Notification = ({title, text, onClose}) => {
	return <div className="notification">
		<div className="notification-header">
			<div>{title}</div>
			<span className="btn btn-sm" onClick={e => onClose()}>
				X
			</span>
		</div>
		<div className="notication-body">{text}</div>
	</div>
}

export default Notification
