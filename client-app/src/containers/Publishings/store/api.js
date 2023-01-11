import {
	requests
}from '../../../api/agent'

export default {
	create   : (params) => requests.post('/Publishing/Create', params),
	getPages : (params) => requests.getWithParams('/Publishing/GetPages', params),
	update   : (params) => requests.post('/Publishing/Update', params),
	delete   : (params) => requests.getWithParams('/Publishing/Delete', params),
	restore  : (params) => requests.getWithParams('/Publishing/Restore', params),
	getAll   : (params) => requests.getWithParams('/Publishing/GetAll', params)
}