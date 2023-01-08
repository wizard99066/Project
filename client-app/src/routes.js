import React, {
	useEffect
}from "react"
import {
	Switch, Route
}from "react-router-dom"
import {
	homeLoadables
}from "./loadables"
import Authors from "./containers/Authors/index"
import NotFound from "./components/NotFound"
import {
	useSelector, useDispatch
}from "react-redux"
import {
	userActions
}from "./store/actions"

const Routes = () => {
	const dispatch = useDispatch()
	const { user } = useSelector((state) => state.userReducer)

	useEffect(() => {
		if (user === undefined)
			dispatch(userActions.refreshUserData())
	}, [dispatch])

	return (
		<Switch>
			<Route
				exact
				component={ homeLoadables.LoadableAuthors }
				path="/authors"
			></Route>
			<Route
				exact
				component={ homeLoadables.LoadableHome }
				path="/"
			/>
			<Route
				exact
				component={ homeLoadables.LoadableLogin }
				path="/login"
			/>
			<Route
				exact
				component={ homeLoadables.LoadablePasswordRecovery }
				path="/passwordRecovery"
			/>
			<Route
				exact
				component={ NotFound }
				path="*"
			/>
		</Switch>
	)
}
export default Routes
