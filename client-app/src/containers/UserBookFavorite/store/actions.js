import {
	userBookFavoriteConstants
}from './constants'
import api from './api'
import {
	defAction
}from '../../../helpers/defaultAction'

export const userBookFavoriteActions = {
	create,
	getPaged,
	remove,
	clear
}

function create(params){
	const dispatchObj = {
		constants : userBookFavoriteConstants.Create,
		service   : {
			func   : api.create,
			params : params
		}
	}
	return defAction(dispatchObj)
}

function getPaged(params){
	const dispatchObj = {
		constants : userBookFavoriteConstants.GetPaged,
		service   : {
			func   : api.getPaged,
			params : params
		}
	}
	return defAction(dispatchObj)
}

function remove(params){
	const dispatchObj = {
		constants : userBookFavoriteConstants.Delete,
		service   : {
			func   : api.delete,
			params : params
		}
	}
	return defAction(dispatchObj)
}

function clear(){
	return (dispatch) => dispatch({
		type: userBookFavoriteConstants.Clear
	})
}