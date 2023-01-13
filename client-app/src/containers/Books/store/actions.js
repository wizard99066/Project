import {
	bookConstants
}from './constants'
import api from './api'
import {
	defAction
}from '../../../helpers/defaultAction'

export const bookActions = {
	create,
	getPaged,
	update,
	remove,
	restore,
	getById,
	clear,
	getPagedForUsers
}

function create(params){
	const dispatchObj = {
		constants : bookConstants.Create,
		service   : {
			func   : api.create,
			params : params
		}
	}
	return defAction(dispatchObj)
}

function getPaged(params){
	const dispatchObj = {
		constants : bookConstants.GetPages,
		service   : {
			func   : api.getPages,
			params : params
		}
	}
	return defAction(dispatchObj)
}

function getPagedForUsers(params){
	const dispatchObj = {
		constants : bookConstants.GetPages,
		service   : {
			func   : api.getPagedForUsers,
			params : params
		}
	}
	return defAction(dispatchObj)
}

function update(params){
	const dispatchObj = {
		constants : bookConstants.Update,
		service   : {
			func   : api.update,
			params : params
		}
	}
	return defAction(dispatchObj)
}
function remove(params){
	const dispatchObj = {
		constants : bookConstants.Delete,
		service   : {
			func   : api.delete,
			params : params
		}
	}
	return defAction(dispatchObj)
}
function restore(params){
	const dispatchObj = {
		constants : bookConstants.Restore,
		service   : {
			func   : api.restore,
			params : params
		}
	}
	return defAction(dispatchObj)
}
function getById(params){
	const dispatchObj = {
		constants : bookConstants.GetById,
		service   : {
			func   : api.getById,
			params : params
		}
	}
	return defAction(dispatchObj)
}
function clear(params){
	const dispatchObj = {
		constants : bookConstants.Clear,
		service   : {
			func   : api.clear,
			params : params
		}
	}
	return defAction(dispatchObj)
}
