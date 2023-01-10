import {
	requests
}from '../../../api/agent'

export default {
	create   : (params) => requests.post('/Genre/Create', params),
	getPaged : (params) => requests.getWithParams('/Genre/GetPaged', params),
	update   : (params) => requests.post('/Genre/Update', params),
	delete   : (params) => requests.getWithParams('/Genre/Delete', params),
	restore  : (params) => requests.getWithParams('/Genre/Restore', params),
	getAll   : (params) => requests.getWithParams('/Genre/GetAll', params)

}