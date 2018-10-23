import React from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
	URL_TO_MOVIE_IMAGE_W154,
} from '../../../constants/constants';
import {
	PAGE_WITH_FAVORITES,
} from '../../../constants/routes';

export default function FavoriteMovieInfo({ movie, movieIndex, onUnfavorite }) {
	return (
		<div className="favorite-movie-info-container">
			<Link
				to={`${PAGE_WITH_FAVORITES}/${movieIndex}`}
				className="favorite-movie-info-img-wrapper"
			>
				<img
					src={`${URL_TO_MOVIE_IMAGE_W154}${movie.poster_path}`}
					alt="Movie logo"
					width="154"
					height="231"
					className="favorite-movie-info-img"
				/>
			</Link>
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
	movieIndex: Proptypes.number.isRequired,
	onUnfavorite: Proptypes.func.isRequired,
};