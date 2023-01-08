import {
	authorConstants
}from './constants'
import api from './api'
import {
	defAction
}from '../../../helpers/defaultAction'

export const authorActions = {
	create,
	getPaged
}

function create(params){
	const dispatchObj = {
		constants : authorConstants.Create,
		service   : {
			func   : api.create,
			params : params
		}
	}
	return defAction(dispatchObj)
}

function getPaged(params){
	const dispatchObj = {
		constants : authorConstants.GetPaged,
		service   : {
			func   : api.getPaged,
			params : params
		}
	}
	return defAction(dispatchObj)
}