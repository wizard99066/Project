import {
	requests
}from '../../../api/agent'

export default {
	create   : (params) => requests.getWithParams('/UserBookRead/Create', params),
	getPaged : (params) => requests.getWithParams('/UserBookRead/GetPaged', params),
	delete   : (params) => requests.getWithParams('/UserBookRead/Delete', params)
}