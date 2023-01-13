import {
	Button, Form, Input, Modal, Pagination, Popconfirm, Table
}from 'antd'
import React, {
	useEffect, useState
}from 'react'
import {
	useDispatch, useSelector
}from 'react-redux'
import {
	genreActions
}from './store/actions'
import DeleteIcon from '../../components/Icons/delete.svg'
import RestoreIcon from '../../components/Icons/restore.svg'
import EditIcon from '../../components/Icons/edit.svg'
import './style.css'
import Notifications from '../../helpers/Notifications'
import {
	useDebounce
}from 'use-lodash-debounce'

const Genres = () => {
	const dispatch = useDispatch()
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [filter, setFilter] = useState({})
	const [page, setPage] = useState(1)
	const [record, setRecord] = useState(null)
	const [form] = Form.useForm()
	const searchFilter = useDebounce(filter, 500)

	const { isSending, changed, paged } = useSelector((state) => state.genreReducer)

	useEffect(() => {
		if (changed){
			Notifications.successNotice(changed)
			onPaginationChange(page)
			setRecord(null)
			form.resetFields()
			setIsModalVisible(false)
		}
	}, [changed])

	useEffect(() => {
		onPaginationChange(1)
	}, [searchFilter])

	useEffect(() => {
		form.resetFields()
		if (record){
			form.setFieldsValue({
				nameGenre: record.nameGenre
			})
		}
	}, [record])

	function getPages(values){
		dispatch(genreActions.getPages(values))
	}

	const remove = params => {
		dispatch(genreActions.remove(params))
	}
	const update = params => {
		dispatch(genreActions.update(params))
	}
	const restore = params => {
		dispatch(genreActions.restore(params))
	}
	const create = params => {
		dispatch(genreActions.create(params))
	}

	function onCreateAndUpdate(values){
		if (record){
			update({
				name : values.nameGenre,
				id   : record.id
			})
		}
		else {
			create({
				name: values.nameGenre
			})
		}
	}

	function onFilter(value, values){
		setFilter(values)
	}

	function onPaginationChange(value){
		setPage(value)
		getPages({
			name      : searchFilter.name,
			page      : value,
			pageSize  : 10,
			isDeleted : true
		})
	}

	const columns = [
		{
		  title     : '',
		  dataIndex : 'nameGenre',
		  key       : 'nameGenre'
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
						title={ !record.isDeleted ? 'Вы уверены, что хотите удалить данный жанр?' : 'Вы уверены, что хотите восстановить данный жанр?' }
						onCancel={ (e) => {
							e.stopPropagation()
							return null
						} }
						onConfirm={ (e) => {
							e.stopPropagation()
							!record.isDeleted ? remove({ id: id }) : restore({ id: id })
						} }
					>
						<img
							src={ !record.isDeleted ? DeleteIcon : RestoreIcon }
							title={ !record.isDeleted ? "Удалить" : "Восстановить" }
						/>
					</Popconfirm>
				</div>
			)
		}
	  ]

	  return (
		<div className="page">
			<div className="filter">
				<Form
				  layout="inline"
				  onValuesChange={ onFilter }
				>
					<Form.Item
						name="name"
						style={ { width: "45%" } }
					>
						<Input placeholder="Введите название жанра" />
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							onClick={ () => setIsModalVisible(true) }
						>
							Добавить жанр
						</Button>
					</Form.Item>
				</Form>
			</div>
			<Table
				columns={ columns }
				dataSource={ paged.items }
				loading={ { tip      : "Загрузка...",
					spinning : isSending } }
				pagination={ false }
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
						onChange={ (page) => onPaginationChange(page) }
					/>)
				: null }

		   <Modal
				className="modal"
				footer={ null }
				open={ isModalVisible }
				width="800px"
				onCancel={ () => {
					setRecord(null)
					form.resetFields()
					setIsModalVisible(false)
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
						label="Название жанра"
						name="nameGenre"
						rules={ [
							{
								required : true,
								message  : 'Пожалуйста, введите название жанра!'
							}
						] }
					>
						<Input placeholder="Введите название жанра" />
					</Form.Item>
					<Button
						className="myBtn"
						htmlType="submit"
						loading={ isSending }
						type="primary"
					>
						{ record ? "Обновить жанр" : "Добавить жанр" }
					</Button>
				</Form>
			</Modal>
		</div>
	)
}

export default Genres
