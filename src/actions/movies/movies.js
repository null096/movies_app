import {
	MOVIES_ON_PAGE_UPDATED,
	NUM_OF_MOVIES_PAGE_UPDATED,
	MOVIES_LOADING_START,
	MOVIES_LOADING_END,
	SET_UP_FAVORITE_LIST,
	ADD_MOVIE_TO_FAVORITE,
	REMOVE_MOVIE_FROM_FAVORITE,
} from '../actionNames';
import {
	API_KEY,
} from '../../constants/config';
import {
	URL_TO_MOVIES_NOW_PLAYING,
} from '../../constants/constants';
import {
	putFavoriteMoviesToLocalStorage,
	getSetOfFavoriteMoviesFromStorage
} from './moviesUtils';
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

export const setUpFavoriteList = () => ({
	type: SET_UP_FAVORITE_LIST,
	favoriteMovies: getSetOfFavoriteMoviesFromStorage(),
});

export const addMovieToFavorites = (movieId) => (dispatch, getState) => {
	const {
		favoriteMovies
	} = getState().movies;

	favoriteMovies.add(movieId);
	putFavoriteMoviesToLocalStorage(favoriteMovies);

	dispatch({
		type: ADD_MOVIE_TO_FAVORITE,
		favoriteMovies,
	});
};

export const removeMovieFromFavorites = (movieId) => (dispatch, getState) => {
	const {
		favoriteMovies
	} = getState().movies;

	favoriteMovies.delete(movieId);
	putFavoriteMoviesToLocalStorage(favoriteMovies);

	dispatch({
		type: REMOVE_MOVIE_FROM_FAVORITE,
		favoriteMovies,
	});
}