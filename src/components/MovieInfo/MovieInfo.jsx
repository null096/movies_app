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
import Header from '../Header/Header';
import BackToListLink from './BackToListLink/BackToListLink';
import NextMovieLink from './NextMovieLink/NextMovieLink';
import MovieDescription from './MovieDescription/MovieDescription';

export class MovieInfo extends Component {
	static propTypes = {
		isMovieExists: Proptypes.bool.isRequired,
		movieIndex: Proptypes.number.isRequired,
		movie: Proptypes.object.isRequired,
		numOfMoviesOnPage: Proptypes.number.isRequired,
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

	render() {
		const {
			isMovieExists,
			movie,
			currentPage
		} = this.props;

		if (!isMovieExists) return (
			<Redirect
				to={`${PAGE_WITH_MOVIES}/${currentPage}`}
			/>
		);

		const backgroundImgSrc = `${URL_TO_MOVIE_IMAGE_ORIGINAL}${movie.poster_path}`;
		const imgSrcW185 = `${URL_TO_MOVIE_IMAGE_W185}${movie.poster_path}`;
		const releaseDateStr = new Date(movie.release_date).toLocaleDateString();

		return (
			<React.Fragment>
				<Header />
				<div className="modal-window-wrapper">
					<div className="modal-buttons">
						<BackToListLink
							to={`${PAGE_WITH_MOVIES}/${currentPage}`}
						/>
						<NextMovieLink
							to={this.getLinkToNextMovie()}
						/>
					</div>
					<div className="modal-movie">
						<div className="modal-content">
							<MovieDescription
								movie={movie}
								movieImgUrl={imgSrcW185}
								releaseDateStr={releaseDateStr}
							/>
						</div>
					</div>
				</div>
				<div className="modal-background-img-wrapper">
					<img
						className="modal-background-img"
						src={backgroundImgSrc}
						alt="background-img"
						width="100%"
					/>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state, props) => {
	const {
		moviesOnPage,
	} = state.movies;
	const movieIndex = parseInt(props.match.params.movieIndex, 10);
	const numOfMoviesOnPage = moviesOnPage.length;
	const movie = moviesOnPage[movieIndex] || {};
	const isMovieExists = !!moviesOnPage[movieIndex];

	return {
		isMovieExists,
		movieIndex,
		movie,
		numOfMoviesOnPage,
	};
};

export default connect(
	mapStateToProps,
)(MovieInfo);