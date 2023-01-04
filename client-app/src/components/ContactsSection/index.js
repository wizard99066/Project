import React, {
	memo, useEffect, useState
}from "react"
import {
	Row, Form, Input, Button, Modal
}from "antd"
import {
	YMaps, Map, Placemark
}from "react-yandex-maps"

import {
	useDispatch, useSelector
}from "react-redux"
import {
	isImageUrl
}from "antd/lib/upload/utils"
import {
	StyledContactDiv
}from "./contactSecStyled"
import i18n from "./localization"
import {
	messageToAdminAction
}from "../../containers/MessageToAdmin/actions"
import {
	messageActions
}from "../../containers/Messages/store/actions"
import Notifications from "..//../helpers/Notifications"
import "antd/lib/input/style/index.css"
import "antd/lib/input-number/style/index.css"
import "antd/lib/modal/style/index.css"
import "./style.css"
//import Recaptcha from "react-recaptcha"
import HCaptcha from '@hcaptcha/react-hcaptcha';
import CustomButton from "../../components/ButtonCustom"
import {
	CustomInput
}from "../CustomInput"

const ContactsSection = (props) => {
	//
	const { forHomePage, forContactsForm, forHelpSection } = props

	//

	const [form] = Form.useForm()

	const dispatch = useDispatch()
	const [visible, setVisible] = useState(false)
	const { isMessageSend } = useSelector((state) => state.messageToAdminReducer)
	const { user, isLoading, roles } = useSelector((state) => state.userReducer)
	const { getSending } = useSelector((state) => state.messageReducer)
	const isRu = useSelector((state) => state.globalReducer.isRu)

	const [messageUser, setMessageUser] = useState(false)
	const [messageAuthorized, setMessageAuthorized] = useState(false)
	const [message, setMessage] = useState(false)
	const [disabled, setDisabled] = useState(true)

	const validateMessages = {
		required : i18n.validateMessages.required[isRu],
		types    : {
			email: i18n.validateMessages.types.email[isRu]
		}
	}

	function handleCancel(){
		setVisible(false)
		setDisabled(true)
	}

	useEffect(() => {
		if (isMessageSend && message && visible){
			Notifications.successNotice(i18n.successNotification[isRu])
			form.resetFields()
			handleCancel()
		}
		if (isMessageSend == false)
			setMessage(true)
	}, [isMessageSend])

	useEffect(() => {
		if (getSending && message && visible){
			Notifications.successNotice(i18n.successNotification[isRu])
			form.resetFields()
			handleCancel()
		}
		if (getSending == false)
			setMessage(true)
	}, [getSending])

	const sendMesssageToAdmin = (values) => {
		values.message = values.message?.trim()
		values.userName = values.userName?.trim()
		values.userEmail = values.userEmail?.trim()
		values.userPhoneNumber = values.userPhoneNumber?.trim()
		dispatch(messageToAdminAction.setMessageFromUser(values))
	}

	const sendMesssageToAdminInChat = (values) => {
		const fd = new FormData()
		fd.append("Text", values.message?.trim())
		fd.append("Sender", user.id)
		fd.append("IsMessageToAdmin", true)
		dispatch(messageActions.sendMessage(fd))
	}

	/*
	 * useEffect(() => {
	 *   if (roles.length !== 1) form.resetFields();
	 * }, [roles.length]);
	 * <div className="contact-box">
	 */
	return (
		<>
			{ (!roles.includes('admin') && forHomePage == true && (forContactsForm != true && !forHelpSection)) ? (
				<div className="button-box">
					<div className="letter-button-box">
						<Button
							className="letter-button"
							icon={ (<svg
								fill="none"
								height="16"
								viewBox="0 0 22 16"
								width="22"
								xmlns="http://www.w3.org/2000/svg"
							        >
								<path
									d="M21.8 0.799988V15.2H0.200012V0.799988H21.8ZM1.70822 2.23999L11 7.20124L20.2918 2.23999H1.70822ZM20.45 13.76V3.76999L11 8.79874L1.55001 3.76999V13.76H20.45Z"
									fill="#5C5F62"
								/>
							</svg>) }
							shape="circle"
							size="large"
							type="primary"
							onClick={ () => setVisible(!visible) }
						/>
					</div>
				</div>) : null }
			{ (!roles.includes('admin') && forHomePage == true && (forContactsForm == true || forHelpSection)) ? (

				<CustomButton
					className="message-to-admin-button-contact"
					htmlType="submit"

					/*
					 * style={ {
					 * 	width  : "395px",
					 * 	height : "44px"
					 * } }
					 */
					type={ forHelpSection && "orange" }
					onClick={ () => setVisible(!visible) }
				>
					{ forContactsForm?
						(<div className="custom-button-font-style">
							{ i18n.headerItem[isRu] }
						</div>)
						: i18n.headerItem[isRu] }

				</CustomButton>

			) : null }

			{ !roles.includes('admin') && visible ? (
				<>
					{ forHomePage ? (
						<div className="ant-modal-title">
							<Modal

								//destroyOnClose
								footer={ null }
								title={ i18n.headerItem[isRu] }
								visible={ visible }
								width={ 948 }
								onCancel={ handleCancel }
							>
								<div className="main-contact-box">
									<Form
										form={ form }
										validateMessages={ validateMessages }
										onFinish={ (values) => {
											roles && roles.length > 0
												? sendMesssageToAdminInChat(values)
												: sendMesssageToAdmin(values)
										} }
									>
										<Form.Item
											initialValue={ roles && roles.length > 0 ? user.userName : null }
											name="userName"
											rules={ [
												{
													required: true
												},
												{
													min     : 2,
													max     : 100,
													message : i18n.formItemsRules.userName[isRu]
												}
											] }
										>
											<CustomInput
												maxLength={ 100 }
												placeholder={ i18n.placeholderText[isRu][0] }
												type="text"
											/>
										</Form.Item>
										<Form.Item
											name="message"
											rules={ [
												{
													required: true
												},
												({ getFieldValue }) => ({
													validator(role, value){
														if (value && value.trim())
															return Promise.resolve()

														return Promise.reject(i18n.formItemsErrors.message[isRu])
													}
												})
											] }
										>
											<Input.TextArea
												autoSize={ {
													minRows : 3,
													maxRows : 7
												} }
												placeholder={ i18n.placeholderText[isRu][3] }
											/>
										</Form.Item>
										<Form.Item
											initialValue={ roles && roles.length > 0 ? user.email : null }
											name="userEmail"
											rules={ [
												{
													required : true,
													pattern  : /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
													message  : i18n.formItemsRules.userEmail[0][isRu]
												},
												{
													min     : 2,
													max     : 100,
													message : i18n.formItemsRules.userEmail[1][isRu]
												}
											] }
										>
											<CustomInput
												maxLength={ 100 }
												placeholder={ i18n.placeholderText[isRu][1] }
											/>
										</Form.Item>

										<Form.Item
											initialValue={
												roles && roles.length > 0
													? user.phoneCode.value + user.mobilePhoneNumber
													: null
											}
											name="userPhoneNumber"
											rules={ [
												{
													pattern : /^(\+)?[0-9]*$/,
													message : i18n.formItemsRules.userPhoneNumber[1][isRu]
												},
												{
													min     : 8,
													max     : 15,
													message : i18n.formItemsRules.userPhoneNumber[0][isRu]
												}
											] }
										>
											<CustomInput
												maxLength={ 100 }
												placeholder={ i18n.placeholderText[isRu][2] }
											/>
										</Form.Item>
										<Form.Item>
										<HCaptcha sitekey="c3fee414-96cf-4698-b7a0-50f4db3066e4" onVerify={() => setDisabled(false)}/>
											{/* <Recaptcha
												expiredCallback={ () => setDisabled(true) }
												hl="{$lang['wysiwyg_language']}"
												render="explicit"
												sitekey="6LfEeq8UAAAAAK0gGlfUuESStOEHOmg1Q5MQ9PB6"
												verifyCallback={ () => setDisabled(false) }
											/> */}
										</Form.Item>
										<Form.Item>
											<CustomButton
												disabled={ disabled }
												htmlType="submit"
												style={ {
													width     : "100%",
													marginTop : "40px"
												} }
												type="orange"
											>
												{ i18n.submitBtnText[isRu] }
											</CustomButton>
										</Form.Item>
									</Form>
								</div>
							</Modal>
						</div>
					) : (

					// </div>

						<StyledContactDiv className="contact-box">
							<h2>
								{ i18n.headerItem[isRu] }
							</h2>
							<Form
								form={ form }
								validateMessages={ validateMessages }
								onFinish={ () => {
									roles && roles.length > 0
										? sendMesssageToAdminInChat
										: sendMesssageToAdmin
									handleCancel()
								} }
							>
								<Form.Item
									initialValue={ roles && roles.length > 0 ? user.userName : null }
									name="userName"
									rules={ [
										{
											min     : 2,
											max     : 100,
											message : i18n.formItemsRules.userName[isRu]
										}
									] }
								>
									<Input
										maxLength={ 100 }
										placeholder={ i18n.placeholderText[isRu][0] }
										type="text"
									/>
								</Form.Item>
								<Form.Item
									initialValue={ roles && roles.length > 0 ? user.email : null }
									name="userEmail"
									rules={ [
										{
											required : true,
											pattern  : /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
											message  : i18n.formItemsRules.userEmail[0][isRu]
										},
										{
											min     : 2,
											max     : 100,
											message : i18n.formItemsRules.userEmail[1][isRu]
										}
									] }
								>
									<Input
										maxLength={ 100 }
										placeholder={ i18n.placeholderText[isRu][1] }
									/>
								</Form.Item>

								<Form.Item
									initialValue={
										roles && roles.length > 0
											? user.phoneCode.value + user.mobilePhoneNumber
											: null
									}
									name="userPhoneNumber"
									rules={ [
										{
											min     : 2,
											max     : 100,
											message : i18n.formItemsRules.userPhoneNumber[isRu]
										}
									] }
								>
									<Input
										maxLength={ 100 }
										placeholder={ i18n.placeholderText[isRu][2] }
									/>
								</Form.Item>

								<Form.Item
									name="message"
									rules={ [
										{
											required: true
										},
										{
											min     : 2,
											max     : 15000,
											message : i18n.formItemsRules.message[isRu]
										},
										({ getFieldValue }) => ({
											validator(role, value){
												if (value && value.trim())
													return Promise.resolve()

												return Promise.reject(i18n.formItemsErrors.message[isRu])
											}
										})
									] }
								>
									<Input.TextArea
										autoSize={ {
											minRows : 3,
											maxRows : 8
										} }
										placeholder={ i18n.placeholderText[isRu][3] }
									/>
								</Form.Item>
								<Form.Item>
								<HCaptcha sitekey="c3fee414-96cf-4698-b7a0-50f4db3066e4" onVerify={() => setDisabled(false)}/>
									{/* <Recaptcha
										expiredCallback={ () => setDisabled(true) }
										hl="{$lang['wysiwyg_language']}"
										render="explicit"
										sitekey="6LfEeq8UAAAAAK0gGlfUuESStOEHOmg1Q5MQ9PB6"
										verifyCallback={ () => setDisabled(false) }
									/> */}
								</Form.Item>
								<Form.Item>
									<Button
										disabled={ disabled }
										htmlType="submit"
										shape="round"
										size="large"
										type="primary"
									>
										{ i18n.submitBtnText[isRu] }
									</Button>
								</Form.Item>
							</Form>
						</StyledContactDiv>
					) }
				</>
			) : null }
		</>
	)
}
export default ContactsSection
