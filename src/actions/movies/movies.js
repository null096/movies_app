import {
	MOVIES_ON_PAGE_UPDATED,
	NUM_OF_MOVIES_PAGE_UPDATED,
	MOVIES_LOADING_STARTED,
	SET_UP_FAVORITE_LIST,
	MOVIE_ADDED_TO_FAVORITE,
	MOVIE_REMOVED_FROM_FAVORITE,
	FAVORITE_MOVIES_UPDATED,
	MOVIES_LOADING_FAILURE,
	MOVIES_LOADING_SUCCESS,
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
} from '../utils/movies/movies';
import axios from 'axios';

export const uploadMoviesForPage = (page) => (dispatch) => {
	dispatch(moviesLoadingStarted());
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
			dispatch(moviesLoadingSuccess());
		})
		.catch((e) => {
			const errorMessage =
				e.response
					? e.response.data.status_message
					: 'Error Occurred';
			dispatch(moviesLoadingFailure(errorMessage));
		});
};

export const moviesLoadingSuccess = () => ({
	type: MOVIES_LOADING_SUCCESS,
});

export const moviesLoadingFailure = (moviesOnPageError) => ({
	type: MOVIES_LOADING_FAILURE,
	moviesOnPageError,
});

export const numOfMoviesPageUpdated = (numOfPages) => ({
	type: NUM_OF_MOVIES_PAGE_UPDATED,
	numOfPages,
});

export const moviesOnPageUpdated = (moviesOnPage) => ({
	type: MOVIES_ON_PAGE_UPDATED,
	moviesOnPage,
});

export const moviesLoadingStarted = () => ({
	type: MOVIES_LOADING_STARTED,
});

export const setUpFavoriteList = () => ({
	type: SET_UP_FAVORITE_LIST,
	favoriteMovies: getFavoriteMoviesFromStorage(),
});

export const favoriteMoviesUpdatedInAnotherTab = (favoriteMovies) => ({
	type: FAVORITE_MOVIES_UPDATED,
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