import {
	List, Space, Form, Select, Input, Pagination
}from 'antd'
import {
	StarOutlined, LikeOutlined, MessageOutlined
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
	useDebounce
}from 'use-lodash-debounce'

const IconText = ({ icon, text }) => (
	<Space>
		{ React.createElement(icon) }
		{ text }
	</Space>
)
const ListBooks = () => {
	const dispatch = useDispatch()
	const [filter, setFilter] = useState({})
	const searchFilter = useDebounce(filter, 500)
	const [page, setPage] = useState(1)
	const [form] = Form.useForm()

	const { isSending, paged } = useSelector((state) => state.bookReducer)
	const { list: listGenres } = useSelector((state) => state.genreReducer)
	const { list: listAuthors } = useSelector((state) => state.authorReducer)

	const findGenres = params => {
		dispatch(genreActions.search(params))
	}
	const findAuthors = params => {
		dispatch(authorActions.search(params))
	}
	const getPages = (values) => {
		dispatch(bookActions.getPagedForUsers(values))
	}

	function onFilter(value, values){
		setFilter(values)
	}

	useEffect(() => {
		onPaginationChange(1)
	}, [searchFilter])

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
						actions={ [
							<IconText
								key="list-vertical-star-o"
								icon={ StarOutlined }
								text="156"
							/>,
							<IconText
								key="list-vertical-like-o"
								icon={ LikeOutlined }
								text="156"
							/>,
							<IconText
								key="list-vertical-message"
								icon={ MessageOutlined }
								text="2"
							/>
						] }
					>
						<List.Item.Meta
							avatar={ book.avatarId
								? (<img
									src={ `https://localhost:44313/api/Book/GetAvatar?Id=${ book.avatarId }` }
									width={ 300 }
								   />)
								: null }
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
						onChange={ onPaginationChange }
					/>)
				: null }
		</div>
	)
}
export default ListBooks