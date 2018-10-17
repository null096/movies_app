import React from 'react';
import Proptypes from 'prop-types';

function MovieDescription({ movie, movieImgUrl, releaseDateStr }) {
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
};

export default MovieDescription;