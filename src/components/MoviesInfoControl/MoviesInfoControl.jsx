import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import MovieInfo from './MovieInfo/MovieInfo';
import Loading from '../Loading/Loading';

export class MoviesInfoControl extends Component {
	static propTypes = {
		movies: Proptypes.array.isRequired,
		mainUrl: Proptypes.string.isRequired,
		match: Proptypes.object.isRequired,
		isMoviesUploaded: Proptypes.bool.isRequired,
	};

	getNextMovieIndex() {
		const {
			movies,
			match,
		} = this.props;
		const movieIndex = parseInt(match.params.movieIndex, 10);

		return movieIndex === movies.length - 1
			? 0
			: movieIndex + 1;
	}

	getLinkToNextMovie() {
		const {
			mainUrl,
		} = this.props;

		return `${mainUrl}/${this.getNextMovieIndex()}`;
	}

	render() {
		const {
			mainUrl,
			movies,
			match,
			isMoviesUploaded,
		} = this.props;
		const movieIndex = parseInt(match.params.movieIndex, 10);
		const movie = movies[movieIndex];

		if (!isMoviesUploaded) return <Loading />;

		if (!movies.length) return <Redirect to={mainUrl} />;

		if (!movie) return <Redirect to={`${mainUrl}/0`} />;

		return (
			<MovieInfo
				movie={movie}
				backToListLink={mainUrl}
				nextMovieLink={this.getLinkToNextMovie()}
			/>
		);
	}
}

export default MoviesInfoControl;