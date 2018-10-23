import React from 'react';
import Proptypes from 'prop-types';
import FavoriteMovieItem from './FavoriteMovieItem/FavoriteMovieItem';

export default function FavoriteMoviesList({ favoriteMovies, onUnfavorite }) {
	return (
		<ul className="favorite-movies-list">
			{
				favoriteMovies.map((movie, index) =>
					<li key={movie.id}>
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