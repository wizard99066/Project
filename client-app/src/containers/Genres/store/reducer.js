import {
	genreConstants
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
		case genreConstants.Create.REQUEST:
		case genreConstants.Restore.REQUEST:
		case genreConstants.Delete.REQUEST:
		case genreConstants.GetPages.REQUEST:
		case genreConstants.Search.REQUEST:
			return {
				...state,
				isSending : true,
				changed   : null
			}
		case genreConstants.Create.FAILURE:
		case genreConstants.Restore.FAILURE:
		case genreConstants.Delete.FAILURE:
		case genreConstants.GetPages.FAILURE:
		case genreConstants.Search.FAILURE:

			return {
				...state,
				isSending : false,
				error     : action.payload
			}
		case genreConstants.Create.SUCCESS:

			return {
				...state,
				isSending : false,
				changed   : "Жанр успешно добавлен!"
			}

		case genreConstants.Delete.SUCCESS:

			return {
				...state,
				isSending : false,
				changed   : "Жанр успешно удален!"
			}

		case genreConstants.Restore.SUCCESS:

			return {
				...state,
				isSending : false,
				changed   : "Жанр успешно восстановлен!"
			}
		case genreConstants.GetPages.SUCCESS:

			return {
				...state,
				isSending : false,
				paged     : action.payload.result
			}
		case genreConstants.Search.SUCCESS:

			return {
				...state,
				isSending : false,
				list      : action.payload.result
			}

		case genreConstants.Clear:
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