import {
	userConstants
}from "../constants/user.constants"

const initialState = {
	//login;
	isLoading       : false,
	isLoginLoading  : false,
	registerMessage : null,
	user            : undefined,
	roles           : []
}

export default function (state = initialState, action){
	//login;
	switch (action.type){
		case userConstants.Login.REQUEST:
			return {
				...state,
				isLoginLoading  : true,
				registerMessage : null
			}
		case userConstants.Login.SUCCESS:
			window.localStorage.setItem("user", JSON.stringify({
				userName     : action.payload.result.userName,
				token        : action.payload.result.token,
				refreshToken : action.payload.result.refreshToken,
				sessionId    : action.payload.result.sessionId
			}))
			return {
				...state,
				isLoginLoading : false,
				user           : action.payload.result,
				roles          : action.payload.result.roles
			}
		case userConstants.Login.FAILURE:
			return {
				...state,
				isLoginLoading: false
			}

		//refreshUserData;
		case userConstants.RefreshUserData.REQUEST:
			return {
				...state,
				isLoading: true
			}
		case userConstants.RefreshUserData.SUCCESS:
			return {
				...state,
				isLoading : false,
				user      : action.payload.result,
				roles     : action.payload.result ? action.payload.result.roles : []
			}
		case userConstants.RefreshUserData.FAILURE:
			return {
				...state,
				isLoading: false
			}

		//logout;
		case userConstants.Logout.REQUEST:
			return {
				...state,
				isLoading: true
			}
		case userConstants.Logout.SUCCESS:
			window.localStorage.removeItem("user")
			return {
				...state,
				isLoading : false,
				user      : null,
				roles     : []
			}
		case userConstants.Logout.FAILURE:
			return {
				...state,
				isLoading : false,
				user      : null,
				roles     : []
			}

		//register;
		case userConstants.Register.REQUEST:
			return {
				...state,
				isLoginLoading  : true,
				registerMessage : null
			}
		case userConstants.Register.SUCCESS:
			return {
				...state,
				registerMessage : "Вы успешно зарегистрированы в системе.",
				isLoginLoading  : false
			}
		case userConstants.Register.FAILURE:
			return {
				...state,
				isLoginLoading: false
			}
		default:
			return state
	}
}
