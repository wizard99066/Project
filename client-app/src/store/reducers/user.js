import {
	userConstants
}from "../constants/user.constants"

const initialState = {
	//login;
	isLoading      : false,
	isLoginLoading : false,
	user           : undefined,
	roles          : [],
	userTypeName   : undefined
}

export default function (state = initialState, action){
	//login;
	switch (action.type){
		case userConstants.Login.REQUEST:
			return {
				...state,
				isLoginLoading : true,
				loginError     : null
			}
		case userConstants.Login.SUCCESS:
			let user = action.payload.result
			window.localStorage.setItem("user", JSON.stringify({
				userName     : user.userName,
				token        : user.token,
				refreshToken : user.refreshToken,
				sessionId    : user.sessionId
			}))
			return {
				...state,
				isLoginLoading : false,
				user           : user,
				roles          : user.roles,
				userTypeName   : user?.userType?.name
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
				isLoading            : true,
				isChangedProfileData : false
			}
		case userConstants.RefreshUserData.SUCCESS:
			user = action.payload.result
			if (!user)
				user = null
			return {
				...state,
				isLoading    : false,
				user         : user,
				roles        : user ? user.roles : [],
				userTypeName : user && user.userType ? user.userType.name : undefined
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
				isLoading    : false,
				user         : undefined,
				roles        : [],
				userTypeName : undefined,
				data         : action.payload.result
			}
		case userConstants.Logout.FAILURE:
			return {
				...state,
				isLoading    : false,
				user         : null,
				roles        : [],
				userTypeName : undefined,
				error        : action.err
			}
		default:
			return state
	}
}
