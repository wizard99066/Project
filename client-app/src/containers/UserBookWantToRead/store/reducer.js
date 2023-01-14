import {
	userBookWantToReadConstants
}from './constants'

const initialState =
{
	isSending : false,
	paged     : {},
	changed   : null
}

export default function (state = initialState, action){
	switch (action.type){
		case userBookWantToReadConstants.Create.REQUEST:
		case userBookWantToReadConstants.Delete.REQUEST:
		case userBookWantToReadConstants.GetPaged.REQUEST:
			return {
				...state,
				isSending : true,
				changed   : null
			}
		case userBookWantToReadConstants.Create.FAILURE:
		case userBookWantToReadConstants.Delete.FAILURE:
		case userBookWantToReadConstants.GetPaged.FAILURE:
			return {
				...state,
				isSending : false,
				error     : action.payload

			}
		case userBookWantToReadConstants.Create.SUCCESS:
			return {
				...state,
				isSending : false,
				changed   : "Книга успешно добавлена в список желаемых для прочтения!"
			}
		case userBookWantToReadConstants.Delete.SUCCESS:
			return {
				...state,
				isSending : false,
				changed   : "Книга успешно удалена из списка желаемых для прочтения!"
			}
		case userBookWantToReadConstants.GetPaged.SUCCESS:
			return {
				...state,
				isSending : false,
				paged     : action.payload.result
			}
		case userBookWantToReadConstants.Clear:
			return {
				...state,
				isSending : false,
				changed   : null
			}
		default:
			return state
	}
}