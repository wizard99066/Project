import {
	requests
}from '../../../api/agent'

export default {
	create   : (params) => requests.getWithParams('/UserBookWantToRead/Create', params),
	getPaged : (params) => requests.getWithParams('/UserBookWantToRead/GetPaged', params),
	delete   : (params) => requests.getWithParams('/UserBookWantToRead/Delete', params)
}