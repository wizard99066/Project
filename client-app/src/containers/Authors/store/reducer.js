import {
	authorConstants
}from './constants'

const initialState =
{
	isSending : false,
	paged     : {},
	changed   : null
}

export default function (state = initialState, action){
	switch (action.type){
		case authorConstants.Create.REQUEST:

			return {
				...state,
				isSending : true,
				changed   : null
			}
		case authorConstants.Create.SUCCESS:

			return {
				...state,
				isSending : false,
				changed   : "Автор успешно добавлен!"
			}
		case authorConstants.Create.FAILURE:

			return {
				...state,
				isSending: false
			}
		case authorConstants.Clear:
			return {
				...state,
				changed   : null,
				isSending : false,
				paged     : {},
				list      : []
			}
		default:
			return state
	}
}