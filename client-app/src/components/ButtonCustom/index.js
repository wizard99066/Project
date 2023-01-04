import Button from "antd/es/button"
import Spin from "antd/es/spin"

import React from "react"
import "./style.scss"
export const CustomButton = (props) => {
	const {
		type,
		children,
		size,
		fontSize,
		className,
		spinning = false,
		...otherProps
	} = props

	const colorType = type ?? ""
	const sizeType = size ?? "medium"
	const fontSizeType = fontSize ?? "16px"

	return (

	// <Spin spinning={spinning}>
		<Button
			{ ...otherProps }
			className={ `custom-button ${ colorType } ${ sizeType } ${ className }` }
		>
			{ children }
		</Button>

	// </Spin>
	)
}
export default CustomButton
