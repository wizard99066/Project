import React from 'react'
import {
	Button, Tooltip, Popconfirm
}from 'antd'
import 'antd/lib/tooltip/style/index.css'
import "antd/lib/popover/style/index.css"
import './style.css'

const ApproveButtons = ({
	isRu, isApproveSending, approveFunc, id, ecp
}) => {
	return (
		<Button.Group
			className="approve_buttons_group"
			style={ {
				width: '100%'
			} }
		>
			<Tooltip
				placement="left"
				title={ isRu ? 'Принять' : 'Прыняць' }
			>
				<Popconfirm
					cancelText={ isRu ? "Нет" : "Не" }
					okText={ isRu ? "Да" : "Так" }
					title={ isRu ? "Прикрепить ЭЦП?" : "Прымацаваць ЭЛП?" }
					onCancel={ () => approveFunc(true, id, false) }
					onConfirm={ () => approveFunc(true, id, true) }
				>
					<Button
						className="button_Ok"
						disabled={ isApproveSending }

						//onClick={() => approveFunc(true, id)}
					>
						{ /* <CheckOutlined /> */ }
					</Button>
				</Popconfirm>
			</Tooltip>

			<Tooltip
				placement="right"
				title={ isRu ? 'Отклонить' : 'Адхіліць' }
			>
				<Popconfirm
					cancelText={ isRu ? "Нет" : "Не" }
					okText={ isRu ? "Да" : "Так" }
					title={ isRu ? "Прикрепить ЭЦП?" : "Прымацаваць ЭЛП?" }
					onCancel={ () => approveFunc(false, id, false) }
					onConfirm={ () => approveFunc(false, id, true) }
				>
					<Button
						className="button_None"
						disabled={ isApproveSending }

						//onClick={() => approveFunc(false, id)}

					>
						{ /* <CloseOutlined /> */ }
					</Button>
				</Popconfirm>
			</Tooltip>

		</Button.Group>
	)
}
export default ApproveButtons