import {
	MOVIES_ON_PAGE_UPDATED,
	NUM_OF_MOVIES_PAGE_UPDATED,
	MOVIES_LOADING_START,
	MOVIES_LOADING_END,
} from '../../actions/actionNames';

const initialState = {
	isMoviesOnPageUploaded: false,
	moviesOnPage: [],
	numOfPages: 0,
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
			}
		case MOVIES_LOADING_END:
			return {
				...state,
				isMoviesOnPageUploaded: true,
			}
		default:
			return state;
	}
}

export default movies;