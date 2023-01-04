import React, {
	useState
}from 'react'
import {
	useSelector
}from "react-redux"
import './style.css'

export const Filters = ({ isHidden, onClick, withText = true }) => {
	const [isMoreSearch, setIMS] = isHidden
	const isRu = useSelector((state) => state.globalReducer.isRu)

	return (
		<div
			className="filters"
			onClick={ () => {
				setIMS(!isMoreSearch)
				if (onClick)
					onClick()
			} }
		>
			<svg
				fill={ isMoreSearch ? '#FDAE16' : '#9A9A9A' }
				height="18"
				viewBox="0 0 20 18"
				width="20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M18.6274 0.609375H1.37275C0.798531 0.609375 0.439937 1.23516 0.728218 1.73438L6.17978 11.0016V16.6406C6.17978 17.0555 6.51259 17.3906 6.92509 17.3906H13.0751C13.4876 17.3906 13.8204 17.0555 13.8204 16.6406V11.0016L19.2743 1.73438C19.5602 1.23516 19.2017 0.609375 18.6274 0.609375ZM12.1423 15.7031H7.85791V12.0469H12.1446V15.7031H12.1423ZM12.3673 10.1578L12.1446 10.5469H7.85556L7.63291 10.1578L2.98525 2.29688H17.0149L12.3673 10.1578Z" />
			</svg>
			{
				withText &&
				<>
					<span>
						{ isRu ? 'Фильтры' : 'Фільтры' }
					</span>
					<svg
						className={ isMoreSearch ? 'rotate' : 'rotate-start' }
						fill={ isMoreSearch ? '#FDAE16' : '#9A9A9A' }
						height="12"
						style={ { marginLeft: '20px' } }
						viewBox="0 0 7 12"
						width="7"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M5.83327 4.23243L2.00911 0.410763C1.85043 0.267295 1.64267 0.19034 1.42882 0.195832C1.21498 0.201323 1.01143 0.288839 0.860333 0.440261C0.709232 0.591683 0.622148 0.795412 0.617111 1.00927C0.612074 1.22312 0.68947 1.43073 0.833274 1.5891L4.65494 5.41076C4.81117 5.56704 4.89893 5.77896 4.89893 5.99993C4.89893 6.2209 4.81117 6.43282 4.65494 6.5891L0.833274 10.4108C0.677017 10.5671 0.589277 10.7792 0.589356 11.0002C0.589434 11.2213 0.677324 11.4333 0.833691 11.5895C0.990058 11.7458 1.20209 11.8335 1.42315 11.8334C1.64421 11.8334 1.85618 11.7455 2.01244 11.5891L5.83327 7.76743C6.30195 7.29861 6.56524 6.66284 6.56524 5.99993C6.56524 5.33702 6.30195 4.70125 5.83327 4.23243Z"
						/>
					</svg>
				</>
			}
		</div>
	)
}
