import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import {
	URL_TO_MOVIE_IMAGE_ORIGINAL,
	URL_TO_MOVIE_IMAGE_W185,
} from '../../constants/constants';
import {
	PAGE_WITH_MOVIES
} from '../../constants/routes';

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
			<div className="modal-movie">
				<img
					className="modal-background-img"
					src={backgroundImgSrc}
					alt="background-img"
					width="100%"
				/>
				<div className="modal-content">
					<Link
						className="modal-close-btn"
						to={`${PAGE_WITH_MOVIES}/${currentPage}`}
					>
						<button>Close</button>
					</Link>
					<Link
						className="modal-next-btn"
						to={this.getLinkToNextMovie()}
					>
						<button>Next</button>
					</Link>
					<div className="movie-info">
						<img
							className="modal-movie-img"
							src={imgSrcW185}
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
				</div>
			</div>
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