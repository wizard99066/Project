import {
	Button
}from 'antd'
import React, {
	useEffect, useState
}from 'react'
import {
	useDispatch, useSelector
}from 'react-redux'
import {
	authorActions
}from './store/actions'
import './style.css'
import Notifications from '../../helpers/Notifications'

const Authors = () => {
	const dispatch = useDispatch()
	const { isSending, changed, paged } = useSelector((state) => state.authorReducer)
	function onClick(){
		dispatch(authorActions.create({ firstName : "Евгений",
			lastName  : "Замятин",
			birthday  : null }))
	}

	useEffect(() => {
		if (changed)
			Notifications.successNotice(changed)
	}, [changed])

	return (
		<>
			<Button
				className="myButton"
				loading={ isSending }
				type="primary"
				onClick={
					() => {
						onClick()
					}
				}
			>
				Создай автора
			</Button>
		</>
	)
}

export default Authors
