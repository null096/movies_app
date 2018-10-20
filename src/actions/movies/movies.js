import {
	MOVIES_ON_PAGE_UPDATED,
	NUM_OF_MOVIES_PAGE_UPDATED,
	MOVIES_LOADING_START,
	MOVIES_LOADING_END,
	SET_UP_FAVORITE_LIST,
	MOVIE_ADDED_TO_FAVORITE,
	MOVIE_REMOVED_FROM_FAVORITE,
	FAVORITE_LIST_UPDATED_IN_ANOTHER_TAB
} from '../actionNames';
import {
	API_KEY,
} from '../../constants/config';
import {
	URL_TO_MOVIES_NOW_PLAYING,
} from '../../constants/constants';
import {
	putFavoriteMoviesToLocalStorage,
	getFavoriteMoviesFromStorage
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
	favoriteMovies: getFavoriteMoviesFromStorage(),
});

export const favoriteListUpdatedInAnotherTab = (favoriteMovies) => ({
	type: FAVORITE_LIST_UPDATED_IN_ANOTHER_TAB,
	favoriteMovies: favoriteMovies || {},
});

export const addMovieToFavorites = (movie) => (dispatch, getState) => {
	const {
		favoriteMovies
	} = getState().movies;

	favoriteMovies[movie.id] = movie;
	putFavoriteMoviesToLocalStorage(favoriteMovies);

	dispatch({
		type: MOVIE_ADDED_TO_FAVORITE,
		favoriteMovies,
	});
};

export const removeMovieFromFavorites = (movie) => (dispatch, getState) => {
	const {
		favoriteMovies
	} = getState().movies;

	delete favoriteMovies[movie.id];
	putFavoriteMoviesToLocalStorage(favoriteMovies);

	dispatch({
		type: MOVIE_REMOVED_FROM_FAVORITE,
		favoriteMovies,
	});
}