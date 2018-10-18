export const putFavoriteMoviesToLocalStorage = (favoriteMovies) => {
	localStorage.favoriteMovies = JSON.stringify([...favoriteMovies]);
};

export const getSetOfFavoriteMoviesFromStorage = () => {
	const storageFavoriteMovies = localStorage.favoriteMovies;
	return new Set(
		JSON.parse(storageFavoriteMovies || '[]')
	);
}