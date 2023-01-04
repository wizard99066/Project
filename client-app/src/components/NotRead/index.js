import React from 'react'
import './style.css'

const NotRead = ({ children, left = '', right = '15%', top = '' }) => {
	return (
		<div
			className="dont-read"
			style={ {
				right,
				left,
				top
			} }
		>
			{ children }
		</div>

	)
}
export default NotRead