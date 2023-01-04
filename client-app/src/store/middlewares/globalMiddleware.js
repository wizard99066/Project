import {
	userConstants
}from "../constants/user.constants"
import {
	globalActions
}from "../../containers/Menu/actions"

const globalMiddleware = (store) => (next) => (action) => {
	switch (action.type){
		case userConstants.RefreshUserData.REQUEST :
		case userConstants.Login.REQUEST :
			store.dispatch(globalActions.setGlobalLoadingVisible(true))
			break
		case userConstants.RefreshUserData.SUCCESS :
		case userConstants.RefreshUserData.FAILURE :
		case userConstants.Login.SUCCESS :
		case userConstants.Login.FAILURE :
			store.dispatch(globalActions.setGlobalLoadingVisible(false))
			break
		default:
			break
	}
	next(action)
}

export default globalMiddleware
