import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	URL_TO_MOVIE_IMAGE_W185,
} from '../../../../constants/constants';
import Proptypes from 'prop-types';
import MovieImage from './MovieImage/MovieImage';
import MovieTitle from './MovieTitle/MovieTitle';

export class MovieListItem extends Component {
	static propTypes = {
		movie: Proptypes.object.isRequired,
		movieIndex: Proptypes.number.isRequired,
		match: Proptypes.object.isRequired,
	};

	state = {
		isImageLoaded: !this.props.movie.poster_path,
	};

	onImageLoad = () => {
		this.setState({
			isImageLoaded: true,
		});
	}

	render() {
		const {
			movie,
			match,
			movieIndex,
		} = this.props;
		const {
			isImageLoaded
		} = this.state;
		const isMovieHasImage = !!movie.poster_path;
		const movieImage = `${URL_TO_MOVIE_IMAGE_W185}${movie.poster_path}`;
		const movieTitle = movie.original_title;
		
		return (
			<Link
				to={`${match.url}/${movieIndex}`}
				className="movie-item"
			>
				<MovieImage
					isMovieHasImage={isMovieHasImage}
					onImageLoad={this.onImageLoad}
					isImageLoaded={isImageLoaded}
					movieImage={movieImage}
					alt={movieTitle}
				/>
				<MovieTitle
					isMovieHasImage={isMovieHasImage}
					movieTitle={movieTitle}
					isImageLoaded={isImageLoaded}
				/>
			</Link>
		);
	}
}

export default MovieListItem;