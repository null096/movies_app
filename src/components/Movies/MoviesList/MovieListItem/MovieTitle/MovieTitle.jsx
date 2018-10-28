import React from 'react';
import Proptypes from 'prop-types';

const MovieTitle = ({
  isImageLoaded,
  isMovieHasImage,
  movieTitle,
}) => {
  return (
    isImageLoaded &&
    <div className={`movie-title-wrapper ${!isMovieHasImage ? 'is-background-purple' : ''}`}>
      <div className={`movie-title ${!isMovieHasImage ? 'is-title-show' : ''}`}>
        {movieTitle}
      </div>
    </div>
  );
}

MovieTitle.propTypes = {
  isImageLoaded: Proptypes.bool.isRequired,
  isMovieHasImage: Proptypes.bool.isRequired,
  movieTitle: Proptypes.string.isRequired,
};

export default MovieTitle;
