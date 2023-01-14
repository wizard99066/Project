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
	const { user, roles } = useSelector((state) => state.userReducer)

	useEffect(() => {
		if (user === undefined)
			dispatch(userActions.refreshUserData())
	}, [dispatch])

	return (
		<Switch>
			{ roles.includes("admin") &&
			(
				<Route
					exact
					component={ homeLoadables.LoadableAuthors }
					path="/authors"
				/>
			) }
			{ roles.includes("admin") &&
			(
				<Route
					exact
					component={ homeLoadables.LoadableBooks }
					path="/books"
				></Route>
			) }
			{ roles.includes("admin") &&
			(
				<Route
					exact
					component={ homeLoadables.LoadableGenres }
					path="/genres"
				></Route>) }
			{ roles.includes("admin") &&
			(
				<Route
					exact
					component={ homeLoadables.LoadablePublishings }
					path="/publishings"
				></Route>) }
			{ roles.length > 0 &&
			(
				<Route
					exact
					component={ homeLoadables.LoadableAccount }
					path="/account"
				></Route>) }
			<Route
				exact
				component={ homeLoadables.LoadableListBooks }
				path="/"
			></Route>
			<Route
				exact
				component={ NotFound }
				path="*"
			/>
		</Switch>
	)
}
export default Routes
