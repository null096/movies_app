import React from 'react';
import Proptypes from 'prop-types';

function MovieDescription({
	movie,
	movieImgUrl,
	releaseDateStr,
	isFavorite,
	onFavoriteButtonClick
}) {
	return (
		<div className="modal-movie-info">
			<div className="modal-movie-img-wrapper">
				<img
					className="modal-movie-img"
					src={movieImgUrl}
					alt="Movie logo"
				/>
			</div>
			<h2 className="modal-title">
				{movie.title}
			</h2>
			<div className="modal-add-to-favorite-wrapper">
				<span
					className="modal-add-to-favorite no-text-select"
					onClick={onFavoriteButtonClick}
				>
					{
						isFavorite
							? 'Unfavorite'
							: 'Add to favorite'
					}
				</span>
				<div
					className="modal-add-to-favorite-mobile no-text-select"
					onClick={onFavoriteButtonClick}
				>
					<span>
						{
							isFavorite
								? '❤'
								: '♡'
						}
					</span>
				</div>
			</div>
			<p className="modal-info-text-first">
				<span className="with-text-seperator">
					Score: {movie.vote_average}
				</span>
				<span className="with-text-seperator">
					Rating: {movie.adult ? 'R' : 'PG'}
				</span>
				<span>
					Release Date: {releaseDateStr}
				</span>
			</p>
			<p className="modal-info-text-second">
				{movie.overview}
			</p>
		</div>
	);
}

MovieDescription.propTypes = {
	movie: Proptypes.object.isRequired,
	movieImgUrl: Proptypes.string.isRequired,
	releaseDateStr: Proptypes.string.isRequired,
	isFavorite: Proptypes.bool.isRequired,
	onFavoriteButtonClick: Proptypes.func.isRequired,
};

export default MovieDescription;