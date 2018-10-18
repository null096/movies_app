import React from 'react';
import Proptypes from 'prop-types';
import {
	URL_TO_MOVIE_IMAGE_W185,
} from '../../../constants/constants';

export default function FavoriteMovieInfo({ movie, onUnfavorite }) {
	return (
		<div className="favorite-movie-info-container">
			<img
				src={`${URL_TO_MOVIE_IMAGE_W185}${movie.poster_path}`}
				alt="Movie logo"
			/>
			<div className="favorite-movie-info">
				<div className="favorite-movie-title-wrapper">
					<h2 className="favorite-movie-title">
						{movie.original_title}
					</h2>
					<h4
						className="favorite-movie-unfavorite"
						onClick={onUnfavorite}
					>
						Unfavorite
					</h4>
				</div>
				<p>{movie.overview}</p>
			</div>
		</div>
	);
}

FavoriteMovieInfo.propTypes = {
	movie: Proptypes.object.isRequired,
	onUnfavorite: Proptypes.func.isRequired,
};