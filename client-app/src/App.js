import React, {
	useEffect
}from "react"
import {
	Layout, ConfigProvider
}from "antd"
import {
	useDispatch,
	useSelector
}from "react-redux"
import {
	hot
}from "react-hot-loader/root"
import {
	Router
}from "react-router-dom"
import history from "./helpers/history"
import "./index.css"
import "./App.css"
import byBY from 'antd/lib/locale/by_BY'
import ruRU from 'antd/lib/locale/ru_RU'
import Routes from "./routes"
import Bowser from "bowser"
import Navigation from "./containers/Menu/index"
import ErrorBoundary from "./components/ErrorBoundary"
const { Content } = Layout

const App = () => {
	const isRu = useSelector(state => state.globalReducer.isRu)

	return (
		<Router history={ history }>
			<ConfigProvider locale={ isRu ? ruRU : byBY }>
				<Layout
					className={ (Bowser.name === 'Internet Explorer' || Bowser.name === 'Microsoft Edge') ? "ie-browser" : null }
					style={ {
						maxHeight : "100%",
						minHeight : "100vh"
					} }
				>
					<Navigation />
					<Layout
						className="main-middle-layout"
						style={ {
						  backgroundColor : '#FFFFFF',
						  paddingTop      : "20px"
						} }
					>
						<Content
							style={ {
								display       : 'flex',
								flexDirection : 'column'
							} }
						>
							<ErrorBoundary isRu={ isRu }>
								<Routes />
							</ErrorBoundary>
						</Content>
					</Layout>
				</Layout>
			</ConfigProvider>
		</Router>
	)
}
export default hot(App)
