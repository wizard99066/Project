import {
	Button, Card, DatePicker, Form, Input, Modal, Pagination, Popconfirm, Select, Table
}from 'antd'
import React, {
	useEffect, useState
}from 'react'
import {
	useDispatch, useSelector
}from 'react-redux'
import {
	 bookActions
}from './store/actions'
import DeleteIcon from '../../components/Icons/delete.svg'
import RestoreIcon from '../../components/Icons/restore.svg'
import EditIcon from '../../components/Icons/edit.svg'
import SearchIcon from '../../components/Icons/search.svg'
import './style.css'
import Notifications from '../../helpers/Notifications'
import moment from 'moment/moment'
import {
	genreActions
}from '../Genres/store/actions'
import {
	multiply
}from 'lodash'

const Books = () => {
	const dispatch = useDispatch()
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [filter, setFilter] = useState({})
	const [page, setPage] = useState(1)
	const [record, setRecord] = useState(null)
	const [form] = Form.useForm()

	const { isSending, changed, paged } = useSelector((state) => state.bookReducer)
	const { paged:pagedGenre } = useSelector((state) => state.genreReducer)
	const { paged:pagedBook } = useSelector((state) => state.bookReducer)

	console.log(pagedGenre)
	useEffect(() => {
		if (changed){
			Notifications.successNotice(changed)
			onPaginationChange(1)
		}
	}, [changed])

	useEffect(() => {
		onPaginationChange(1)
	}, [filter])

	useEffect(() => {
		form.resetFields()
		if (record){
			form.setFieldsValue({
				nameBook       : record.nameBook,
				lastNameAuthor : record.lastNameAuthor,
				genre          : record.genre,
				description    : record.description
			})
		}
	}, [record])

	useEffect(() => {
		dispatch(genreActions.getPages({ page     : 1,
			pageSize : 999 }))
		return () => {
			dispatch(bookActions.clear())
		}
	}, [])

	const getPages = (values) => {
		dispatch(bookActions.getPaged(values))
	}

	const remove = params => {
		dispatch(bookActions.remove(params))
	}
	const update = params => {
		dispatch(bookActions.update(params))
	}
	const restore = params => {
		dispatch(bookActions.restore(params))
	}

	function onCreate(values){
		dispatch(bookActions.create({
			    name        : values.nameBook,
			authorIds   : values.lastNameAuthor,
			genreIds    : values.genre,
			description : values.description
		}))
		setIsModalVisible(false)
		form.resetFields()
	}

	function onFilter(value, values){
		setFilter({ ...values })
	}

	function onPaginationChange(value){
		setPage(value)
		getPages({
			name     : filter.nameBook,
			authorId : filter.lastNameAuthor,
			genreId  : filter.genre,
			page     : value,
			pageSize : 10
		})
	}

	//function handleChangeGenre(value){

	//}
	const columns = [
		{
		  title     : 'Название',
		  dataIndex : 'nameBook',
		  key       : 'nameBook'
		},
		{
		  title     : 'Автор',
		  dataIndex : 'lastNameAuthor',
		  key       : 'lastNameAuthor'
		},
		{
		  title     : 'Жанр',
		  dataIndex : 'genre',
		  key       : 'genre'

		},
		{
			title     : 'Описание',
			dataIndex : 'description',
			key       : 'description'

		},
		{
			dataIndex : "id",
			key       : 'id',
			width     : 100,
			render    : (id, record) => (
				<div className="changeIcon">
					<img
						src={ EditIcon }
						title="Редактировать"
						onClick={ () => {
							setIsModalVisible(true)
							setRecord(record)
						} }
					/>
					<Popconfirm
						cancelText="Нет"
						okText="Да"
						placement="left"
						title={ !record.isDeleted ? 'Вы уверены, что хотите удалить данную книгу?' : 'Вы уверены, что хотите восстановить данную книгу?' }
						onCancel={ (e) => {
							e.stopPropagation()
							return null
						} }
						onConfirm={ (e) => {
							e.stopPropagation()
							!record.isDeleted ? remove({ id }) : restore({ id })
						} }
					>
						<img
							src={ !record.isDeleted ? DeleteIcon :RestoreIcon }
							title={ !record.isDeleted ? "Удалить" : "Восстановить" }
						/>
					</Popconfirm>
				</div>
			)
		}
	  ]

	return (
		<div>

			<div
				className="filter"
			>
				<Form
				 labelCol={ { span: 5 } }
				  wrapperCol={ { span   : 16,
						offset : 1 } }
				  onValuesChange={ onFilter }
				>
					<Form.Item
						label="Название"
						name="nameBook"
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Автор"
						name="lastNameAuthor"
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Жанр"
						name="genre"
					>
                        	<Input />
					</Form.Item>
				</Form>
			</div>
			<Button
				className="addBtn"
				type="primary"
				onClick={ () => setIsModalVisible(true) }
			>
				Добавить книгу
			</Button>
			<Table
				columns={ columns }
				dataSource={ paged.items }
			>
			</Table>
			{ paged.count > 10
				? (
					<Pagination
						showQuickJumper
						size="small"
						total={ paged.count }
						onChange={ onPaginationChange }

						//current={ filters.page }
						//pageSize={ filters.pageSize }
					/>)
				: null }

		   <Modal
				className="modal"
				footer={ null }
				open={ isModalVisible }
				onCancel={ () => {
					form.resetFields()
					setIsModalVisible(false)
				} }
		   >
		   <Form
		   form={ form }
		  		labelCol={ { span: 5 } }
				  wrapperCol={ { span   : 16,
						offset : 1 } }
				  onFinish={ onCreate }
		   >
					<Form.Item
						label="Название"
						name="nameBook"
						rules={ [
							{
								required : true,
								message  : 'Пожалуйста введите название книги!'
							}
						] }
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Автор"
						name="lastNameAuthor"
						rules={ [
							{
								required : true,
								message  : 'Пожалуйста введите автора!'
							}
						] }
					>
						<Select mode="multiple">
							{ pagedBook?.items?.length > 0 ?
								pagedBook.items.map((genre) => (<Select.Option
									key={ book.id }
									value={ book.id }
								                                >
									{ ' ' }
									{ genre.nameBook }
									{ ' ' }
								</Select.Option>))
								: null }
						</Select>
					</Form.Item>
					<Form.Item
						label="Жанр"
						name="genre"
						rules={ [
							{
								required : true,
								message  : 'Пожалуйста введите жанр!'
							}
						] }
					>
						<Select mode="multiple">
							{ pagedGenre?.items?.length > 0 ?
								pagedGenre.items.map((genre) => (<Select.Option
									key={ genre.id }
									value={ genre.id }
								                                 >
									{ ' ' }
									{ genre.nameGenre }
									{ ' ' }
								</Select.Option>))
								: null }
						</Select>

					</Form.Item>
					<Form.Item
						label="Описание"
						name="description"
						rules={ [
							{
								required : true,
								message  : 'Пожалуйста введите описание книги!'
							}
						] }
					>
						<Input />
					</Form.Item>
					<Button
						className="myBtn"
						htmlType="submit"
						loading={ isSending }
						type="primary"
					>
						{ record ? "Обновить книгу" : "Добавить книгу" }
					</Button>
				</Form>
			</Modal>
		</div>
	)
}

export default Books
