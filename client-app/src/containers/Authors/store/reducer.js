import {
	authorConstants
}from './constants'

const initialState =
{
	isSending : false,
	paged     : {},
	changed   : null,
	list      : []
}

export default function (state = initialState, action){
	switch (action.type){
		case authorConstants.Create.REQUEST:
		case authorConstants.Restore.REQUEST:
		case authorConstants.Delete.REQUEST:
		case authorConstants.GetPaged.REQUEST:
		case authorConstants.Search.REQUEST:
			return {
				...state,
				isSending : true,
				changed   : null
			}
		case authorConstants.Create.FAILURE:
		case authorConstants.Restore.FAILURE:
		case authorConstants.Delete.FAILURE:
		case authorConstants.GetPaged.FAILURE:
		case authorConstants.Search.FAILURE:

			return {
				...state,
				isSending : false,
				error     : action.payload
			}
		case authorConstants.Create.SUCCESS:

			return {
				...state,
				isSending : false,
				changed   : "Автор успешно добавлен!"
			}

		case authorConstants.Delete.SUCCESS:

			return {
				...state,
				isSending : false,
				changed   : "Автор успешно удален!"
			}

		case authorConstants.Restore.SUCCESS:

			return {
				...state,
				isSending : false,
				changed   : "Автор успешно восстановлен!"
			}
		case authorConstants.GetPaged.SUCCESS:

			return {
				...state,
				isSending : false,
				paged     : action.payload.result
			}

		case authorConstants.Clear:
			return {
				...state,
				changed   : null,
				isSending : false,
				paged     : {},
				error     : null
			}
		case authorConstants.Search.SUCCESS:

			return {
				...state,
				isSending : false,
				list      : action.payload.result
			}

		default:
			return state
	}
}