export const putFavoriteMoviesToLocalStorage = (favoriteMovies) => {
	localStorage.favoriteMovies = JSON.stringify(favoriteMovies);
};

export const getFavoriteMoviesFromStorage = () => {
	const storageFavoriteMovies = localStorage.favoriteMovies;
	return JSON.parse(storageFavoriteMovies || '{}');
};