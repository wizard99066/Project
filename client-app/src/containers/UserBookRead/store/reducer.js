import {
	userBookReadConstants
}from './constants'

const initialState =
{
	isSending : false,
	paged     : {},
	changed   : null
}

export default function (state = initialState, action){
	switch (action.type){
		case userBookReadConstants.Create.REQUEST:
		case userBookReadConstants.Delete.REQUEST:
		case userBookReadConstants.GetPaged.REQUEST:
			return {
				...state,
				isSending : true,
				changed   : null
			}
		case userBookReadConstants.Create.FAILURE:
		case userBookReadConstants.Delete.FAILURE:
		case userBookReadConstants.GetPaged.FAILURE:
			return {
				...state,
				isSending : false,
				error     : action.payload

			}
		case userBookReadConstants.Create.SUCCESS:
			return {
				...state,
				isSending : false,
				changed   : "Книга успешно добавлена в список прочитанных!"
			}
		case userBookReadConstants.Delete.SUCCESS:
			return {
				...state,
				isSending : false,
				changed   : "Книга успешно удалена из списка прочитанных!"
			}
		case userBookReadConstants.GetPaged.SUCCESS:
			return {
				...state,
				isSending : false,
				paged     : action.payload.result
			}
		case userBookReadConstants.Clear:
			return {
				...state,
				isSending : false,
				changed   : null
			}
		default:
			return state
	}
}