import {
	requests
}from '../../../api/agent'

export default {
	create      : (params) => requests.post('/Author/Create', params),
	getPaged    : (params) => requests.getWithParams('/Author/GetPaged', params),
	update      : (params) => requests.post('/Author/Update', params),
	delete      : (params) => requests.getWithParams('/Author/Delete', params),
	restore     : (params) => requests.getWithParams('/Author/Restore', params),
	getAllPaged : (params) => requests.getWithParams('/Author/GetAllPaged', params),
	search      : (params) => requests.getWithParams('/Author/Search', params)

}