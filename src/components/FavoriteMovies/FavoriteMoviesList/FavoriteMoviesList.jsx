import React from 'react';
import Proptypes from 'prop-types';
import FavoriteMovieItem from './FavoriteMovieItem/FavoriteMovieItem';

export default function FavoriteMoviesList({ favoriteMovies, onUnfavorite }) {
	if (!favoriteMovies.length) return (
		<p className="favorite-empty-list">
			List is empty
		</p>
	);

	return (
		<ul className="favorite-movies-list">
			{
				favoriteMovies.map((movie, index) =>
					<li key={`fav-movie-item-${movie.id}`}>
						<FavoriteMovieItem
							movie={movie}
							movieIndex={index}
							onUnfavorite={() =>
								onUnfavorite(movie)
							}
						/>
					</li>
				)
			}
		</ul>
	);
}

FavoriteMoviesList.propTypes = {
	favoriteMovies: Proptypes.array.isRequired,
	onUnfavorite: Proptypes.func.isRequired,
};