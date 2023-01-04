import React from 'react'
import {
	Card, Row, Col
}from 'antd'
import './style.css'

const CustomMenu = ({ children, defaultSelectedKey, selectedKey, className = '' }) => {
	return (
		<Row className={ `custom-menu ${ className }` }>
			{
				children?.map(x => {
					if (selectedKey == x?.key)
						return React.cloneElement(x, { className: " active" })
					return x
				})
			}
		</Row>
	)
}
export default CustomMenu