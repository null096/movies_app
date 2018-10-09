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
	}

	onImageLoad = () => {
		this.setState({
			isImageLoaded: true,
		});
	}

	render() {
		const {
			movie
		} = this.props;
		const {
			isImageLoaded
		} = this.state;
		const imgSrc = `${URL_TO_MOVIE_IMAGE}/${movie.poster_path}`;
		const isMovieHasImage = movie.poster_path;
		
		return (
			<div className="movie-item">
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
					<div className="movie-title">
						{movie.original_title}
					</div>
				}
			</div>
		);
	}
}

export default MovieItem;