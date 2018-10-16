import React from 'react';
import Proptypes from 'prop-types';

function MovieDescription({ movie, movieImgUrl, releaseDateStr }) {
	return (
		<div className="modal-movie-info">
			<img
				className="modal-movie-img"
				src={movieImgUrl}
				alt="Movie logo"
				height="235"
				width="185"
			/>
			<div className="modal-info-text">
				<h2 id="modal-title">
					{movie.title}
				</h2>
				<p id="modal-info-text-first">
					<span id="modal-score">Score: {movie.vote_average}</span>
					<span>Release Date: {releaseDateStr}</span>
				</p>
				<p id="modal-info-text-second">
					{movie.overview}
				</p>
			</div>
		</div>
	);
}

MovieDescription.propTypes = {
	movie: Proptypes.object.isRequired,
	movieImgUrl: Proptypes.string.isRequired,
	releaseDateStr: Proptypes.string.isRequired,
};

export default MovieDescription;