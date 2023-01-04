import {
	Link
}from 'react-router-dom'
import {
	Menu, Layout, Row, Col
}from 'antd'
import React, {
	useEffect
}from 'react'
import {
	useDispatch,
	useSelector
}from 'react-redux'
import i18n from './localization'
import './style.css'
const {
	Footer
} = Layout

const linkFooterItems = [
	'/news',
	'/contacts',
	'/help'
]
const logoTextH = {
	0 : "Сістэма",
	1 : "Система"
}
export default () => {
	const dispatch = useDispatch()
	const isRu = useSelector((state) => state.globalReducer.isRu)
	return (
		<>
			<Footer className="footer">
				<nav>
					<Row className="fstRow">
						<Col
							className="col1"
							span={ 8 }
						>
							<Link to="/">
								<div>
									{ logoTextH[isRu] }
								</div>
							</Link>
						</Col>
					</Row>
				</nav>
			</Footer>
		</>
	)
}

