import {
	createBrowserHistory
}from "history"

const history = createBrowserHistory()
let prevLocation = {}
history.listen((location) => {
	const pathChanged = prevLocation.pathname !== location.pathname
	const hashChanged = prevLocation.hash !== location.hash
	if (pathChanged || hashChanged)
		window.scrollTo(0, 0)
	prevLocation = location
})

export default history
