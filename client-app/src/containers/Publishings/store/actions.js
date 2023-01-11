import {
	publishingConstants
}from './constants'
import api from './api'
import {
	defAction
}from '../../../helpers/defaultAction'

export const publishingActions = {
	create,
	getPages,
	update,
	remove,
	restore,
	getAllPaged,
	clear

}

function create(params){
	const dispatchObj = {
		constants : publishingConstants.Create,
		service   : {
			func   : api.create,
			params : params
		}
	}
	return defAction(dispatchObj)
}

function getPages(params){
	const dispatchObj = {
		constants : publishingConstants.GetPages,
		service   : {
			func   : api.getPages,
			params : params
		}
	}
	return defAction(dispatchObj)
}
function update(params){
	const dispatchObj = {
		constants : publishingConstants.Update,
		service   : {
			func   : api.update,
			params : params
		}
	}
	return defAction(dispatchObj)
}
function remove(params){
	const dispatchObj = {
		constants : publishingConstants.Delete,
		service   : {
			func   : api.delete,
			params : params
		}
	}
	return defAction(dispatchObj)
}
function restore(params){
	const dispatchObj = {
		constants : publishingConstants.Restore,
		service   : {
			func   : api.restore,
			params : params
		}
	}
	return defAction(dispatchObj)
}

function getAllPaged(params){
	const dispatchObj = {
		constants : publishingConstants.GetAllPaged,
		service   : {
			func   : api.getAllPaged,
			params : params
		}
	}
	return defAction(dispatchObj)
}
function clear(params){
	const dispatchObj = {
		constants : publishingConstants.Clear,
		service   : {
			func   : api.clear,
			params : params
		}
	}
	return defAction(dispatchObj)
}
