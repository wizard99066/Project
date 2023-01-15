import {
	List, Pagination, Tooltip
}from 'antd'
import Icon, {
	StarOutlined, StarTwoTone, BookOutlined, BookTwoTone, SaveOutlined, SaveTwoTone
}from '@ant-design/icons'
import React, {
	useState, useEffect
}from 'react'
import {
	useDispatch, useSelector
}from 'react-redux'
import {
	userBookFavoriteActions
}from '../UserBookFavorite/store/actions'
import {
	userBookReadActions
}from './store/actions'
import {
	userBookWantToReadActions
}from '../UserBookWantToRead/store/actions'
import emptyAvatar from "../../../public/EmptyAvatar.jpg"
import Notifications from '../../helpers/Notifications'
import "./style.css"
const IconText = ({ icon, text, isSending, onClick }) => (
	<Tooltip
		placement="top"
		title={ text }
	>
		<Icon
			component={ icon }
			style={ { fontSize : "32px",
				cursor   : "pointer" } }
			onClick={ () => {
				if (!isSending)
					onClick()
			} }
		/>
	</Tooltip>
)
const ListBooks = () => {
	const dispatch = useDispatch()
	const [page, setPage] = useState(1)

	const { user } = useSelector((state) => state.userReducer)
	const { changed: changedFavorite, isSending: isSendingFavorite } = useSelector((state) => state.userBookFavoriteReducer)
	const { changed: changedRead, isSending: isSendingRead, paged } = useSelector((state) => state.userBookReadReducer)
	const { changed: changedWantToRead, isSending: isSendingWantToRead } = useSelector((state) => state.userBookWantToReadReducer)

	const getPages = (values) => {
		dispatch(userBookReadActions.getPaged(values))
	}
	const toFavorite = (values) => {
		dispatch(userBookFavoriteActions.create(values))
	}
	const notToFavorite = (values) => {
		dispatch(userBookFavoriteActions.remove(values))
	}
	const toRead = (values) => {
		dispatch(userBookReadActions.create(values))
	}
	const notToRead = (values) => {
		dispatch(userBookReadActions.remove(values))
	}
	const wantToRead = (values) => {
		dispatch(userBookWantToReadActions.create(values))
	}
	const notWantToRead = (values) => {
		dispatch(userBookWantToReadActions.remove(values))
	}

	useEffect(() => {
		onPaginationChange(page)
	}, [page])

	useEffect(() => {
		if (changedFavorite){
			Notifications.successNotice(changedFavorite)
			dispatch(userBookFavoriteActions.clear())
			onPaginationChange(page)
		}
		if (changedRead){
			Notifications.successNotice(changedRead)
			dispatch(userBookReadActions.clear())
			onPaginationChange(page)
		}
		if (changedWantToRead){
			Notifications.successNotice(changedWantToRead)
			dispatch(userBookWantToReadActions.clear())
			onPaginationChange(page)
		}
	}, [
		changedFavorite,
		changedRead,
		changedWantToRead
	])

	function onPaginationChange(value){
		getPages({
			page     : value,
			pageSize : 10
		})
	}

	useEffect(() => {
		if (paged?.items?.length == 0 && page != 1)
			setPage(page-1)
	}, [paged])

	return (
		<div className="page">
			<List
				dataSource={ paged?.items }
				footer={ false }
				itemLayout="vertical"
				loading={ { tip      : "Загрузка...",
					spinning : isSendingRead } }
				renderItem={ (book) => (
					<List.Item
						key={ book.title }
						actions={ user
							? [
								<IconText
									key="isToFavorite"
									icon={ book.isToFavorite ? StarTwoTone : StarOutlined }
									isSending={ isSendingFavorite }
									text={ book.isToFavorite ? "Убрать из избранного" : "Добавить в избранное" }
									onClick={ () => {
										book.isToFavorite ? notToFavorite({ bookId: book.id }) : toFavorite({ bookId: book.id })
									} }
								/>,
								<IconText
									key="isWantToRead"
									icon={ book.isWantToRead ? BookTwoTone : BookOutlined }
									isSending={ isSendingWantToRead }
									text={ book.isWantToRead ? "Прочитаю позже " : "Хочу прочитать" }
									onClick={ () => {
										book.isWantToRead ? notWantToRead({ bookId: book.id }) : wantToRead({ bookId: book.id })
									} }
								/>,
								<IconText
									key="isRead"
									icon={ book.isRead ? SaveTwoTone : SaveOutlined }
									isSending={ isSendingRead }
									text={ book.isRead ? "Убрать из прочитанного" : "Добавить в прочитанное" }
									onClick={ () => {
										book.isRead ? notToRead({ bookId: book.id }) : toRead({ bookId: book.id })
									} }
								/>
							]
							: [] }
					>
						<List.Item.Meta
							avatar={ (
								<img
									src={ book.avatarId ? `https://localhost:44313/api/Book/GetAvatar?Id=${ book.avatarId }` : emptyAvatar }
									width={ 300 }
								/>) }
							description={ (<>
								<p className="nameAuthorsAndGenres">

									{ `Автор(ы): ${ book.authors }` }
								</p>
								<br />
								<p className="nameAuthorsAndGenres">
									{ `Жанр(ы): ${ book.genres }` }
								</p>
							</>) }
							title={ (<p className="nameBook">
								{ book.nameBook }
							</p>) }
						/>
						<p className="nameDescription">
							{ book.description }
						</p>
					</List.Item>
				) }
				size="large"
			/>
			{ paged.count > 10
				? (
					<Pagination
						showQuickJumper
						current={ page }
						pageSize={ 10 }
						size="small"
						total={ paged.count }
						onChange={ (page) => {
							setPage(page)
							window.scrollTo({
								top      : 0,
								left     : 0,
								behavior : "smooth"
						  })
						} }
					/>)
				: null }
		</div>
	)
}
export default ListBooks