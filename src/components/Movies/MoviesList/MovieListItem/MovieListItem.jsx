import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	URL_TO_MOVIE_IMAGE_W185,
} from '../../../../constants/constants';
import Proptypes from 'prop-types';

export class MovieListItem extends Component {
	static propTypes = {
		movie: Proptypes.object.isRequired,
		movieIndex: Proptypes.number.isRequired,
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
		const isMovieHasImage = movie.poster_path;
		const imgSrc = `${URL_TO_MOVIE_IMAGE_W185}${movie.poster_path}`;

		return (
			<Link
				to={`${match.url}/${movieIndex}`}
				className="movie-item"
			>
				{
					isMovieHasImage &&
					<React.Fragment>
						<img
							className="movie-image"
							src={imgSrc}
							alt={movie.original_title}
							onLoad={this.onImageLoad}
						/>
						{
							!isImageLoaded &&
							<div className="movie-image-loading">
								<img src="/img/spinner.gif" alt="Loading..." />
							</div>
						}
					</React.Fragment>
				}
				{
					isImageLoaded &&
					<div className={`movie-title-wrapper ${!isMovieHasImage ? 'is-background-purple' : ''}`}>
						<div className={`movie-title ${!isMovieHasImage ? 'is-title-show' : ''}`}>
							{movie.original_title}
						</div>
					</div>
				}
			</Link>
		);
	}
}

export default MovieListItem;