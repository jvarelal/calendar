import React from 'react'

const Notification = ({ title, text, onClose }) => {
	return <div className="notification">
		<div className="notification-header">
			<Dismissible title={title} onClose={onClose} iconClose='X' />
		</div>
		<div className="notification-body text-sm text-muted">
			<p>{text}</p>
		</div>
	</div>
}

const Dismissible = ({ title, iconClose, onClose }) => <div className="flex-center">
	<div>{title}</div>
	<span className="btn btn-sm" onClick={() => onClose()} style={{ border: 'none' }}>
		{iconClose}
	</span>
</div>

Notification.Dismissible = Dismissible

export default Notification
