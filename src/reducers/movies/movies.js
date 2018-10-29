import {
	MOVIES_ON_PAGE_UPDATED,
	NUM_OF_MOVIES_PAGE_UPDATED,
	MOVIES_LOADING_STARTED,
	SET_UP_FAVORITE_LIST,
	MOVIE_ADDED_TO_FAVORITE,
	MOVIE_REMOVED_FROM_FAVORITE,
	FAVORITE_MOVIES_UPDATED,
	MOVIES_LOADING_SUCCESS,
	MOVIES_LOADING_FAILURE,
} from '../../actions/actionNames';

const initialState = {
	isMoviesOnPageLoaded: false,
	moviesOnPageError: '',
	moviesOnPage: [],
	numOfPages: 0,
	favoriteMovies: {},
	isFavoriteMoviesLoaded: false,
};

function movies(state = initialState, action) {
	switch (action.type) {
		case MOVIES_ON_PAGE_UPDATED:
			return {
				...state,
				moviesOnPage: action.moviesOnPage,
			};
		case NUM_OF_MOVIES_PAGE_UPDATED:
			return {
				...state,
				numOfPages: action.numOfPages,
			};
		case MOVIES_LOADING_STARTED:
			return {
				...state,
				isMoviesOnPageLoaded: false,
				moviesOnPageError: '',
			};
		case MOVIES_LOADING_SUCCESS:
			return {
				...state,
				isMoviesOnPageLoaded: true,
			};
		case MOVIES_LOADING_FAILURE:
			return {
				...state,
				isMoviesOnPageLoaded: true,
				moviesOnPageError: action.moviesOnPageError,
			}
		case SET_UP_FAVORITE_LIST:
			return {
				...state,
				favoriteMovies: action.favoriteMovies,
				isFavoriteMoviesLoaded: true,
			};
		case FAVORITE_MOVIES_UPDATED:
		case MOVIE_ADDED_TO_FAVORITE:
		case MOVIE_REMOVED_FROM_FAVORITE:
			return {
				...state,
				favoriteMovies: action.favoriteMovies,
			};
		default:
			return state;
	}
}

export default movies;