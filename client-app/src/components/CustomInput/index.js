import React from 'react'
import {
	Input
}from 'antd'

import './style.css'

export const CustomInput = (props) => {
	const { className, type, ...otherProps } = props

	const returnComponent = () => {
		switch (type){
			case "password":
				return (<Input.Password
					{ ...otherProps }
					className={ `custom-input ${ className }` }
				        />)
			case "search":
				return (<Input.Search
					{ ...otherProps }
					className={ `custom-input ${ className }` }
				        />)
			default:
				return (<Input
					{ ...otherProps }
					className={ `custom-input ${ className }` }
				        />)
		}
	}

	return returnComponent()
}
