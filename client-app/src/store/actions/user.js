import {
	userConstants
}from '../constants/'
import {
	defAction
}from '../../helpers/defaultAction'
import agent from '../../api/agent'
import history from '../../helpers/history'

export const userActions = {
	login,
	logout,
	refreshUserData
}

function login(values){
	const dispatchObj = {
		constants : userConstants.Login,
		service   : {
			func   : agent.User.login,
			params : values
		}
	}
	return defAction(dispatchObj)
}

function logout(){
	const jsonUser = window.localStorage.getItem('user')
	const sessionId = JSON.parse(jsonUser).sessionId
	const dispatchObj = {
		constants   : userConstants.Logout,
		sucFunction : (url) => {
			history.push('/')
			window.localStorage.removeItem("idToken")
			if (!(url === false || url === true || url === undefined || url === null || url === ""))
				window.location.href = url
		},
		service: {
			func   : agent.User.logout,
			params : {
				sessionId: sessionId
			}
		}
	}
	return defAction(dispatchObj)
}

function refreshUserData(){
	const dispatchObj = {
		constants : userConstants.RefreshUserData,
		service   : {
			func: agent.User.refreshUserData
		}
	}
	return defAction(dispatchObj)
}
