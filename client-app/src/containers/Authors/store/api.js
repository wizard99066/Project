import {
	requests
}from '../../../api/agent'

export default {
	create   : (params) => requests.post('/Author/Create', params),
	getPaged : (params) => requests.getWithParams('/Author/GetPaged', params)
}