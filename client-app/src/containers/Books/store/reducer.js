import {
	bookConstants
}from './constants'

const initialState =
{
	isSending : false,
	paged     : {},
	changed   : null,
	book      : null
}

export default function (state = initialState, action){
	switch (action.type){
		case bookConstants.Create.REQUEST:
		case bookConstants.Restore.REQUEST:
		case bookConstants.Delete.REQUEST:
		case bookConstants.GetById.REQUEST:
		case bookConstants.GetPages.REQUEST:
			return {
				...state,
				isSending : true,
				changed   : null,
				book      : null
			}
		case bookConstants.Create.FAILURE:
		case bookConstants.Restore.FAILURE:
		case bookConstants.Delete.FAILURE:
		case bookConstants.GetById.FAILURE:
		case bookConstants.GetPages.FAILURE:

			return {
				...state,
				isSending : false,
				error     : action.payload

			}
		case bookConstants.Create.SUCCESS:

			return {
				...state,
				isSending : false,
				changed   : "Книга успешно добавлена!"
			}

		case bookConstants.Delete.SUCCESS:

			return {
				...state,
				isSending : false,
				changed   : "Книга успешно удалена!"
			}

		case bookConstants.Restore.SUCCESS:

			return {
				...state,
				isSending : false,
				changed   : "Книга успешно восстановлена!"
			}
		case bookConstants.GetPages.SUCCESS:

			return {
				...state,
				isSending : false,
				paged     : action.payload.result
			}
		case bookConstants.GetById.SUCCESS:
			return {

				...state,
				isSending : false,
				book      : action.payload.result
			}

		case bookConstants.Clear:
			return {
				...state,
				changed   : null,
				isSending : false,
				paged     : {},
				error     : null,
				book      : null
			}
			

		default:
			return state
	}
}