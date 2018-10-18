import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Proptypes from 'prop-types';
import {
	URL_TO_MOVIE_IMAGE_ORIGINAL,
	URL_TO_MOVIE_IMAGE_W185,
} from '../../constants/constants';
import {
	PAGE_WITH_MOVIES
} from '../../constants/routes';
import {
	addMovieToFavorites,
	removeMovieFromFavorites,
} from '../../actions/movies/movies';
import Header from '../Header/Header';
import BackgroundImage from './BackgroundImage/BackgroundImage';
import FavoriteButton from './FavoriteButton/FavoriteButton';
import Loading from '../Loading/Loading';
import Content from './Content/Content';

export class MovieInfo extends Component {
	static propTypes = {
		isMovieExists: Proptypes.bool.isRequired,
		movieIndex: Proptypes.number.isRequired,
		movie: Proptypes.object.isRequired,
		numOfMoviesOnPage: Proptypes.number.isRequired,
		isMoviesOnPageUploaded: Proptypes.bool.isRequired,
		isFavorite: Proptypes.bool.isRequired,
	};

	getNextMovieIndex() {
		const {
			numOfMoviesOnPage,
			movieIndex,
		} = this.props;

		return movieIndex === numOfMoviesOnPage - 1
			? 0
			: movieIndex + 1;
	}

	getLinkToNextMovie = () => {
		const {
			currentPage
		} = this.props;

		return `${PAGE_WITH_MOVIES}/${currentPage}/${this.getNextMovieIndex()}`;
	};

	onFavoriteButtonClick = (movieId) => {
		const {
			addMovieToFavorites,
			removeMovieFromFavorites,
			isFavorite,
		} = this.props;

		if (isFavorite) {
			removeMovieFromFavorites(movieId);
		} else {
			addMovieToFavorites(movieId);
		}
	}

	render() {
		const {
			isMovieExists,
			movie,
			currentPage,
			isMoviesOnPageUploaded,
			isFavorite,
		} = this.props;

		if (!isMoviesOnPageUploaded) return <Loading />;

		if (!isMovieExists) return (
			<Redirect
				to={`${PAGE_WITH_MOVIES}/${currentPage}`}
			/>
		);

		const backgroundImgSrc = `${URL_TO_MOVIE_IMAGE_ORIGINAL}${movie.poster_path}`;
		const descriptionImg = `${URL_TO_MOVIE_IMAGE_W185}${movie.poster_path}`;
		const backToListLink = `${PAGE_WITH_MOVIES}/${currentPage}`;

		return (
			<React.Fragment>
				<Header />
				<Content
					movie={movie}
					descriptionImg={descriptionImg}
					backToListLink={backToListLink}
					nextMovieLink={this.getLinkToNextMovie()}
				/>
				<BackgroundImage
					backgroundImgSrc={backgroundImgSrc}
				/>
				<FavoriteButton
					onFavoriteButtonClick={() =>
						this.onFavoriteButtonClick(movie.id)
					}
					isFavorite={isFavorite}
				/>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state, props) => {
	const {
		moviesOnPage,
		isMoviesOnPageUploaded,
		favoriteMovies
	} = state.movies;
	const movieIndex = parseInt(props.match.params.movieIndex, 10);
	const numOfMoviesOnPage = moviesOnPage.length;
	const movie = moviesOnPage[movieIndex] || {};
	const isMovieExists = !!moviesOnPage[movieIndex];
	const isFavorite =
		isMovieExists
			? favoriteMovies.has(movie.id)
			: false;

	return {
		isMovieExists,
		movieIndex,
		movie,
		numOfMoviesOnPage,
		isMoviesOnPageUploaded,
		isFavorite,
	};
};

const mapDispatchToProps = (dispatch) => ({
	addMovieToFavorites:
		(movieId) => dispatch(addMovieToFavorites(movieId)),
	removeMovieFromFavorites:
		(movieId) => dispatch(removeMovieFromFavorites(movieId)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MovieInfo);