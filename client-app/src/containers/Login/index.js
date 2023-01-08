import {
	Button,
	Input
}from "antd"
import React from "react"
import {
	useState
}from "react"
import './style.css'

const Login = () => {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	return (
		<div className="login__page">
			<h2>
                Вход
			</h2>
			<div className="login__wrapper">
				<Input
					value={ login }
					onChange={ (e) => setLogin(e.target.value) }
				/>
				<Input
					type="password"
					value={ password }
					onChange={ (e) => setPassword(e.target.value) }
				/>
				<Button className="login__button">
                Войти
				</Button>
			</div>
		</div>)
}

export default Login