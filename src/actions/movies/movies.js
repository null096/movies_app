import {
	MOVIES_ON_PAGE_UPDATED,
	NUM_OF_MOVIES_PAGE_UPDATED,
} from '../actionNames';
import {
	API_KEY,
} from '../../constants/config';
import {
	URL_TO_MOVIES_NOW_PLAYING,
} from '../../constants/constants';
import axios from 'axios';

export const uploadMoviesForPage = (page) => (dispatch) => {
	//console.log('UPLOAD ACTION CALLED');

	axios.get(URL_TO_MOVIES_NOW_PLAYING, {
		params: {
			api_key: API_KEY,
			page
		},
	})
		.then((res) => {
			//console.log('RESPONSE RECEIVED ', res)
			const {
				results: moviesOnPage,
				total_pages,
			} = res.data;

			dispatch(numOfMoviesPageUpdated(total_pages));
			dispatch(moviesOnPageUpdated(moviesOnPage));
		})
		.catch((e) => {
			const errMes = e.response.data.errors[0];
			console.log(errMes);
		});
};

export const numOfMoviesPageUpdated = (numOfPages) => ({
	type: NUM_OF_MOVIES_PAGE_UPDATED,
	numOfPages
});

export const moviesOnPageUpdated = (moviesOnPage) => ({
	type: MOVIES_ON_PAGE_UPDATED,
	moviesOnPage
});