import {
	Button, Form, Input, Modal, Pagination, Popconfirm, Select, Table, Upload
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
import './style.css'
import Notifications from '../../helpers/Notifications'
import {
	genreActions
}from '../Genres/store/actions'
import {
	authorActions
}from '../Authors/store/actions'
import {
	PlusOutlined
}from '@ant-design/icons'
import {
	useDebounce
}from 'use-lodash-debounce'
const getBase64 = (file) => new Promise((resolve, reject) => {
	const reader = new FileReader()
	reader.readAsDataURL(file)
	reader.onload = () => resolve(reader.result)
	reader.onerror = (error) => reject(error)
})
const Books = () => {
	const dispatch = useDispatch()
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [filter, setFilter] = useState({})
	const searchFilter = useDebounce(filter, 500)
	const [page, setPage] = useState(1)
	const [record, setRecord] = useState(null)
	const [previewOpen, setPreviewOpen] = useState(false)
	const [previewImage, setPreviewImage] = useState('')
	const [previewTitle, setPreviewTitle] = useState('')
	const [avatar, setAvatar] = useState([])
	const [form] = Form.useForm()

	const { isSending, changed, paged } = useSelector((state) => state.bookReducer)
	const { list: listGenre } = useSelector((state) => state.genreReducer)
	const { list: listAuthor } = useSelector((state) => state.authorReducer)

	useEffect(() => {
		if (changed){
			Notifications.successNotice(changed)
			onPaginationChange(page)
			setRecord(null)
			setIsModalVisible(false)
			setAvatar([])
			form.resetFields()
		}
	}, [changed])

	useEffect(() => {
		onPaginationChange(1)
	}, [searchFilter])

	useEffect(() => {
		form.resetFields()
		if (record){
			findGenres({ ids: record.genresId })
			findAuthors({ ids: record.authorsId })
			form.setFieldsValue({
				nameBook       : record.nameBook,
				lastNameAuthor : record.authorsId,
				genre          : record.genresId,
				description    : record.description
			})
			if (record.avatarId){
				setAvatar([
					{
						name : "обложка.jpg",
						url  : `https://localhost:44313/api/Book/GetAvatar?Id=${ record.avatarId }`
					}
				])
			}
		}
	}, [record])

	const getPages = (values) => {
		dispatch(bookActions.getPaged(values))
	}

	const remove = params => {
		dispatch(bookActions.remove(params))
	}
	const update = params => {
		dispatch(bookActions.update(params))
	}
	const create = params => {
		dispatch(bookActions.create(params))
	}
	const restore = params => {
		dispatch(bookActions.restore(params))
	}

	const findGenres = params => {
		dispatch(genreActions.search(params))
	}
	const findAuthors = params => {
		dispatch(authorActions.search(params))
	}

	function onCreateAndUpdate(values){
		const formData = new FormData()
		formData.append("name", values.nameBook)
		values.lastNameAuthor.forEach(author => {
			formData.append("authorIds", author)
		})
		values.genre.forEach(genre => {
			formData.append("genreIds", genre)
		})
		formData.append("description", values.description)
		formData.append("file", avatar[0]?.originFileObj)
		formData.append("isEditAvatar", Boolean(!avatar[0]?.url))
		formData.append("id", record?.id)
		if (record)
			update(formData)
		else
			create(formData)
	}

	function onFilter(value, values){
		setFilter(values)
	}

	function onPaginationChange(value){
		setPage(value)
		getPages({
			name     : searchFilter.nameBook,
			authorId : searchFilter.lastNameAuthor,
			genreId  : searchFilter.genre,
			page     : value,
			pageSize : 10
		})
	}

	const columns = [
		{
		  title     : 'Название',
		  dataIndex : 'nameBook',
		  key       : 'nameBook',
		  width     : "20%"
		},
		{
		  title     : 'Автор',
		  dataIndex : 'lastNameAuthor',
		  key       : 'lastNameAuthor',
		  width     : "20%"
		},
		{
		  title     : 'Жанр',
		  dataIndex : 'genre',
		  key       : 'genre',
		  width     : "10%"

		},
		{
			title     : 'Описание',
			dataIndex : 'description',
			key       : 'description',
			width     : "45%",
			ellipsis  : true
		},
		{
			dataIndex : "id",
			key       : 'id',
			width     : "5%",
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

	function beforeUpload(file){
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
		if (!isJpgOrPng)
			Notifications.errorNotice(`Неверный формат`, `Для загрузки доступны файлы форматов: ".jpg", "jpeg", ".png"`)
		return isJpgOrPng? false : Upload.LIST_IGNORE
	}

	const handlePreview = async (file) => {
		if (!file.url && !file.preview)
		  file.preview = await getBase64(file.originFileObj)
		setPreviewImage(file.url || file.preview)
		setPreviewOpen(true)
		setPreviewTitle(file.name)
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
						name="nameBook"
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Автор"
						name="lastNameAuthor"
					>
						<Select
							filterOption={ false }
							mode="multiple"
							notFoundContent={ null }
							onSearch={ (value) => findAuthors({ name: value }) }
						>
							{
								listAuthor?.map((author) => (
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
						name="genre"
					>
                        	<Select
							filterOption={ false }
							mode="multiple"
							notFoundContent={ null }
							onSearch={ (value) => findGenres({ name: value }) }
                        	>
							{
								listGenre?.map((genre) => (
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
				loading={ { tip      : "Загрузка...",
					spinning : isSending } }
				pagination={ false }
				scroll={ { x: 1200 } }
			>
			</Table>
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

		   <Modal
				className="modal"
				footer={ null }
				open={ isModalVisible }
				onCancel={ () => {
					form.resetFields()
					setIsModalVisible(false)
					setRecord(null)
					setAvatar([])
				} }
		   >
		   		<Form
		   			form={ form }
		  			labelCol={ { span: 5 } }
					wrapperCol={ { span   : 16,
						offset : 1 } }
					onFinish={ onCreateAndUpdate }
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
						<Select
							filterOption={ false }
							mode="multiple"
							notFoundContent={ null }
							onSearch={ (value) => findAuthors({ name: value }) }
						>
							{
								listAuthor?.map((author) => (
									<Select.Option
										key={ author.id }
										label={ author.id }
										value={ author.id }
									>
										{ `${ author.lastName } ${ author.firstName }` }
									</Select.Option>))
							}

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
						<Select
							filterOption={ false }
							mode="multiple"
							notFoundContent={ null }
							onSearch={ (value) => findGenres({ name: value }) }
						>
							{
								listGenre?.map((genre) => (
									<Select.Option
										key={ genre.id }
										value={ genre.id }
									>
										{ genre.name }
									</Select.Option>))
							}
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
					<Form.Item
						label="Картинка"
						name="file"
					>
						<Upload
							beforeUpload={ beforeUpload }
							customRequest={ null }
							fileList={ avatar }
							listType="picture-card"
							maxCount={ 1 }
							onChange={ ({ fileList: newFileList }) => setAvatar(newFileList) }
							onPreview={ handlePreview }
						>
							<div>
								<PlusOutlined />
								<div
									style={ {
										marginTop: 8
									} }
								>
        							Загрузить файл
								</div>
							</div>
						</Upload>
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
			<Modal
				footer={ null }
				open={ previewOpen }
				title={ previewTitle }
				onCancel={ () => setPreviewOpen(false) }
			>
				<img
					alt="example"
					src={ previewImage }
					style={ {
						width: '100%'
					} }
				/>
			</Modal>
		</div>
	)
}

export default Books
