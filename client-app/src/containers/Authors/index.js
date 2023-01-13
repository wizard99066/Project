import {
	Button, Card, DatePicker, Form, Input, Modal, Pagination, Popconfirm, Table
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
import DeleteIcon from '../../components/Icons/delete.svg'
import RestoreIcon from '../../components/Icons/restore.svg'
import EditIcon from '../../components/Icons/edit.svg'
import SearchIcon from '../../components/Icons/search.svg'
import './style.css'
import Notifications from '../../helpers/Notifications'
import moment from 'moment/moment'

const Authors = () => {
	const dispatch = useDispatch()
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [filter, setFilter] = useState({})
	const [page, setPage] = useState(1)
	const [record, setRecord] = useState(null)
	const [form] = Form.useForm()

	const { isSending, changed, paged } = useSelector((state) => state.authorReducer)

	useEffect(() => {
		if (changed){
			Notifications.successNotice(changed)
			form.resetFields()
			setIsModalVisible(false)

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
				firstName : record.firstName,
				lastName  : record.lastName,
				birthday  : moment(record.birthday)
			})
		}
	}, [record])

	useEffect(() => {
		return () => {
			dispatch(authorActions.clear())
		}
	}, [])

	function getPaged(values){
		dispatch(authorActions.getPaged(values))
	}

	const remove = params => {
		dispatch(authorActions.remove(params))
	}
	const update = params => {
		dispatch(authorActions.update({ firstName : params.firstName,
			lastName  : params.lastName,
			birthday  : params.birthday,
		    id        : record.id }))
	}
	const restore = params => {
		dispatch(authorActions.restore(params))
	}

	function onCreate(values){
		dispatch(authorActions.create({
			firstName : values.firstName,
			lastName  : values.lastName,
			birthday  : values.birthday
		}))
	}

	function onFilter(value, values){
		setFilter({ ...values })
	}

	function onPaginationChange(value){
		setPage(value)
		getPaged({
			firstName : filter.firstName,
			lastName  : filter.lastName,
			birthday  : filter.birthday,
			page      : value,
			pageSize  : 10
		})
	}

	const columns = [
		{
		  title     : 'Имя',
		  dataIndex : 'firstName',
		  key       : 'firstName'
		},
		{
		  title     : 'Фамилия',
		  dataIndex : 'lastName',
		  key       : 'lastName'
		},
		{
		  title     : 'Дата рождения',
		  dataIndex : 'birthday',
		  key       : 'birthday'

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
						title={ !record.isDeleted ? 'Вы уверены, что хотите удалить данную запись?' : 'Вы уверены, что хотите восстановить данную запись?' }
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
						label="Имя"
						name="firstName"
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Фамилия"
						name="lastName"
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Дата рождения"
						name="birthday"
					>
					 <DatePicker />
					</Form.Item>
				</Form>
			</div>
			<Button
				className="addBtn"
				type="primary"
				onClick={ () => setIsModalVisible(true) }
			>
				Добавить автора
			</Button>
			<Table
				columns={ columns }
				dataSource={ paged.items }
				pagination={ false }
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
					setRecord(null)
				} }
		   ></Modal>

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
				  onFinish={ (values) => (record ? update(values) : onCreate(values)) }
		   >
					<Form.Item
						label="Имя"
						name="firstName"
						rules={ [
							{
								required : true,
								message  : 'Пожалуйста введите имя!'
							}
						] }
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Фамилия"
						name="lastName"
						rules={ [
							{
								required : true,
								message  : 'Пожалуйста введите фамилию!'
							}
						] }
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="День рождения"
						name="birthday"
						rules={ [
							{
								required : true,
								message  : 'Пожалуйста введите дату рождения!'
							}
						] }
					>
					 <DatePicker />
					</Form.Item>
					<Button
						className="myBtn"
						htmlType="submit"
						loading={ isSending }
						type="primary"
					>
						{ record ? "Обновить автора" : "Создать автора" }
					</Button>
				</Form>
			</Modal>
		</div>
	)
}

export default Authors
