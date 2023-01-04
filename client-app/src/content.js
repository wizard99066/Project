import {
	Layout
}from "antd"
import React from "react"

const { Content } = Layout
import Routes from "./routes"

const ContentMain = () => {
	return (
		<Content>
			<Routes />
		</Content>
	)
}
export default ContentMain