import {
	alertConstants
}from '../constants'
import Notifications from '../../helpers/Notifications'

const errorMiddleware = (store) => (next) => (action) => {
	if (action.payload?.err){
		if (action.payload.err.data){
			if ((action.payload.err.data instanceof ArrayBuffer && action.payload.err.data.byteLength !== undefined) || (action.payload.err.data instanceof Blob && action.payload.err.data.size !== undefined)){
				const reader = new FileReader()
				reader.onloadend = function (){
					const err = JSON.parse(reader.result)
					const code = err?.code ?? ""
					const description = (err?.errors instanceof Array ? err.errors.map(e => e.message).join(", ") : err?.errors) ?? ""
					Notifications.errorNotice(code, description)
				}
				reader.readAsText(new Blob([action.payload.err.data], { type: 'text/plain' }))
			}
			else {
				const code = action.payload.err.data.code ?? ""
				const description = (action.payload.err.data.errors instanceof Array ? action.payload.err.data.errors.map(e => e.message).join(", ") : action.payload.err.data.errors) ?? ""
				Notifications.errorNotice(code, description)
			}
		}
		store.dispatch({
			type    : alertConstants.ERROR,
			payload : action.payload.err
		})
	}
	next(action)
}

export default errorMiddleware
