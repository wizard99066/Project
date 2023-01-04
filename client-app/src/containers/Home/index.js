import {
	Button
}from 'antd'
import React, {
}from 'react'
import {
	useDispatch
}from 'react-redux'
import {
	userActions
}from '../../store/actions'

const Home = () => {
	const dispatch = useDispatch()
	function onClick(){
		dispatch(userActions.login())
	}
	return (
		<>
			<div>
				Главная страница
				<Button onClick={ onClick }>
					Нажми
				</Button>
			</div>
		</>
	)
}

export default Home
