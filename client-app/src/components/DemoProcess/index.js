import React, {
	useEffect, useState, useRef
}from 'react'
import {
	useSprings, animated
}from 'react-spring'

import './style.css'
const theta = [
	Math.PI / 12,
	Math.PI / 3.2,
	Math.PI / 1.846,
	Math.PI / 1.297,
	Math.PI / 1,
	Math.PI / 0.813,
	Math.PI / 0.685,
	Math.PI / 0.593,
	Math.PI / 0.521
]

const iconObjs = [
	{
		desc  : 'Хотите подать обращение?',
		color : '#c40000',
		delay : 0
	},
	{
		desc  : 'Составляете обращение',
		color : '#c98102',
		delay : 2.5
	},
	{
		desc  : 'Подаете обращение',
		color : '#8b9222',
		delay : 3.7
	},
	{
		desc  : 'Обращение проверяется на корректность',
		color : '#02ad4c',
		delay : 5.2
	},
	{
		desc  : 'Регистрация обращения',
		color : '#02bb9d',
		delay : 7.7
	},
	{
		desc  : 'Передача должностному лицу',
		color : '#3296ae',
		delay : 10.2
	},
	{
		desc  : 'Передача ответственному исполнителю',
		color : '#195fb6',
		delay : 12
	},
	{
		desc  : 'Составление ответа по обращению',
		color : '#1921b0',
		delay : 13.5
	},
	{
		desc  : 'Отправка ответа заявителю',
		color : '#681999',
		delay : 16
	}
]
const icons = [
	'FrownOutlined',
	'FormOutlined',
	'FileTextOutlined',
	'FileSearchOutlined',
	'FileDoneOutlined',
	'TeamOutlined',
	'BankOutlined',
	'AuditOutlined',
	'SmileOutlined'
]

const fn = (props) => index => {
	return {
		config: {
			duration: 2000
		},
		delay : iconObjs[index].delay * 2000,
		from  : {
			color : index === 0 ? 'white' : iconObjs[index - 1].color,
			width : 40
		},
		to: async (next, cancel) => {
			await next({
				color : iconObjs[index].color,
				width : 60
			})
		}
	}
}

const DemoProcess = () => {
	const order = useRef(icons.map((_, index) => index)) // S
	const [springs] = useSprings(icons.length, fn(order.current))
	const [circleArray, setCircleArray] = useState([])

	useEffect(() => {
		const array = []
		theta.map((angle, index) => {
			array[index] = {
			}
			array[index].posx = `${ Math.round(200 * (Math.cos(theta[index]))) }px`
			array[index].posy = `${ Math.round(200 * (Math.sin(theta[index]))) }px`
		})
		setCircleArray(array)
	}, [])

	return (
		<div className="container">
			{
				circleArray.length !== 0 ?
					icons.map((name, index) => {
						return (
							<>
								<animated.div
									key={ index }
									style={ {
										color    : springs[index].color.interpolate(s => `${ s }`),
										position : 'absolute'
									} }
								>
									{ iconObjs[index].icon }
									<p className="description_step_demo">
										{ iconObjs[index].desc }
									</p>
								</animated.div>
							</>
						)
					})
					:
					null
			}
			<svg
				className="demo_svg"
				height="300px"
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 1600 300"
				width="100%"
				xmlns="http://www.w3.org/2000/svg"
				xmlnsHref="http://www.w3.org/1999/xlink"
			>
				<defs>
					<linearGradient
						id="gradient"
						x1="0%"
						x2="100%"
						y1="0%"
						y2="0%"
					>
						<stop
							offset="0%"
							stop-color="#c40000"
						/>
						<stop
							offset="13%"
							stop-color="#c98102"
						/>
						<stop
							offset="25%"
							stop-color="#5d9d00"
						/>
						<stop
							offset="39%"
							stop-color="#02ad4c"
						/>
						<stop
							offset="54%"
							stop-color="#02bb9d"
						/>
						<stop
							offset="68%"
							stop-color="#0583bb"
						/>
						<stop
							offset="80%"
							stop-color="#0224b6"
						/>
						<stop
							offset="92%"
							stop-color="#5b04b1"
						/>
						<stop
							offset="100%"
							stop-color="#bb034b"
						/>
					</linearGradient>
				</defs>
				<rect
					height="300"
					id="svgEditorBackground"
					style={ {
						stroke : 'none',
						fill   : 'none'
					} }
					width="1600"
					x="0"
					y="0"
				/>
				<path
					d="M24.29,166.53a54.75,54.75,0,0,0,-13.47,75.92a91.02,91.02,0,0,0,50.2,28.16a117.25,117.25,0,0,0,112.65,-97.96t-13.47,-110.2a71.58,71.58,0,0,1,134.69,-23.27t19.59,161.63t197.14,19.59t128.57,-214.29t-159.18,86.94t341.63,188.57c131.02,2.45,131.02,2.45,89.39,-120a85.37,85.37,0,1,1,110.2,-112.65s61.22,191.02,60,189.8s23.27,53.88,51.43,44.08t120,-22.04t7.35,-172.65t209.39,-53.88t73.47,253.47t-67.35,-127.35s37.96,-61.22,72.24,-3.67"
					id="e3_path_1"
					style={ {
						fill        : 'none',
						stroke      : 'white',
						strokeWidth : '5px'
					} }
				/>
				<path
					d="M24.29,166.53a54.75,54.75,0,0,0,-13.47,75.92a91.02,91.02,0,0,0,50.2,28.16a117.25,117.25,0,0,0,112.65,-97.96t-13.47,-110.2a71.58,71.58,0,0,1,134.69,-23.27t19.59,161.63t197.14,19.59t128.57,-214.29t-159.18,86.94t341.63,188.57c131.02,2.45,131.02,2.45,89.39,-120a85.37,85.37,0,1,1,110.2,-112.65s61.22,191.02,60,189.8s23.27,53.88,51.43,44.08t120,-22.04t7.35,-172.65t209.39,-53.88t73.47,253.47t-67.35,-127.35s37.96,-61.22,72.24,-3.67"
					id="e3_path_2"
					stroke="url(#gradient)"
					style={ {
						fill        : 'none',
						strokeWidth : '5px'
					} }
				/>
			</svg>
		</div>
	)
}

export default DemoProcess