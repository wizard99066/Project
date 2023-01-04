import {
	notification
}from "antd"
import "./style.css"

const notice = (type, title, message = "", duration = null) => {
	notification[type]({
		message     : title,
		description : message,
		placement   : "bottomLeft",
		duration    : type === "success" ? 5 : duration
	})
}

export default notice
