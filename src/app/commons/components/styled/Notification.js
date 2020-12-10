import React from 'react'

const Notification = ({ title, text, onClose }) => {
	return <div className="notification">
		<div className="notification-header">
			<div className="flex-center">
				<div className="col">{title}</div>
				<div className="col col4 text-right">
					<span className="close" onClick={e => onClose()}>
						X
					</span>
				</div>
			</div>
		</div>
		<div className="notification-body text-sm text-muted">
			<p>{text}</p>
		</div>
	</div>
}

export default Notification
