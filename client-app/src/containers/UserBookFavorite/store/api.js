import {
	requests
}from '../../../api/agent'

export default {
	create   : (params) => requests.getWithParams('/UserBookFavorite/Create', params),
	getPaged : (params) => requests.getWithParams('/UserBookFavorite/GetPaged', params),
	delete   : (params) => requests.getWithParams('/UserBookFavorite/Delete', params)
}