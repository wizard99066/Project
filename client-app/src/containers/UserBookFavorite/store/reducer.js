import {
	userBookFavoriteConstants
}from './constants'

const initialState =
{
	isSending : false,
	paged     : {},
	changed   : null
}

export default function (state = initialState, action){
	switch (action.type){
		case userBookFavoriteConstants.Create.REQUEST:
		case userBookFavoriteConstants.Delete.REQUEST:
		case userBookFavoriteConstants.GetPaged.REQUEST:
			return {
				...state,
				isSending : true,
				changed   : null
			}
		case userBookFavoriteConstants.Create.FAILURE:
		case userBookFavoriteConstants.Delete.FAILURE:
		case userBookFavoriteConstants.GetPaged.FAILURE:
			return {
				...state,
				isSending : false,
				error     : action.payload

			}
		case userBookFavoriteConstants.Create.SUCCESS:
			return {
				...state,
				isSending : false,
				changed   : "Книга успешно добавлена в избранное!"
			}
		case userBookFavoriteConstants.Delete.SUCCESS:
			return {
				...state,
				isSending : false,
				changed   : "Книга успешно удалена из избранного!"
			}
		case userBookFavoriteConstants.GetPaged.SUCCESS:
			return {
				...state,
				isSending : false,
				paged     : action.payload.result
			}
		case userBookFavoriteConstants.Clear:
			return {
				...state,
				isSending : false,
				changed   : null
			}
		default:
			return state
	}
}