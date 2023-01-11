import {
	publishingConstants
}from './constants'

const initialState =
{
	isSending : false,
	paged     : {},
	changed   : null
}

export default function (state = initialState, action){
	switch (action.type){
		case publishingConstants.Create.REQUEST:
		case publishingConstants.Restore.REQUEST:
		case publishingConstants.Delete.REQUEST:
		case publishingConstants.GetPages.REQUEST:
			return {
				...state,
				isSending : true,
				changed   : null
			}
		case publishingConstants.Create.FAILURE:
		case publishingConstants.Restore.FAILURE:
		case publishingConstants.Delete.FAILURE:
		case publishingConstants.GetPages.FAILURE:

			return {
				...state,
				isSending : false,
				error     : action.payload
			}
		case publishingConstants.Create.SUCCESS:

			return {
				...state,
				isSending : false,
				changed   : "Издательство успешно добавлено!"
			}

		case publishingConstants.Delete.SUCCESS:

			return {
				...state,
				isSending : false,
				changed   : "Издательство успешно удалено!"
			}

		case publishingConstants.Restore.SUCCESS:

			return {
				...state,
				isSending : false,
				changed   : "Издательство успешно восстановлено!"
			}
		case publishingConstants.GetPages.SUCCESS:

			return {
				...state,
				isSending : false,
				paged     : action.payload.result
			}

		case publishingConstants.Clear:
			return {
				...state,
				changed   : null,
				isSending : false,
				paged     : {},
				error     : null
			}
		default:
			return state
	}
}