import {
	combineReducers
}from "redux"
import globalReducer from "../../containers/Menu/reducer"
import userReducer from "./user"
import alertReducer from './alertReducer'
import authorReducer from '../../containers/Authors/store/reducer'
import bookReducer from '../../containers/Books/store/reducer'
import genreReducer from '../../containers/Genres/store/reducer'
import publishingReducer from '../../containers/Publishings/store/reducer'
import userBookReadReducer from '../../containers/UserBookRead/store/reducer'
import userBookWantToReadReducer from '../../containers/UserBookWantToRead/store/reducer'
import userBookFavoriteReducer from '../../containers/UserBookFavorite/store/reducer'
import {
	routerReducer
}from "react-router-redux"

export default combineReducers({
	alertReducer,
	globalReducer,
	router: routerReducer,
	userReducer,
	authorReducer,
	bookReducer,
	genreReducer,
	publishingReducer,
	userBookReadReducer,
	userBookWantToReadReducer,
	userBookFavoriteReducer
})
