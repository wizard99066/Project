import {
	List, Form, Select, Input, Pagination, Tooltip
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
import './style.css'
import {
	genreActions
}from '../../Genres/store/actions'
import {
	authorActions
}from '../../Authors/store/actions'
import {
	bookActions
}from '../store/actions'
import {
	userBookFavoriteActions
}from '../../UserBookFavorite/store/actions'
import {
	userBookReadActions
}from '../../UserBookRead/store/actions'
import {
	userBookWantToReadActions
}from '../../UserBookWantToRead/store/actions'
import {
	useDebounce
}from 'use-lodash-debounce'
import emptyAvatar from "../../../../public/EmptyAvatar.jpg"
import Notifications from '../../../helpers/Notifications'
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
	const [filter, setFilter] = useState({})
	const searchFilter = useDebounce(filter, 500)
	const [page, setPage] = useState(1)

	const { user, roles } = useSelector((state) => state.userReducer)
	const { isSending, paged } = useSelector((state) => state.bookReducer)
	const { list: listGenres } = useSelector((state) => state.genreReducer)
	const { list: listAuthors } = useSelector((state) => state.authorReducer)
	const { changed: changedFavorite, isSending: isSendingFavorite } = useSelector((state) => state.userBookFavoriteReducer)
	const { changed: changedRead, isSending: isSendingRead } = useSelector((state) => state.userBookReadReducer)
	const { changed: changedWantToRead, isSending: isSendingWantToRead } = useSelector((state) => state.userBookWantToReadReducer)

	const findGenres = params => {
		dispatch(genreActions.search(params))
	}
	const findAuthors = params => {
		dispatch(authorActions.search(params))
	}
	const getPages = (values) => {
		dispatch(bookActions.getPagedForUsers(values))
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

	function onFilter(value, values){
		setFilter(values)
	}

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

	useEffect(() => {
		onPaginationChange(1)
	}, [searchFilter, user])

	function onPaginationChange(value){
		setPage(value)
		getPages({
			bookName : searchFilter.bookName,
			authors  : searchFilter.authors,
			genres   : searchFilter.genres,
			page     : value,
			pageSize : 10
		})
	}

	return (
		<div className="page">
			<p className="list_book_header">
				Что почитать?
			</p>
			<div className="filter">
				<Form
				 labelCol={ { span: 5 } }
				  wrapperCol={ { span   : 16,
						offset : 1 } }
				  onValuesChange={ onFilter }
				>
					<Form.Item
						label="Название"
						name="bookName"
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Автор"
						name="authors"
					>
						<Select
							filterOption={ false }
							mode="multiple"
							notFoundContent={ null }
							onSearch={ (value) => findAuthors({ name: value }) }
						>
							{
								listAuthors?.map((author) => (
									<Select.Option
										key={ author.id }
										value={ author.id }
									>
										{ `${ author.lastName } ${ author.firstName }` }
									</Select.Option>))
							}

						</Select>
					</Form.Item>
					<Form.Item
						label="Жанр"
						name="genres"
					>
						<Select
							filterOption={ false }
							mode="multiple"
							notFoundContent={ null }
							onSearch={ (value) => findGenres({ name: value }) }
						>
							{
								listGenres?.map((genre) => (
									<Select.Option
										key={ genre.id }
										value={ genre.id }
									>
										{ genre.name }
									</Select.Option>))
							}
						</Select>
					</Form.Item>
				</Form>
			</div>
			<List
				dataSource={ paged?.items }
				footer={ false }
				itemLayout="vertical"
				loading={ { tip      : "Загрузка...",
					spinning : isSending } }
				renderItem={ (book) => (
					<List.Item
						key={ book.title }
						actions={ user && !roles.includes("admin")
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
							onPaginationChange(page)
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