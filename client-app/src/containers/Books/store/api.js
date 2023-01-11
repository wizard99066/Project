import {
	requests
}from '../../../api/agent'

export default {
	create   : (params) => requests.post('/Book/Create', params),
	getPages : (params) => requests.getWithParams('/Book/GetPages', params),
	update   : (params) => requests.post('/Book/Update', params),
	delete   : (params) => requests.getWithParams('/Book/Delete', params),
	restore  : (params) => requests.getWithParams('/Book/Restore', params),
	getById  : (params) => requests.getWithParams('/Book/GetById', params)

}