import React, {
	memo, useState, useEffect
}from 'react'
import {
	Link, useRouteMatch
}from 'react-router-dom'
import {
	useSelector, useDispatch
}from 'react-redux'
import {
	Button,
	Form,
	Input,
	Menu, Modal, Row
}from 'antd'
import {
	userActions
}from '../../store/actions'
import {
	StyledMenuCol1, StyledMenuCol2, StyledHeader
}from './menuStyled'
import './style.css'
import logoImg from " ../../../public/лого 3.svg"
import Notifications from '../../helpers/Notifications'

const MainMenu = memo(() => {
	const {
		user, isLoginLoading, registerMessage
	} = useSelector((state) => state.userReducer)
	const [isSticky, setIsSticky] = useState(true)
	const [loginVisible, setLoginVisible] = useState(false)
	const [registerVisible, setRegisterVisible] = useState(false)

	const dispatch = useDispatch()
	useEffect(() => {
		const onScroll = (e) => {
			if (
				e.target.body.scrollTop > 150 ||
				e.target.documentElement.scrollTop > 150
			)
				setIsSticky(false)

			else if (window.location.pathname === '/')
				setIsSticky(true)
		}
		window.addEventListener('scroll', onScroll)
		return () => window.removeEventListener('scroll', onScroll)
	}, [isSticky])

	useEffect(() => {
		if (user)
			setLoginVisible(false)
	}, [user])

	const logout = () => {
		dispatch(userActions.logout())
	}

	const login = (params) => {
		dispatch(userActions.login(params))
	}

	const register = (params) => {
		dispatch(userActions.register(params))
	}

	useEffect(() => {
		if (registerMessage){
			Notifications.successNotice(registerMessage)
			setRegisterVisible(false)
		}
	}, [registerMessage])

	return (
		<>
			<nav>
				<Row className="header-menu sticky">
					<StyledMenuCol1
						className="logo-title"
						span={ 5 }
					>
						<div className="logo-div">
							<Link
								className="logo-link-href"
								to="/"
							>
								<img
									alt="fds"
									className="logo-img"
									decoding="async"
									loading="lazy"
									src={ logoImg }
								/>
								<span>
									Book Diary
								</span>
							</Link>
						</div>

					</StyledMenuCol1>
					<StyledMenuCol2
						className="menu-center-col"
						span={ 19 }
					>
						<div
							className="main-nav"
							id="headMenuDiv"
						>
							<Menu
								disabledOverflow
								id="headMenu"
								mode="horizontal"
								selectable={ false }
							>
								{ user ?
									(
										<>
											<Menu.Item>
												<Link
													className="logo-link-href"
													to="/account"
												>
													Личный кабинет
												</Link>
											</Menu.Item>
											<Menu.Item onClick={ () => logout() }>
												Выйти
											</Menu.Item>
										</>
									)
									: (
										<>
											<Menu.Item onClick={ () => setLoginVisible(true) }>
												Вход
											</Menu.Item>
											<Menu.Item onClick={ () => setRegisterVisible(true) }>
												Регистрация
											</Menu.Item>
										</>
									) }
							</Menu>
						</div>
					</StyledMenuCol2>
				</Row>
			</nav>
			<Modal
				destroyOnClose
				footer={ false }
				open={ loginVisible }
				title="Вход в систему"
				width={ 600 }
				onCancel={ () => {
					setLoginVisible(false)
				} }
			>
				<Form
					labelAlign="left"
					labelCol={ { span: 7 } }
					wrapperCol={ { span   : 16,
						  offset : 1 } }
					onFinish={ login }
				>
					<Form.Item
						label="Имя пользователя"
						name="userName"
						normalize={ (value) => (value ? value.trim() : value) }
						rules={ [
							{
								required   : true,
								whitespace : true,
								message    : 'Пожалуйста, введите имя пользователя!'
							}
						] }
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Пароль"
						name="password"
						normalize={ (value) => (value ? value.trim() : value) }
						rules={ [
							{
								required   : true,
								whitespace : true,
								message    : 'Пожалуйста, введите пароль!'
							}
						] }
					>
						<Input.Password />
					</Form.Item>
					<Button
						htmlType="submit"
						loading={ isLoginLoading }
						style={ { float: "right" } }
						type="primary"
					>
						Войти
					</Button>
				</Form>
			</Modal>
			<Modal
				destroyOnClose
				footer={ false }
				open={ registerVisible }
				title="Регистрация в системе"
				width={ 750 }
				onCancel={ () => {
					setRegisterVisible(false)
				} }
			>
				<Form
					labelAlign="left"
					labelCol={ { span: 7 } }
					wrapperCol={ { span   : 16,
						  offset : 1 } }
					onFinish={ register }
				>
					<Form.Item
						label="Имя пользователя"
						name="userName"
						normalize={ (value) => (value ? value.trim() : value) }
						rules={ [
							{
								required   : true,
								whitespace : true,
								pattern    : /^[a-zA-Z]+$/,
								message    : 'Пожалуйста, введите корректное имя пользователя!'
							}
						] }
						tooltip={ { title: "Только латинские символы" } }
					>
						<Input />
					</Form.Item>
					<Form.Item
						hasFeedback
						label="Пароль"
						name="password"
						normalize={ (value) => (value ? value.trim() : value) }
						rules={ [
							{
								required : true,
								pattern  : /^[a-zA-Z0-9.!@#$%]{5,}$/,
								message  : "Пожалуйста, введите корректный пароль!"
							}
						] }
						tooltip={ { title: "Пароль должен состоять минимум из 5 символов (латинские и специальные('.!@#$%') символы, цифры)" } }
					>
						<Input.Password
							maxLength={ 100 }
						/>
					</Form.Item>
					<Form.Item
						hasFeedback
						className="confirm-password"
						dependencies={ ["password"] }
						label="Подтверждение пароля"
						name="confirm"
						normalize={ (value) => (value ? value.trim() : value) }
						rules={ [
							{
								required : true,
								message  : "Поля обязательно для заполнения!"
							},
							({ getFieldValue }) => ({
								validator(rule, value){
									if (!value || getFieldValue("password") === value)
										return Promise.resolve()
									return Promise.reject(new Error("Пароли должны совпадать."))
								}
							})
						] }
					>
						<Input.Password
							maxLength={ 100 }
						/>
					</Form.Item>
					<Form.Item
						label="Адрес электронной почты"
						name="email"
						rules={ [
							{
								type       : "email",
								required   : true,
								whitespace : true,
								message    : "Пожалуйста, введите корректный адрес электронной почты!"
							}
						] }
					>
						<Input />
					</Form.Item>
					<Button
						htmlType="submit"
						loading={ isLoginLoading }
						style={ { float: "right" } }
						type="primary"
					>
						Регистрация
					</Button>
				</Form>
			</Modal>
		</>
	)
})

const Navigation = memo(() => {
	const location = useRouteMatch('/:slug')
	const isHome = location === null

	return (
		<div className="mainHeader">
			<StyledHeader
				className={ isHome ? 'header' : '' }
				propp={ {
					isHome: isHome
				} }
			>
				<MainMenu />
			</StyledHeader>
		</div>
	)
})

export default Navigation