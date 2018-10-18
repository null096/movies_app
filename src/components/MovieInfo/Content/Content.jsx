import React from 'react';
import Proptypes from 'prop-types';
import BackToListLink from '../BackToListLink/BackToListLink';
import NextMovieLink from '../NextMovieLink/NextMovieLink';
import MovieDescription from '../MovieDescription/MovieDescription';

export default function Content({
    movie,
    descriptionImg,
    backToListLink,
    nextMovieLink,

}) {
    const releaseDateStr = new Date(movie.release_date).toLocaleDateString();

    return (
        <div className="modal-window-wrapper">
            <div className="modal-buttons">
                <BackToListLink to={backToListLink} />
                <NextMovieLink to={nextMovieLink} />
            </div>
            <div className="modal-movie">
                <div className="modal-content">
                    <MovieDescription
                        movie={movie}
                        movieImgUrl={descriptionImg}
                        releaseDateStr={releaseDateStr}
                    />
                </div>
            </div>
        </div>
    );
}

Content.propTypes = {
    movie: Proptypes.object.isRequired,
    descriptionImg: Proptypes.string.isRequired,
};