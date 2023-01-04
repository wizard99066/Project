import React, {
	useState
}from 'react'
import {
	Select
}from 'antd'
import 'antd/lib/select/style/index.css'
import './style.css'

const ArrowSelect = (
	<svg
		height="7"
		viewBox="0 0 14 7"
		width="14"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M8.94421 6.11694L13.148 1.91036C13.3059 1.73582 13.3905 1.50728 13.3845 1.27205C13.3784 1.03682 13.2822 0.812918 13.1156 0.646708C12.949 0.480497 12.7249 0.384705 12.4897 0.379164C12.2544 0.373624 12.0261 0.458758 11.8519 0.616943L7.64804 4.82078C7.47614 4.99263 7.24302 5.08916 6.99996 5.08916C6.75689 5.08916 6.52377 4.99263 6.35187 4.82078L2.14804 0.616943C1.97604 0.44506 1.7428 0.348547 1.49963 0.348633C1.25647 0.348719 1.0233 0.445398 0.851413 0.617402C0.67953 0.789406 0.583016 1.02264 0.583102 1.26581C0.583189 1.50897 0.679867 1.74214 0.851871 1.91403L5.05571 6.11694C5.57141 6.63249 6.27075 6.92211 6.99996 6.92211C7.72916 6.92211 8.4285 6.63249 8.94421 6.11694Z"
			fill="#5C5F62"
		/>
	</svg>
)

export const CustomSelect = (props) => {
	const { children, className, onChange: onChangeFromProps, showArrow, value: InputValue, readOnly, onSearch: onSeacrhFromProps, ...otherProps } = props
	const [value, setValue] = useState(null)
	const [searchValue, setSearchValue] = useState(null)
	const onChange = (value, target) => {
		if (!readOnly){
			setValue(value)
			if (onChangeFromProps)
				onChangeFromProps(value, target)
		}
	}
	const onSearch = (value) => {
		if (!readOnly){
			setSearchValue(value)
			if (onSeacrhFromProps)
				onSeacrhFromProps(value)
		}
	}
	return (
		<Select
			className={ `custom-select ${ className ?? '' } ` }
			showArrow={ !value && !InputValue && !searchValue }
			value={ InputValue }
			onChange={ onChange }
			onSearch={ onSearch }
			{ ...otherProps }
			suffixIcon={ ArrowSelect }
		>
			{ children }
		</Select>
	)
}
