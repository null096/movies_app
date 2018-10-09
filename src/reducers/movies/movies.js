import {
	MOVIES_ON_PAGE_UPDATED,
	NUM_OF_MOVIES_PAGE_UPDATED,
} from '../../actions/actionNames';

const initialState = {
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
		default:
			return state;
	}
}

export default movies;