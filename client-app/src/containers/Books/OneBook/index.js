import './style.css'
import React from 'react'
import {
	useLocation
}from 'react-router'
const OneBook = () => {
	const id = window.location.pathname.split('/')[2]
	return (<>
    BOOK WITH ID =
		{ ' ' }
		{ id }
	</>)
}
export default OneBook
