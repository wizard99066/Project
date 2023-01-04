import React from "react"
import {
	Row, Col, Form, Input, Button
}from "antd"

import "./style.css"

const layout = {
	labelCol: {
		span: 24
	},
	wrapperCol: {
		span: 24
	}
}

const validateMessages = {
	required : "${name} is required!",
	types    : {
		email  : "${name} is not validate email!",
		number : "${name} is not a validate number!"
	}
}

const FeedBack = ({ sendFeedback, isSending }) => {
	return (
		<article>
			<Row className="contact_info">
				<Col span={ 14 }>
					<Row className="feedback_form">
						<Form
							{ ...layout }
							name="feedback"
							validateMessages={ validateMessages }
							onFinish={ sendFeedback }
						>
							<Form.Item
								name={ ["feedback", "userName"] }
								rules={ [
									{
										required: true
									}
								] }
							>
								<Input placeholder="Имя" />
							</Form.Item>
							<Form.Item
								name={ ["feedback", "userEmail"] }
								rules={ [
									{
										type     : "email",
										required : true
									}
								] }
							>
								<Input placeholder="Email адрес" />
							</Form.Item>
							<Form.Item name={ ["feedback", "userPhone"] }>
								<Input placeholder="Телефон" />
							</Form.Item>
							<Form.Item
								labelCol={ {
									span: 12
								} }
								name={ ["feedback", "userQuestion"] }
								rules={ [
									{
										required: true
									}
								] }
							>
								<Row justify="space-between">
									<Col span={ 18 }>
										<Input.TextArea
											placeholder="Вопрос"
											rows={ 4 }
										/>
									</Col>
									<Col span={ 5 }>
										<Button
											className="feedback_submit"
											htmlType="submit"
											type="primary"
										>
                      Отправить
										</Button>
									</Col>
								</Row>
							</Form.Item>
						</Form>
					</Row>
				</Col>
				<Col span={ 8 }>
					<Row>
						<Col span={ 3 } />
						<Col span={ 18 }>
							<span>
г. Минск,
							</span>
							<br />
							<span>
ул. Беломорская, 18
							</span>
							<br />
							<span>
                Почтовый индекс
								{ ' ' }
								<b>
22034
								</b>
							</span>
						</Col>
					</Row>
					<Row>
						<Col span={ 3 } />
						<Col span={ 16 }>
							<a href="tel:123-456-7890">
123-456-7890
							</a>
						</Col>
					</Row>
					<Row>
						<Col span={ 3 } />
						<Col span={ 16 }>
							<a href="mailto:test_mail@gmail.com">
test_mail@gmail.com
							</a>
						</Col>
					</Row>
				</Col>
			</Row>
		</article>
	)
}

export default FeedBack
