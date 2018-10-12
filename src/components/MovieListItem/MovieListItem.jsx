import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	URL_TO_MOVIE_IMAGE_W185,
	MOVIE_MODAL,
} from '../../constants/constants';
import {
	showModalWindow
} from '../../actions/modal/modal';
import Proptypes from 'prop-types';

export class MovieListItem extends Component {
	static propTypes = {
		movie: Proptypes.object.isRequired,
		movieIndex: Proptypes.number.isRequired,
		showModalWindow: Proptypes.func.isRequired
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
		this.imgSrc = `${URL_TO_MOVIE_IMAGE_W185}${movie.poster_path}`;
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

	onClickHandle = () => {
		const {
			showModalWindow,
			movie,
			movieIndex
		} = this.props;

		showModalWindow(MOVIE_MODAL, {
			movieIndex,
			movie
		});
	}

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
			<div
				className="movie-item"
				onClick={this.onClickHandle}
			>
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

const mapDispathToProps = (dispatch) => ({
	showModalWindow: (compName, params) => dispatch(showModalWindow(compName, params))
});

export default connect(
	null,
	mapDispathToProps,
)(MovieListItem);