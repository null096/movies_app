import React, { Component } from 'react';
import {
	URL_TO_MOVIE_IMAGE,
} from '../../constants/constants';
import Proptypes from 'prop-types';

export class MovieItem extends Component {
	static propTypes = {
		movie: Proptypes.object.isRequired,
	};

	constructor(props) {
		super(props);
		const {
			movie
		} = this.props;
		this.state = {
			isImageLoaded: !movie.poster_path,
		};

		this.isMovieHasImage = movie.poster_path;
		this.imgSrc = `${URL_TO_MOVIE_IMAGE}/${movie.poster_path}`;
	}

	onImageLoad = () => {
		this.setState({
			isImageLoaded: true,
		});
	}

	getMovieTitleWrapperClasses = () => ([
		'movie-title-wrapper',
		!this.isMovieHasImage ? 'is-background-gray' : ''
	].join(' '));

	getMovieTitleClasses = () => ([
		'movie-title',
		!this.isMovieHasImage ? 'is-title-show' : '',
	].join(' '));

	render() {
		const {
			movie
		} = this.props;
		const {
			isImageLoaded
		} = this.state;
		const movieTitleWrapperClasses = this.getMovieTitleWrapperClasses();
		const movieTitleClasses = this.getMovieTitleClasses();

		return (
			<div className="movie-item">
				{
					this.isMovieHasImage &&
					<React.Fragment>
						<img
							className="movie-image"
							src={this.imgSrc}
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
					<div className={movieTitleWrapperClasses}>
						<div className={movieTitleClasses}>
							{movie.original_title}
						</div>
					</div>
				}
			</div>
		);
	}
}

export default MovieItem;