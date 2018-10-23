import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import {
	URL_TO_MOVIE_IMAGE_ORIGINAL,
	URL_TO_MOVIE_IMAGE_W185,
} from '../../constants/constants';
import {
	addMovieToFavorites,
	removeMovieFromFavorites,
} from '../../actions/movies/movies';
import Header from '../Header/Header';
import BackgroundImage from './BackgroundImage/BackgroundImage';
import Content from './Content/Content';

export class MovieInfo extends Component {
	static propTypes = {
		movie: Proptypes.object.isRequired,
		isFavorite: Proptypes.bool.isRequired,
		backToListLink: Proptypes.string.isRequired,
		nextMovieLink: Proptypes.string.isRequired,
		removeMovieFromFavorites: Proptypes.func.isRequired,
		addMovieToFavorites: Proptypes.func.isRequired,
	};

	onFavoriteButtonClick = (movie) => {
		const {
			addMovieToFavorites,
			removeMovieFromFavorites,
			isFavorite,
		} = this.props;

		if (isFavorite) {
			removeMovieFromFavorites(movie);
		} else {
			addMovieToFavorites(movie);
		}
	}

	render() {
		const {
			movie,
			isFavorite,
			backToListLink,
			nextMovieLink,
		} = this.props;

		const backgroundImgSrc = `${URL_TO_MOVIE_IMAGE_ORIGINAL}${movie.poster_path}`;
		const descriptionImg = `${URL_TO_MOVIE_IMAGE_W185}${movie.poster_path}`;

		return (
			<React.Fragment>
				<Header />
				<Content
					movie={movie}
					descriptionImg={descriptionImg}
					backToListLink={backToListLink}
					nextMovieLink={nextMovieLink}
					onFavoriteButtonClick={() =>
						this.onFavoriteButtonClick(movie)
					}
					isFavorite={isFavorite}
				/>
				<BackgroundImage
					backgroundImgSrc={backgroundImgSrc}
				/>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	isFavorite: !!state.movies.favoriteMovies[ownProps.movie.id],
});

const mapDispatchToProps = (dispatch) => ({
	addMovieToFavorites:
		(movie) => dispatch(addMovieToFavorites(movie)),
	removeMovieFromFavorites:
		(movie) => dispatch(removeMovieFromFavorites(movie)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(MovieInfo);