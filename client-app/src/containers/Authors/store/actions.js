import {
	authorConstants
}from './constants'
import api from './api'
import {
	defAction
}from '../../../helpers/defaultAction'

export const authorActions = {
	create,
	getPaged,
	update,
	remove,
	restore,
	getAllPaged,
	clear,
	search

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
function update(params){
	const dispatchObj = {
		constants : authorConstants.Update,
		service   : {
			func   : api.update,
			params : params
		}
	}
	return defAction(dispatchObj)
}
function remove(params){
	const dispatchObj = {
		constants : authorConstants.Delete,
		service   : {
			func   : api.delete,
			params : params
		}
	}
	return defAction(dispatchObj)
}
function restore(params){
	const dispatchObj = {
		constants : authorConstants.Restore,
		service   : {
			func   : api.restore,
			params : params
		}
	}
	return defAction(dispatchObj)
}

function getAllPaged(params){
	const dispatchObj = {
		constants : authorConstants.GetAllPaged,
		service   : {
			func   : api.getAllPaged,
			params : params
		}
	}
	return defAction(dispatchObj)
}
function clear(params){
	const dispatchObj = {
		constants : authorConstants.Clear,
		service   : {
			func   : api.clear,
			params : params
		}
	}
	return defAction(dispatchObj)
}
function search(params){
	const dispatchObj = {
		constants : authorConstants.Search,
		service   : {
			func   : api.search,
			params : params
		}d
	return defAction(dispatchObj)
}
