import {
	MOVIES_ON_PAGE_UPDATED,
	NUM_OF_MOVIES_PAGE_UPDATED,
	MOVIES_LOADING_START,
	MOVIES_LOADING_END,
	SET_UP_FAVORITE_LIST,
	MOVIE_ADDED_TO_FAVORITE,
	MOVIE_REMOVED_FROM_FAVORITE,
	FAVORITE_MOVIES_UPDATED_IN_ANOTHER_TAB,
} from '../../actions/actionNames';

const initialState = {
	isMoviesOnPageUploaded: false,
	moviesOnPage: [],
	numOfPages: 0,
	favoriteMovies: {},
	isFavoriteMoviesLoadedFromStorage: false,
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
		case MOVIES_LOADING_START:
			return {
				...state,
				isMoviesOnPageUploaded: false,
			};
		case MOVIES_LOADING_END:
			return {
				...state,
				isMoviesOnPageUploaded: true,
			};
		case SET_UP_FAVORITE_LIST:
			return {
				...state,
				favoriteMovies: action.favoriteMovies,
				isFavoriteMoviesLoadedFromStorage: true,
			};
		case FAVORITE_MOVIES_UPDATED_IN_ANOTHER_TAB:
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