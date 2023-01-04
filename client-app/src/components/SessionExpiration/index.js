import {
	Modal
}from "antd"
import i18n from "./localization"

const message = () => {
	Modal.confirm({
		title             : i18n.title[Number(window.localStorage.getItem("language") == "ru")],
		content           : i18n.content[Number(window.localStorage.getItem("language") == "ru")],
		cancelButtonProps : { style: { display: "none" } },
		maskClosable      : false,
		centered          : true,
		onOk              : () => {
			window.localStorage.removeItem("user")
			window.location.href = "/login"
		}
	})
}

export default message
