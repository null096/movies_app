import React from 'react';
import Proptypes from 'prop-types';

const MovieImage = ({
	movieImage,
	isMovieHasImage,
	isImageLoaded,
	onImageLoad,
	alt,
}) => (
		isMovieHasImage &&
		<React.Fragment>
			<img
				className="movie-image"
				src={movieImage}
				alt={alt}
				onLoad={onImageLoad}
			/>
			{
				!isImageLoaded &&
				<div className="movie-image-loading">
					<img src="/img/spinner.gif" alt="Loading..." />
				</div>
			}
		</React.Fragment>
	);


MovieImage.propTypes = {
	isMovieHasImage: Proptypes.bool.isRequired,
	alt: Proptypes.string.isRequired,
	isImageLoaded: Proptypes.bool.isRequired,
	onImageLoad: Proptypes.func.isRequired,
	movieImage: Proptypes.string.isRequired,
};

export default MovieImage;
