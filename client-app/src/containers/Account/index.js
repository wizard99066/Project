import {
	Tabs
}from 'antd'
import React, {
	useState, useEffect
}from 'react'
import {
	useDispatch, useSelector
}from 'react-redux'
import Authors from '../Authors'
import Genres from '../Genres'
import Books from '../Books'
import Favorite from '../UserBookFavorite'
import Read from "../UserBookRead"
import WantToRead from "../UserBookWantToRead"
import './style.css'
const Account = () => {
	const { roles, user } = useSelector((state) => state.userReducer)
	const isAdmin = roles.includes("admin")
	const items = isAdmin
		? [
			{
				label    : `Управление авторами`,
				key      : "1",
				children : <Authors />
			},
			{
				label    : `Управление жанрами`,
				key      : "2",
				children : <Genres />
			},
			{
				label    : `Управление книгами`,
				key      : "3",
				children : <Books />
			}
		]
		: [
			{
				label    : `Избранное`,
				key      : "1",
				children : <Favorite />
			},
			{
				label    : `Хочу прочитать`,
				key      : "2",
				children : <WantToRead />
			},
			{
				label    : `Прочитано`,
				key      : "3",
				children : <Read />
			}
		]
	return (
		<div className="page">
			<p className="list_book_header">
				{ `Привет, ${ user.userName }` }
			</p>
			<Tabs
				centered
				destroyInactiveTabPane
				defaultActiveKey="1"
				items={ items }
			/>
		</div>
	)
}
export default Account