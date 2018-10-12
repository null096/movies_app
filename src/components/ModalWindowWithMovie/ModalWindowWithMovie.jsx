import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import {
	URL_TO_MOVIE_IMAGE_W780,
	URL_TO_MOVIE_IMAGE_W185,
} from '../../constants//constants';
import { closeModalWindow } from '../../actions/modal/modal';

export class ModalWindowWithMovie extends Component {
	static propTypes = {
		movieIndex: Proptypes.number.isRequired,
		movie: Proptypes.object.isRequired,
	};

	componentDidMount() {
		document.body.style.overflow = 'hidden';
	}

	componentWillUnmount() {
		document.body.style.overflow = 'visible';
	}

	render() {
		const {
			movie,
			closeModalWindow,
			// movieIndex
		} = this.props;
		const imgSrcW780 = `${URL_TO_MOVIE_IMAGE_W780}${movie.poster_path}`;
		const imgSrcW185 = `${URL_TO_MOVIE_IMAGE_W185}${movie.poster_path}`;
		const releaseDateStr = new Date(movie.release_date).toLocaleDateString();
		
		return (
			<div className="modal-movie">
				<img
					className="modal-background-img"
					src={imgSrcW780}
					alt="background-img"
					width="100%"
				/>
				<div className="modal-content">
					<button
						className="modal-close-btn"
						onClick={closeModalWindow}
					>
						Close
					</button>
					<button
						className="modal-next-btn"
					>
						Next
					</button>
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

const mapDispatchToProps = (dispatch) => ({
	closeModalWindow: () => dispatch(closeModalWindow()),
});

export default connect(
	null,
	mapDispatchToProps,
)(ModalWindowWithMovie);