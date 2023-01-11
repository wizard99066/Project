import {
	genreConstants
}from './constants'
import api from './api'
import {
	defAction
}from '../../../helpers/defaultAction'

export const genreActions = {
	create,
	getPages,
	update,
	remove,
	restore,
	clear

}

function create(params){
	const dispatchObj = {
		constants : genreConstants.Create,
		service   : {
			func   : api.create,
			params : params
		}
	}
	return defAction(dispatchObj)
}

function getPages(params){
	const dispatchObj = {
		constants : genreConstants.GetPages,
		service   : {
			func   : api.getPages,
			params : params
		}
	}
	return defAction(dispatchObj)
}
function update(params){
	const dispatchObj = {
		constants : genreConstants.Update,
		service   : {
			func   : api.update,
			params : params
		}
	}
	return defAction(dispatchObj)
}
function remove(params){
	const dispatchObj = {
		constants : genreConstants.Delete,
		service   : {
			func   : api.delete,
			params : params
		}
	}
	return defAction(dispatchObj)
}
function restore(params){
	const dispatchObj = {
		constants : genreConstants.Restore,
		service   : {
			func   : api.restore,
			params : params
		}
	}
	return defAction(dispatchObj)
}
function clear(params){
	const dispatchObj = {
		constants : genreConstants.Clear,
		service   : {
			func   : api.clear,
			params : params
		}
	}
	return defAction(dispatchObj)
}

