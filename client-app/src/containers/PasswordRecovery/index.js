import {
	Button,
	Input
}from "antd"
import React, {
	useState
}from "react"
import './style.css'

const PasswordRecovery =() => {
	const [passwordRecovery, setPasswordRecovery] = useState('')
	return (
		<div className="passwordRecovery__page">
			<h2>
                Восстановление пароля
			</h2>
			<div className="passwordRecovery__wrapper">
				<Input
					placholder="Введите email"
					value={ passwordRecovery }
					onChange={ (e) => setPasswordRecovery(e.target.value) }
				/>
				<Button className="passwordRecovery__button">
                 отправить сообщение
				</Button>
			</div>
		</div>
	)
}
export default PasswordRecovery
