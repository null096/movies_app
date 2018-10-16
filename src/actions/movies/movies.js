import {
	MOVIES_ON_PAGE_UPDATED,
	NUM_OF_MOVIES_PAGE_UPDATED,
	MOVIES_LOADING_START,
	MOVIES_LOADING_END,
} from '../actionNames';
import {
	API_KEY,
} from '../../constants/config';
import {
	URL_TO_MOVIES_NOW_PLAYING,
} from '../../constants/constants';
import axios from 'axios';

export const uploadMoviesForPage = (page) => (dispatch) => {
	dispatch(moviesLoadingStart());
	axios.get(URL_TO_MOVIES_NOW_PLAYING, {
		params: {
			api_key: API_KEY,
			page,
		},
	})
		.then((res) => {
			const {
				results: moviesOnPage,
				total_pages,
			} = res.data;

			dispatch(numOfMoviesPageUpdated(total_pages));
			dispatch(moviesOnPageUpdated(moviesOnPage));
		})
		.catch((e) => {
			console.error(e);
		})
		.finally(() => dispatch(moviesLoadingEnd()));
};

export const numOfMoviesPageUpdated = (numOfPages) => ({
	type: NUM_OF_MOVIES_PAGE_UPDATED,
	numOfPages,
});

export const moviesOnPageUpdated = (moviesOnPage) => ({
	type: MOVIES_ON_PAGE_UPDATED,
	moviesOnPage,
});

export const moviesLoadingStart = () => ({
	type: MOVIES_LOADING_START,
});

export const moviesLoadingEnd = () => ({
	type: MOVIES_LOADING_END,
});