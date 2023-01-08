import {
	Button
}from 'antd'
import React, {
}from 'react'
import {
	useDispatch
}from 'react-redux'
import {
	Link
}from 'react-router-dom'
import {
	userActions
}from '../../store/actions'
import './style.css'

const Home = () => {
	const dispatch = useDispatch()
	function onClick(){
		dispatch(userActions.login())
	}
	return (
		<>
			<div className="main__wrapper">
				<h1>
					Book diary
				</h1>
				<div className="buttons__wrapper">
					<Link to="/login">
						<Button className="home__button">
					Войти
						</Button>
					</Link>
					<Link to="/registration">
						<Button className="home__button">
					Регистрация
						</Button>
					</Link>
				</div>
			</div>
		</>
	)
}

export default Home
