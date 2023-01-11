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
	genreActions, publishingActions
}from './store/actions'
import DeleteIcon from '../../components/Icons/delete.svg'
import RestoreIcon from '../../components/Icons/restore.svg'
import EditIcon from '../../components/Icons/edit.svg'
import SearchIcon from '../../components/Icons/search.svg'
import './style.css'
import Notifications from '../../helpers/Notifications'
import moment from 'moment/moment'

const Publishings = () => {
	const dispatch = useDispatch()
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [filter, setFilter] = useState({})
	const [page, setPage] = useState(1)
	const [record, setRecord] = useState(null)
	const [form] = Form.useForm()

	const { isSending, changed, paged } = useSelector((state) => state.publishingReducer)

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
				name: record.name
			})
		} [record]
	})
	useEffect(() => {
		return () => {
			dispatch(publishingActions.clear())
		}
	}, [])

	function getPages(values){
		dispatch(publishingActions.getPages(values))
	}

	const remove = params => {
		dispatch(publishingActions.remove(params))
	}
	const update = params => {
		dispatch(publishingActions.update(params))
	}
	const restore = params => {
		dispatch(publishingActions.restore(params))
	}

	function onCreate(values){
		dispatch(publishingActions.create({
			name: record.name
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
			name     : record.name,
			page     : value,
			pageSize : 10
		})
	}

	const columns = [
		{
		  title     : 'Название издательства',
		  dataIndex : 'name',
		  key       : 'name'
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
						title={ !record.isDeleted ? 'Вы уверены, что хотите удалить данное издательство?' : 'Вы уверены, что хотите восстановить данную книгу?' }
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
						label="Название издательства"
						name="name"
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
				Добавить издательство
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
						label="Название издательства"
						name="name"
						rules={ [
							{
								required : true,
								message  : 'Пожалуйста введите название издательства!'
							}
						] }
					>
						<Input />
					</Form.Item>

					 <DatePicker />

					<Button
						className="myBtn"
						htmlType="submit"
						loading={ isSending }
						type="primary"
					>
						{ record ? "Обновить издательство" : "Добавить издательство" }
					</Button>
				</Form>
			</Modal>
		</div>
	)
}

export default Publishings
