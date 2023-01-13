import {
	requests
}from '../../../api/agent'

export default {
	create   : (params) => requests.post('/Genre/Create', params),
	getPages : (params) => requests.getWithParams('/Genre/GetPages', params),
	update   : (params) => requests.post('/Genre/Update', params),
	delete   : (params) => requests.getWithParams('/Genre/Delete', params),
	restore  : (params) => requests.getWithParams('/Genre/Restore', params),
	getAll   : (params) => requests.getWithParams('/Genre/GetAll', params),
	search   : (params) => requests.post('/Genre/Search', params)

}