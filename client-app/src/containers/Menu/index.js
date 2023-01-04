import React, {
	memo, useState, useEffect
}from 'react'
import {
	Link, useRouteMatch, useLocation
}from 'react-router-dom'
import {
	useSelector, useDispatch
}from 'react-redux'
import {
	Layout, Menu, Row, Col, Button, Badge
}from 'antd'
import 'antd/lib/grid/style/index.css'
import { }from './menuStyled'
import comp from '../../../public/gif -com.gif'
import {
	globalActions
}from './actions'
import {
	userActions
}from '../../store/actions'
import {
	StyledMenuCol_1, StyledMenuCol_2, StyledMenuCol_3, StyledSubMenuDiv, StyledHeader
}from './menuStyled'
import 'antd/lib/badge/style/index.css'
import 'antd/lib/button/style/index.css'
import './style.css'
import UserNotifications from '../ApplicantNotifications'
import useWindowSize from "../../hooks/useWindowSize"
import Bowser from "bowser"
import logoImg from " ../../../public/лого 3.svg"
const {
	Header
} = Layout
const {
	SubMenu
} = Menu

const MenuTemp = memo(({
	isHomeTemp, loc
}) => {
	const linkItems = [
		'/',
		'/news',
		'/contacts',
		'/help',

		// '/nsi',
		'/login'
	]
	const linkItemsAuth = [
		'/',
		'/news',
		'/contacts',
		'/help'

		// '/nsi'
	]
	const i18n = {
		logoTextH: {
			1 : 'Система обращений',
			0 : 'Сістэма зваротаў'
		},
		logoText: {
			1: <span>
				Система обращений
			</span>,
			0: <span>
				Сістэма зваротаў
			</span>
		},
		menuItems: {
			1: [
				'Главная',
				'Новости',
				'Контакты',
				'Помощь',

				// 'НСИ',
				'Вход'
			],
			0: [
				'Галоўная',
				'Навіны',
				'Кантакты',
				'Дапамога',

				// 'НДІ',
				'Уваход'
			]
		},
		menuItemsAuth: {
			1: [
				'Главная',
				'Новости',
				'Контакты',
				'Помощь'

				// 'НСИ'
			],
			0: [
				'Галоўная',
				'Навіны',
				'Кантакты',
				'Дапамога'

				// 'НДІ'
			]
		},
		acSubmenuText: {
			1 : ['Личный кабинет', 'Выход'],
			0 : ['Асабісты кабінет', 'Выхад']
		},
		headerTextBox: {
			1: [
				<span>
					ГОСУДАРСТВЕННАЯ ЕДИНАЯ (ИНТЕГРИРОВАННАЯ) РЕСПУБЛИКАНСКАЯ ИНФОРМАЦИОННАЯ СИСТЕМА УЧЕТА И ОБРАБОТКИ ОБРАЩЕНИЙ ГРАЖДАН И ЮРИДИЧЕСКИХ ЛИЦ
				</span>
			],
			0: [
				<span>
					ДЗЯРЖАЎНАЯ АДЗІНАЯ (ІНТЭГРАВАНАЯ) РЭСПУБЛІКАНСКАЯ ІНФАРМАЦЫЙНАЯ СІСТЭМА ЎЛІКУ І АПРАЦОЎКІ ЗВАРОТАЎ ГРАМАДЗЯН І ЮРЫДЫЧНЫХ АСОБ
				</span>
			]
		},
		btnSubmitAppeal: {
			1 : 'Подать обращение',
			0 : 'Падаць зварот'
		},
		btnReg: {
			1 : 'Зарегистрироваться',
			0 : 'Зарэгістравацца'
		},
		btnLogin: {
			1 : 'Войти ',
			0 : 'Увайсці'
		}
	}

	const isRu = useSelector((state) => state.globalReducer.isRu)
	const {
		user, roles, systemEnvironment
	} = useSelector((state) => state.userReducer)
	const [isLoadedLogo, setIsLoadedLogo] = useState(false)
	const [isLoadedBack, setIsLoadedBack] = useState(false)
	const [isSticky, setIsSticky] = useState(true)
	const dispatch = useDispatch()
	const windowS = useWindowSize(990)
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

	const changeLanguage = () => {
		dispatch(globalActions.changeLanguage())
	}
	const logout = () => {
		dispatch(userActions.logout())
	}

	const [iEmenuVisibleRes, setiEmenuVisibleRes] = useState(false)
	const iEmenuButtonClick = () => {
		setiEmenuVisibleRes(!iEmenuVisibleRes)
	}

	return (
		<>
			<nav>
				<Row
					className="header-menu sticky"
				>
					<StyledMenuCol_1
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

								{ i18n.logoText[isRu] }
							</Link>
						</div>

					</StyledMenuCol_1>
					<StyledMenuCol_2
						className="menu-center-col"
						span={ 14 }
					>

						{ Bowser.name == 'Internet Explorer' && windowS?.width < 800 ?
							(<>
								<div className="iE-overflow-menu">
									<Button
										className="iE-overflow-menu-button"
										style={ { marginBottom: 16 } }
										type="primary"
										onClick={ iEmenuButtonClick }
									>
										{ React.createElement(<svg
											fill="none"
											height="13"
											viewBox="0 0 16 13"
											width="16"
											xmlns="http://www.w3.org/2000/svg"
										                      >
											<line
												stroke="#5C5F62"
												stroke-width="1.5"
												x2="16"
												y1="1.25"
												y2="1.25"
											/>
											<line
												stroke="#5C5F62"
												stroke-width="1.5"
												x2="16"
												y1="6.75"
												y2="6.75"
											/>
											<line
												stroke="#5C5F62"
												stroke-width="1.5"
												x2="16"
												y1="12.25"
												y2="12.25"
											/>
										</svg>) }
									</Button>

									<div style={ { display: iEmenuVisibleRes ? "block" : "none" } }>
										{ user
											? (<Menu
												disabledOverflow={ windowS.width ? windowS.width > 960 : null }
												id="headMenu"
												mode="vertical"
												selectable={ false }
											   >
												<Menu.Item key="notifications">
													<UserNotifications />
												</Menu.Item>
												{ i18n.menuItemsAuth[isRu].map((item, index) => {
													return (
														<Menu.Item key={ index }>
															<Link
																style={ {
																	color: 'black'
																} }
																to={ linkItemsAuth[index] }
															>
																{ item }
															</Link>
														</Menu.Item>
													)
												}) }
											</Menu>)
											: (<Menu
												id="headMenu"
												selectable={ false }
											   >
												{ i18n.menuItems[isRu].map((item, index) => {
													return (
														<Menu.Item key={ index }>
															<Link
																style={ {
																	color: 'black'
																} }
																to={ linkItems[index] }
															>
																{ item }
															</Link>
														</Menu.Item>
													)
												}) }
											</Menu>) }
									</div>
								</div>
							</>)
							:
							(<>
								{ user
									? (
										<div
											className="main-nav"
											id="headMenuDiv"
										>
											<Menu
												disabledOverflow={ windowS.width ? windowS.width > 960 : null }
												id="headMenu"
												mode="horizontal"
												selectable={ false }
											>
												<Menu.Item key="notifications">
													<UserNotifications />
												</Menu.Item>
												{ i18n.menuItemsAuth[isRu].map((item, index) => {
													return (
														<Menu.Item key={ index }>
															<Link
																to={ linkItemsAuth[index] }
															>
																{ item }
															</Link>
														</Menu.Item>
													)
												}) }
											</Menu>
										</div>
									)
									: (
										<div
											className="main-nav"
											id="headMenuDiv"
										>
											<Menu
												disabledOverflow={ windowS.width ? windowS.width > 960 : null }
												id="headMenu"
												mode="horizontal"
												selectable={ false }
											>
												{ i18n.menuItems[isRu].map((item, index) => {
													return (
														<Menu.Item key={ index }>
															<Link
																to={ linkItems[index] }
															>
																{ item }
															</Link>
														</Menu.Item>
													)
												}) }
											</Menu>
										</div>
									) }
							</>) }

					</StyledMenuCol_2>
					<StyledMenuCol_3
						className="languageBtnCol"
						span={ 5 }
					>

						{ user ? (
							<>
								<div className="main-nav-2">
									<Menu

										// style={{minWidth:"100%"}}
										disabledOverflow
										id="headMenu"
										mode="horizontal"
										selectable={ false }
										subMenuCloseDelay={ 1 }
									>
										<SubMenu
											key={ `user${ isHomeTemp && isSticky ? '' : '-sticky' }` }
											className="sub-menu"
											id="userSubmenu"
											title={
												(<>
													<svg
														fill="none"
														height="22"
														viewBox="0 0 18 22"
														width="18"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M9 11.6735C10.1867 11.6735 11.3467 11.3312 12.3334 10.6899C13.3201 10.0485 14.0892 9.13694 14.5433 8.07041C14.9974 7.00388 15.1162 5.8303 14.8847 4.69808C14.6532 3.56586 14.0818 2.52585 13.2426 1.70957C12.4035 0.893283 11.3344 0.337386 10.1705 0.112173C9.00666 -0.113039 7.80026 0.00254813 6.7039 0.444318C5.60754 0.886089 4.67047 1.6342 4.01118 2.59405C3.35189 3.5539 3 4.68238 3 5.83678C3.00159 7.38431 3.63424 8.86801 4.75911 9.96228C5.88399 11.0566 7.40919 11.672 9 11.6735ZM9 1.94561C9.79113 1.94561 10.5645 2.17382 11.2223 2.60139C11.8801 3.02895 12.3928 3.63667 12.6955 4.34769C12.9983 5.05871 13.0775 5.84109 12.9231 6.59591C12.7688 7.35072 12.3878 8.04406 11.8284 8.58825C11.269 9.13244 10.5563 9.50304 9.78036 9.65318C9.00444 9.80332 8.20017 9.72626 7.46927 9.43175C6.73836 9.13724 6.11365 8.6385 5.67412 7.9986C5.2346 7.3587 5 6.60638 5 5.83678C5 4.80477 5.42143 3.81504 6.17157 3.0853C6.92172 2.35557 7.93913 1.94561 9 1.94561ZM9 12.2721C6.61386 12.2746 4.32622 13.1979 2.63896 14.8392C0.951708 16.4806 0.00264685 18.706 0 21.0272C0 21.2852 0.105357 21.5326 0.292893 21.7151C0.48043 21.8975 0.734784 22 1 22C1.26522 22 1.51957 21.8975 1.70711 21.7151C1.89464 21.5326 2 21.2852 2 21.0272C2 19.2212 2.7375 17.4892 4.05025 16.2121C5.36301 14.9351 7.14348 14.2177 9 14.2177C10.8565 14.2177 12.637 14.9351 13.9497 16.2121C15.2625 17.4892 16 19.2212 16 21.0272C16 21.2852 16.1054 21.5326 16.2929 21.7151C16.4804 21.8975 16.7348 22 17 22C17.2652 22 17.5196 21.8975 17.7071 21.7151C17.8946 21.5326 18 21.2852 18 21.0272C17.9974 18.706 17.0483 16.4806 15.361 14.8392C13.6738 13.1979 11.3861 12.2746 9 12.2721Z"
															fill="#FDAE16"
														/>
													</svg>

												</>)
											}

										>
											<Menu.Item key="profile">
												<Link
													to="/account"
												>
													<Button

														type="link"
													>
														{ i18n.acSubmenuText[isRu][0] }
													</Button>
												</Link>
											</Menu.Item>
											<Menu.Item
												key="logout"
											>
												<Button
													className="exit-menu-button"
													type="link"
													onClick={ logout }
												>
													{ i18n.acSubmenuText[isRu][1] }
												</Button>
											</Menu.Item>
										</SubMenu>
									</Menu>
								</div>
							</>) : null }
						<div className="main-nav-3">
							<Button
								className="btn-language"
								size="large"
								onClick={ changeLanguage }
							>
								{ isRu ? 'Рус' : 'Бел' }
							</Button>
						</div>
					</StyledMenuCol_3>
				</Row>
			</nav>
			<>
				{ isHomeTemp ? (
					<StyledSubMenuDiv className="custom-subm-div">

						<Row className="custom-row">
							{ systemEnvironment && systemEnvironment.testingEnvironment
								? (<div className="test-title-div">
									<h1>
										{ isRu
											? "Тестовая среда для обучения пользователей"
											: "Тэставае асяроддзе для навучання карыстальнікаў" }
									</h1>
								</div>)
								: null }
							<Col
								className="custom-col-left"
								span={ 16 }
							>
								<div className="header-text-box">
									<h1>
										{ /*<div className="hiddenLogoText">*/ }
										{ /*	{i18n.logoTextH[isRu]}*/ }
										{ /*</div>*/ }

										<br />
										<div className="hiddenMenuCenterText">
											{ i18n.headerTextBox[isRu][0] }
											<br />
											{ i18n.headerTextBox[isRu][1] }
										</div>
									</h1>
									<div className="custom-col-right-adapt">
										<div className="image-div">
											<img
												alt="fds"
												className="header-img-c"
												decoding="async"
												loading="lazy"
												src={ comp }
												onLoad={ () => setIsLoadedBack(true) }
											/>
										</div>
									</div>
									{ user ?
										(!user.reOrg ||
											roles.includes('headOfOrg') ||
											roles.includes('viceHeadOfOrg'))
											? (
												<>
													<Row className="button-row">
														<Link to="/appealsForm">
															<Button
																className="custom-apply-bt"
																size="large"
																type="primary"
															>
																{ i18n.btnSubmitAppeal[isRu] }
															</Button>
														</Link>
													</Row>
												</>
											)
											: (<></>)
										: (
											<>
												<Row className="button-row">
													<Link to="/login">
														<Button
															className="custom-login-bt"
															size="large"
															type="primary"
														>
															{ i18n.btnLogin[isRu] }
														</Button>
													</Link>
													{ !systemEnvironment || !systemEnvironment.selfRegistrationLocked
														? (
															<Link to="/register">
																<div className="fix-register-bt-div">
																	<Button
																		className="custom-register-bt"
																		size="large"
																		type="link"
																	>
																		{ i18n.btnReg[isRu] }
																	</Button>
																</div>
															</Link>
														)
														: null }
												</Row>
											</>
										) }
								</div>
							</Col>
							<Col
								className="custom-col-right"
								span={ 8 }
							>
								<div className="image-div">
									<img
										alt="fds"
										className="header-img-c"
										decoding="async"
										loading="lazy"
										src={ comp }
										onLoad={ () => setIsLoadedBack(true) }
									/>
								</div>
							</Col>
						</Row>
					</StyledSubMenuDiv>
				) : null }
			</>
		</>
	)
})

const Navigation = memo(() => {
	const location = useRouteMatch('/:slug')
	const isHome = location === null

	return (
		<div
			propp={ {
				isHome: isHome
			} }
		>
			<StyledHeader
				className={ isHome ? 'header' : '' }
				propp={ {
					isHome: isHome
				} }
				style={ {
					padding: '0px'
				} }
			>
				<MenuTemp
					isHomeTemp={ isHome }
					loc={ location?.url }
				/>
			</StyledHeader>
		</div>
	)
})

export default Navigation